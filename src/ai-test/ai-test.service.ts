import { Injectable } from '@nestjs/common';
import { History } from './dto/history.request';
import { GoogleGenAI } from '@google/genai';
import { TutorResponse } from './dto/speak.response';
import {
  ParseException,
  RequestFailedException,
} from 'src/common/exception/api.exception';
@Injectable()
export class AiTestService {
  private ai = new GoogleGenAI({
    apiKey: process.env.API_KEY!,
  });

  async evaluate(
    file: Express.Multer.File,
    histories: History[],
  ): Promise<TutorResponse> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const fileButter: Buffer = file.buffer as Buffer;
      const base64: string = fileButter.toString('base64');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const mimeType: string = (file.mimetype as string) || 'audio/webm';

      const prompt = this.buildPrompt(histories);

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              { inlineData: { data: base64, mimeType } },
              { text: prompt },
            ],
          },
        ],
      });

      const text = (response.text || '').trim();
      const clean = text.replace(/```json|```/g, '').trim();

      try {
        return JSON.parse(clean) as TutorResponse;
      } catch {
        throw new ParseException();
      }
    } catch {
      throw new RequestFailedException();
    }
  }

  private buildPrompt(history: History[]): string {
    const formattedHistory = history
      .map(
        (entry, i) =>
          `User (${i + 1}): ${entry.user}\nAssistant (${i + 1}): ${
            entry.assistant
          }`,
      )
      .join('\n');

    return `
        You are Ken, a friendly English conversation partner.
        You will receive the user's voice input (not text). Listen carefully,
        understand what they said, and respond naturally in English (1–3 sentences).

        After replying, objectively evaluate their spoken English on the following five metrics (0–5):

        
        {
            "user": string,            // The exact English transcription of what the user said
            "reply": string,           // The AI's natural English response to the user's speech (1–3 sentences)
            "pronunciation": number,   // Pronunciation quality score (0–5) — clarity and correctness of spoken sounds
            "fluency": number,         // Fluency score (0–5) — smoothness, rhythm, and natural speed of speech
            "coherence": number        // Coherence score (0–5) — how logically and clearly the ideas are connected
        }


        Guidelines:
        - Reply naturally like a human, not a teacher or AI.
        - Avoid grammar explanations or corrections.
        - Keep the tone friendly and conversational.
        - Maintain consistency with the past conversation:
        ${formattedHistory || '(no previous messages)'}

        Respond strictly in valid JSON format only — no extra text, markdown, or code fences.
  `.trim();
  }
}
