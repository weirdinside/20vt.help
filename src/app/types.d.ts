declare interface FilterOptions {
  wheel_size: number[];
  wheel_brand: string[];
  car_type: string[];
  subtype: string[];
}

declare interface ImageInfo {
  approved?: boolean;
  wheel_size: 15 | 16 | 17 | 18 | 19;
  id: number;
  subtype: 'S4' | 'S6' | '10v' | '20v';
  photo_url: string;
  wheel_brand: string;
  wheel_name: string;
  submitted_by: string;
  car_type: string;
}
