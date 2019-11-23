import Answer from './answer.interface';

export default interface RecordInterface {
  id: string;
  rating: Answer<1 | 2 | 3 | 4 | 5>;
  createdAt: Date;
  lastEditAt: Date;
  answers: Answer[];
}
