export interface RentalSpace {
  id: string;
  title: string;
  titleAr: string;
  floor: string;
  size: number;
  price?: number;
  status: 'available' | 'rented' | 'coming_soon';
  images: string[];
  description: string;
  descriptionAr: string;
  floorPlan?: string;
  createdAt: Date;
  updatedAt: Date;
}
