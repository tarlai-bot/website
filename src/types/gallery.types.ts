export interface GalleryImage {
  id: string;
  url: string;
  title?: string;
  titleAr?: string;
  category: 'exterior' | 'interior' | 'events' | 'stores';
  caption?: string;
  captionAr?: string;
  order: number;
  createdAt: Date;
}
