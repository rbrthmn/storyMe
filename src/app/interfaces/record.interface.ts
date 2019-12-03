import Answer from './answer.interface';

export default interface RecordInterface {
  userId: string;
  id: string;
  rating: Pick<Answer<ratingRange>, 'answer'>;
  createdAt: Date;
  lastEditAt: Date;
  answers: Answer[];
}

export type ratingRange = 1 | 2 | 3 | 4 | 5;
