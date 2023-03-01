export interface UserExpense {
  itemId: string;
  datePurchased: string;
  retailerName: string;
  cost: number | string;
  itemDescription: string;
}

export interface BaseFirebaseResponse {
  ok: boolean;
  messages?: string[];
}
