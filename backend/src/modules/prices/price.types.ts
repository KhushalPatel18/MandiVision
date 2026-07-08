export interface PriceHistoryResponse {
  id: string;
  date: Date;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  commodityId: string;
  marketId: string;
}

export interface CreatePriceInput {
  date: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  commodityId: string;
  marketId: string;
}
