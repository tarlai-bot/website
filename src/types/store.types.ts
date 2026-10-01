export enum StoreCategory {
  FASHION = "fashion",
  FOOD_BEVERAGE = "food_beverage",
  ENTERTAINMENT = "entertainment",
  HYPERMARKET = "hypermarket",
  SERVICES = "services",
}

export enum Floor {
  BASEMENT = "basement",
  GROUND = "ground",
  FIRST = "first",
  SECOND = "second",
  MEZZANINE = "mezzanine",
  ROOF = "roof",
}

export interface Store {
  id: string;
  name: string;
  nameAr: string;
  logo: string;
  category: StoreCategory;
  floor: Floor;
  description: string;
  descriptionAr: string;
  status: "open" | "coming_soon" | "closed";
  phone?: string;
  email?: string;
  website?: string;
  workingHours?: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface StoreFilters {
  category?: StoreCategory;
  floor?: Floor;
  search?: string;
}
