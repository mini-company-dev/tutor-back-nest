import { Answer } from '@prisma/client';

export class AnswerResponse {
  id: string;
  content: string;
  correct: boolean;

  static from(entity: Answer): AnswerResponse {
    const res = new AnswerResponse();
    res.id = entity.id;
    res.content = entity.content;
    res.correct = entity.correct;
    return res;
  }
}
