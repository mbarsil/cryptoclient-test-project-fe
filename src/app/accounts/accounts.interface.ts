export interface AccountData {
  id: number;
  name: string;
  category: string;
  tag: string;
  balance: number;
  availableBalance: number;
  dollarsBalance?: number;
  dollarsAvailableBalance?: number;
  increased?: boolean;
  decreased?: boolean;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  confirmedDate: string;
  type: string;
  credit: number;
  dollarsCredit?: number;
  balance: number;
  dollarsBalance?: number;
}
