import { Injectable } from '@nestjs/common';
import { History } from './dto/history.request';
import { GoogleGenAI } from '@google/genai';
import { TutorResponse } from './dto/speak.response';
import { RequestFailedException } from 'src/common/exception/api.exception';

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
      const base64 = file.buffer.toString('base64');
      const mimeType = file.mimetype || 'audio/webm';

      const prompt = this.buildPrompt(histories);

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
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

      const text = response.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

      const clean = text.replace(/```json|```/g, '').trim();

      return JSON.parse(clean) as TutorResponse;
    } catch (e) {
      console.error('AI evaluate error:', e);
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

        After replying, objectively evaluate their spoken English on the following five metrics (0–100):

        {
            "user": string,            // The exact English transcription of what the user said
            "reply": string,           // The AI's natural English response to the user's speech (1–3 sentences)
            "pronunciation": number,   // Pronunciation quality score (0–100) — clarity and correctness of spoken sounds
            "fluency": number,         // Fluency score (0–100) — smoothness, rhythm, and natural speed of speech
            "coherence": number        // Coherence score (0–100) — logical and clear connection of ideas
        }

        Pronunciation Scoring Rules (VERY STRICT):
        - Evaluate pronunciation *strictly based on the raw audio*, not the meaning or transcription.
        - Penalize unclear consonants, weak ending sounds, wrong stress, monotone delivery, unnatural rhythm, and strong Korean-accent patterns.
        - If ANY word sounds unclear or distorted, the score must be 60 or lower.
        - If multiple words sound unnatural or missing, the score must be 40 or lower.
        - Scores 90–100 should only be given when the audio is near-native in clarity and rhythm.
        - Never guess the intended word. Only judge what was actually heard.

        Fluency & Coherence Scoring Rules:
        - Fluency: Consider rhythm, pause length, hesitation, and natural pacing.
        - Coherence: Evaluate how logically the ideas connect and how understandable the content is.
        - Be conservative. Do NOT give high scores unless clearly deserved.

        Global Evaluation Rules:
        - Score as strictly and conservatively as possible.
        - Do NOT inflate or soften scores under any circumstances.
        - A score of 100 means “near-perfect native-level performance”.
        - A score of 50 means “clearly noticeable issues”.
        - A score of 0–20 should be used when the response is very unclear or heavily distorted.
        - Always prioritize objective accuracy over kindness.

        Guidelines:
        - Reply naturally like a human, not a teacher or AI.
        - Do not offer explanations or corrections.
        - Keep the tone friendly and conversational.
        - Maintain consistency with the past conversation:
        ${formattedHistory || '(no previous messages)'}

        Respond in valid JSON only, with no additional text, markdown, or code fences.
  `.trim();
  }
}
