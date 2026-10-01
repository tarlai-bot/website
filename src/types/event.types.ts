export interface Event {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  startDate: Date;
  endDate: Date;
  images: string[];
  location?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
