import { CreateAnswers } from './create-answer.request';
import { LEVEL } from './level.enum';
import { TEST_TYPE } from './test-type.enum';

export class CreateGrammarTest {
  problem: string;
  level: LEVEL;
  type: TEST_TYPE;
  answers: CreateAnswers[];
}
