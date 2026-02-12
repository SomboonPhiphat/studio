export type AnswerLevel = 1 | 2 | 3 | 4 | 5 | 0;

export type DimensionKey =
  | 'mobility'
  | 'selfCare'
  | 'usualActivities'
  | 'pain'
  | 'anxiety';

export type Answers = {
  [key in DimensionKey]: AnswerLevel;
};

export type HistoryEntry = {
  id: string;
  dateTime: string;
  name: string;
  gender: string;
  age: number;
  code: string;
  score: number;
  vas: number;
};
