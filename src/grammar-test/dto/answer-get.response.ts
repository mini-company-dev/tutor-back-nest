import { Answer } from '@prisma/client';

export class AnswerGetResponse {
  id: string;
  content: string;
  correct: boolean;

  static from(entity: Answer): AnswerGetResponse {
    const res = new AnswerGetResponse();
    res.id = entity.id;
    res.content = entity.content;
    res.correct = entity.correct;
    return res;
  }
}
