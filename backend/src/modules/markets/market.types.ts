export interface MarketResponse {
  id: string;
  name: string;
  district: string;
  stateId: string;
}

export interface CreateMarketInput {
  name: string;
  district: string;
  stateId: string;
}
