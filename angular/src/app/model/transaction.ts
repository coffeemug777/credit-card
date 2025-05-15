export type Transaction = {
  id?: number;
  cardNumber: string;
  description: string;
  amount: number;
  type: string;
  date: Date;
};
