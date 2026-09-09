export type TransactionType = "income" | "expense";
export type TransactionCategory =
  | "Housing"
  | "Food & Dining"
  | "Transport"
  | "Shopping"
  | "Entertainment"
  | "Health"
  | "Utilities"
  | "Salary"
  | "Investment"
  | "Other";
export interface Transaction {
  id: string;
  title: string;
  merchant: string;
  amount: number;
  type: TransactionType;
  date: string;
  category: TransactionCategory;
  account: string;
  status: "completed" | "pending";
}
export interface Account {
  id: string;
  name: string;
  institution: string;
  type: "Checking" | "Savings" | "Investment" | "Cash";
  balance: number;
  mask: string;
  color: string;
}
export interface Bill {
  id: string;
  name: string;
  due: string;
  amount: number;
  category: string;
  autopay: boolean;
  status: "upcoming" | "overdue" | "paid";
}
export interface Goal {
  id: string;
  name: string;
  target: number;
  saved: number;
  deadline: string;
  icon: string;
}
export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
}
