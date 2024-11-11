declare interface FilterOptions {
  wheel_size: number[];
  wheel_brand: string[];
  car_type: string[];
  subtype?: string[];
}

declare interface ImageInfo {
  approved?: boolean;
  wheel_size: number;
  id: number;
  photo_url: string;
  wheel_brand: string;
  wheel_name: string;
  submitted_by: string;
  car_type: string;
}
