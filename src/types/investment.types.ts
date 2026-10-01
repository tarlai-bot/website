export interface Investment {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  benefits: string[];
  benefitsAr: string[];
  metrics?: {
    occupancyRate?: number;
    footTraffic?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
