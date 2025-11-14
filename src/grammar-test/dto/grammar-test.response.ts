import { Answer, GrammarTest } from '@prisma/client';
import { AnswerResponse } from './answer.response';
import { LEVEL } from './level.enum';
import { TEST_TYPE } from './test-type.enum';

export type GrammarTestWithAnswers = GrammarTest & {
  answers: Answer[];
};

export class GrammarTestResponse {
  id: string;
  problem: string;
  level: LEVEL;
  type: TEST_TYPE;
  answers: AnswerResponse[];

  static from(entity: GrammarTestWithAnswers): GrammarTestResponse {
    const response = new GrammarTestResponse();
    response.id = entity.id;
    response.problem = entity.problem;
    response.level = entity.level as LEVEL;
    response.type = entity.type as TEST_TYPE;

    response.answers = entity.answers.map((answer) =>
      AnswerResponse.from(answer),
    );
    return response;
  }
}
