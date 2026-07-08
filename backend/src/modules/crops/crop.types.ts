export interface CropResponse {
  id: string;
  name: string;
  category: string;
}

export interface CreateCropInput {
  name: string;
  category: string;
}
