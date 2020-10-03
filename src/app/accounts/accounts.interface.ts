export interface AccountData {
  id: number;
  name: string;
  category: string;
  tag: string;
  balance: number;
  availableBalance: number;
  dollarsBalance?: number;
  dollarsAvailableBalance?: number;
}
