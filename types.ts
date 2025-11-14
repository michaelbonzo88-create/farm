
export type Page = 'login' | 'dashboard' | 'farm' | 'crop' | 'report';

export interface FarmData {
  farmerName: string;
  farmName: string;
  area: string;
  soilType: string;
}

export interface CropData {
  variety: string;
  cropStage: string;
  irrigationType: string;
  fertilizerUsed: string;
}

export interface Photo {
  file: File;
  previewUrl: string;
}
