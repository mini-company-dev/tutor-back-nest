import { Answer, GrammarTest } from '@prisma/client';
import { AnswerGetResponse } from './answer-get.response';
import { LEVEL } from './level.enum';
import { TEST_TYPE } from './test-type.enum';

export type GrammarTestWithAnswers = GrammarTest & {
  answers: Answer[];
};

export class GrammarTestGetResponse {
  id: string;
  problem: string;
  level: LEVEL;
  type: TEST_TYPE;
  answers: AnswerGetResponse[];

  static from(entity: GrammarTestWithAnswers): GrammarTestGetResponse {
    const response = new GrammarTestGetResponse();
    response.id = entity.id;
    response.problem = entity.problem;
    response.level = entity.level as LEVEL;
    response.type = entity.type as TEST_TYPE;

    response.answers = entity.answers.map((answer) =>
      AnswerGetResponse.from(answer),
    );
    return response;
  }
}
