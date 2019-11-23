import Question from './question.interface';

export default interface Answer<T = number | string | boolean> {
  order: number;
  question: Question;
  answer: T;
}
