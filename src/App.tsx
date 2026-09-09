import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Transactions, { NewTransaction } from "./pages/Transactions";
import {
  Accounts,
  Bills,
  Cards,
  Budgets,
  Goals,
  Reports,
  Calendar,
  Insights,
  Debts,
  Subscriptions,
  Settings,
  Placeholder,
} from "./pages/FinancePages";
import "./styles.css";
const App = () => (
  <Routes>
    <Route path="/login" element={<Auth mode="login" />} />
    <Route path="/register" element={<Auth mode="register" />} />
    <Route path="/forgot-password" element={<Auth mode="forgot" />} />
    <Route path="/reset-password" element={<Auth mode="reset" />} />
    <Route element={<Layout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/accounts" element={<Accounts />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/transactions/new" element={<NewTransaction />} />
      <Route path="/bills" element={<Bills />} />
      <Route path="/cards" element={<Cards />} />
      <Route path="/budgets" element={<Budgets />} />
      <Route path="/goals" element={<Goals />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/insights" element={<Insights />} />
      <Route path="/debts" element={<Debts />} />
      <Route path="/subscriptions" element={<Subscriptions />} />
      <Route path="/settings" element={<Settings />} />
    </Route>
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
);
export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
