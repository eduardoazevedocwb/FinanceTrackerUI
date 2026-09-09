import { api } from "./client";
import type { Account, Bill, Budget, Goal, Transaction } from "../types";
export const financeApi = {
  dashboard: () => api<unknown>("/dashboard"),
  transactions: () => api<Transaction[]>("/transactions"),
  createTransaction: (payload: Partial<Transaction>) =>
    api<Transaction>("/transactions", { method: "POST", body: JSON.stringify(payload) }),
  accounts: () => api<Account[]>("/accounts"),
  bills: () => api<Bill[]>("/bills"),
  budgets: () => api<Budget[]>("/budgets"),
  goals: () => api<Goal[]>("/goals"),
  reports: (report: string) => api<unknown>(`/reports/${report}`),
  insights: () => api<unknown[]>("/insights"),
};
