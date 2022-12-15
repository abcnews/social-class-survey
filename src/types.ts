export type QuestionID = 'contacts' | 'activities' | 'income' | 'property' | 'savings';

export interface Question {
  id: QuestionID;
  title: string;
  hint?: string;
  options: string[];
  isMultiple?: boolean;
  noneIndex?: number;
}

export type Answers = Record<QuestionID, string | string[] | undefined>;

export interface Query {
  known: number;
  highbrow: number;
  emerging: number;
  income: number;
  assets: number;
  knownses: number;
}

export interface Conclusion {
  name: string;
  poppct: number;
  desc: string;
}

export interface Result {
  conclusion: Conclusion | null;
}
