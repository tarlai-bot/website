export interface FAQ {
  id: string;
  question: string;
  questionAr: string;
  answer: string;
  answerAr: string;
  category: string;
  order: number;
  isActive: boolean;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}
