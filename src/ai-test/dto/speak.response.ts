import { SpeakEvaluation } from './speak-evaluation.response';

export class TutorResponse extends SpeakEvaluation {
  reply: string;
  user: string;
}
