export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cats: Cat[];
}

export interface Cat {
  name: string;
  subscriptionActive: boolean;
  breed: string;
  pouchSize: PouchSize;
}

export type PouchSize = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface NextDeliveryResponse {
  title: string;
  message: string;
  totalPrice: number;
  freeGift: boolean;
}
