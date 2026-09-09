import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ArrowDownLeft,
  ArrowUpRight,
  MoreHorizontal,
  Edit3,
  Trash2,
} from "lucide-react";
import { transactions as seed } from "../data/mock";
import { money, date } from "../lib/format";
import { Button, Card, IconButton, Modal, Select, Status } from "../components/ui";
import Page, { AddButton } from "../components/Page";
import { useNavigate } from "react-router-dom";
import type { Transaction } from "../types";
export default function Transactions() {
  const nav = useNavigate();
  const [items, setItems] = useState(seed);
  const [q, setQ] = useState("");
  const [type, setType] = useState("all");
  const [cat, setCat] = useState("all");
  const [edit, setEdit] = useState<Transaction | null>(null);
  const filtered = useMemo(
    () =>
      items.filter(
        (t) =>
          (type === "all" || t.type === type) &&
          (cat === "all" || t.category === cat) &&
          `${t.title} ${t.merchant}`.toLowerCase().includes(q.toLowerCase()),
      ),
    [items, q, type, cat],
  );
  return (
    <Page
      title="Transactions"
      description="Every movement of money, organized and easy to understand."
      action={<AddButton onClick={() => nav("/transactions/new")} />}
    >
      <Card>
        <div className="toolbar">
          <div className="search-input">
            <Search size={17} />
            <input
              placeholder="Search transactions..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <Select value={type} onChange={setType}>
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expenses</option>
          </Select>
          <Select value={cat} onChange={setCat}>
            <option value="all">All categories</option>
            {[
              "Housing",
              "Food & Dining",
              "Transport",
              "Shopping",
              "Entertainment",
              "Utilities",
              "Salary",
              "Investment",
            ].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </Select>
          <Button variant="outline">
            <SlidersHorizontal size={16} /> More filters
          </Button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Category</th>
                <th>Account</th>
                <th>Date</th>
                <th>Status</th>
                <th className="right">Amount</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id}>
                  <td>
                    <div className="cell-main">
                      <div className={`merchant-icon ${t.type}`}>
                        {t.type === "income" ? (
                          <ArrowDownLeft size={17} />
                        ) : (
                          <ArrowUpRight size={17} />
                        )}
                      </div>
                      <div>
                        <b>{t.title}</b>
                        <small>{t.merchant}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="tag">{t.category}</span>
                  </td>
                  <td>{t.account}</td>
                  <td>{date(t.date)}</td>
                  <td>
                    <Status type={t.status === "pending" ? "warn" : "ok"}>{t.status}</Status>
                  </td>
                  <td className={`right amount ${t.type}`}>
                    {t.type === "income" ? "+" : "-"}
                    {money(t.amount)}
                  </td>
                  <td>
                    <IconButton onClick={() => setEdit(t)}>
                      <MoreHorizontal size={18} />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Modal open={!!edit} onClose={() => setEdit(null)} title="Transaction options">
        {edit && (
          <div className="modal-actions">
            <div className="modal-summary">
              <b>{edit.title}</b>
              <strong>{money(edit.amount)}</strong>
              <small>
                {edit.merchant} · {date(edit.date)}
              </small>
            </div>
            <Button variant="outline" onClick={() => setEdit(null)}>
              <Edit3 size={16} /> Edit transaction
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setItems(items.filter((x) => x.id !== edit.id));
                setEdit(null);
              }}
            >
              <Trash2 size={16} /> Delete transaction
            </Button>
          </div>
        )}
      </Modal>
    </Page>
  );
}
export function NewTransaction() {
  const nav = useNavigate();
  return (
    <Page
      title="Add transaction"
      description="Record income, spending, transfers or recurring movements."
    >
      <Card className="form-card">
        <div className="form-grid">
          <label>
            Type
            <select className="input">
              <option>Expense</option>
              <option>Income</option>
              <option>Transfer</option>
            </select>
          </label>
          <label>
            Amount
            <input className="input" placeholder="$ 0.00" />
          </label>
          <label>
            Merchant
            <input className="input" placeholder="e.g. Supermarket" />
          </label>
          <label>
            Category
            <select className="input">
              <option>Food & Dining</option>
              <option>Housing</option>
              <option>Transport</option>
              <option>Shopping</option>
              <option>Utilities</option>
            </select>
          </label>
          <label>
            Date
            <input className="input" type="date" defaultValue="2026-09-09" />
          </label>
          <label>
            Account
            <select className="input">
              <option>Primary Checking</option>
              <option>Emergency Savings</option>
              <option>Investment Portfolio</option>
            </select>
          </label>
          <label className="full">
            Notes
            <textarea className="input" placeholder="Optional note..." />
          </label>
          <label className="check full">
            <input type="checkbox" /> Make this a recurring transaction
          </label>
        </div>
        <div className="form-actions">
          <Button variant="outline" onClick={() => nav("/transactions")}>
            Cancel
          </Button>
          <Button onClick={() => nav("/transactions")}>Save transaction</Button>
        </div>
      </Card>
    </Page>
  );
}
