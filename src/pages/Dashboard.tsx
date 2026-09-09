import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  TrendingUp,
  Target,
  Receipt,
  ChevronRight,
  Plus,
  MoreHorizontal,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { accounts, bills, categories, goals, monthly, transactions } from "../data/mock";
import { money, date } from "../lib/format";
import { Card, Stat, Status, Button } from "../components/ui";
import Page, { AddButton } from "../components/Page";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const nav = useNavigate();
  const total = accounts.reduce((s, a) => s + a.balance, 0);
  return (
    <Page
      eyebrow="SEPTEMBER 2026"
      title="Good morning, Sarah"
      description="Here is your financial picture at a glance."
      action={<AddButton onClick={() => nav("/transactions/new")} />}
    >
      <div className="hero-banner">
        <div>
          <div className="hero-icon">
            <Sparkles size={20} />
          </div>
          <h2>Your financial freedom starts here.</h2>
          <p>
            You are <b>12% ahead</b> of your monthly savings target. Keep the momentum going.
          </p>
        </div>
        <div className="hero-score">
          <span>Financial health</span>
          <strong>82</strong>
          <small>Excellent</small>
        </div>
      </div>
      <div className="stats-grid">
        <Stat
          label="Total balance"
          value={money(total)}
          change="4.8% vs last month"
          icon={Wallet}
        />
        <Stat
          label="Income this month"
          value={money(10900)}
          change="2.1% vs Aug"
          icon={TrendingUp}
        />
        <Stat
          label="Spent this month"
          value={money(3750)}
          change="8.4% lower"
          icon={Receipt}
          positive
        />
        <Stat label="Savings progress" value="67%" change="$3,950 saved this year" icon={Target} />
      </div>
      <div className="dashboard-grid">
        <Card
          title="Cash flow"
          action={
            <button className="text-btn">
              Last 6 months <ChevronRight size={14} />
            </button>
          }
          className="chart-card"
        >
          <div className="chart-legend">
            <span>
              <i />
              Income
            </span>
            <span>
              <i />
              Expenses
            </span>
            <b>Net +$7,150</b>
          </div>
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthly}>
                <defs>
                  <linearGradient id="inc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopOpacity={0.35} />
                    <stop offset="100%" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,.05)" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#64748b"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${v / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: "#111d2d",
                    border: "1px solid rgba(255,255,255,.1)",
                    borderRadius: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#67e8f9"
                  fill="url(#inc)"
                  strokeWidth={2.5}
                />
                <Area
                  type="monotone"
                  dataKey="expense"
                  stroke="#9f8cff"
                  fill="none"
                  strokeWidth={2.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card
          title="Spending breakdown"
          action={
            <button className="text-btn" onClick={() => nav("/reports")}>
              View report <ChevronRight size={14} />
            </button>
          }
          className="donut-card"
        >
          <div className="donut">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categories}
                  dataKey="value"
                  innerRadius="68%"
                  outerRadius="90%"
                  paddingAngle={3}
                >
                  {categories.map((_, i) => (
                    <Cell
                      key={i}
                      fill={["#64e5ff", "#7d9cff", "#9f8cff", "#6cf2bb", "#f5c66b", "#f08ba5"][i]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div>
              <strong>$3,750</strong>
              <span>Total spent</span>
            </div>
          </div>
          <div className="category-list">
            {categories.slice(0, 5).map((c, i) => (
              <div key={c.name}>
                <span>
                  <i
                    style={{
                      background: ["#64e5ff", "#7d9cff", "#9f8cff", "#6cf2bb", "#f5c66b"][i],
                    }}
                  />
                  {c.name}
                </span>
                <b>{money(c.value)}</b>
              </div>
            ))}
          </div>
        </Card>
        <Card
          title="Upcoming payments"
          action={
            <button className="text-btn" onClick={() => nav("/bills")}>
              See all <ChevronRight size={14} />
            </button>
          }
        >
          <div className="bill-list">
            {bills.slice(0, 3).map((b) => (
              <div className="bill-row" key={b.id}>
                <div className="bill-icon">{b.name[0]}</div>
                <div>
                  <b>{b.name}</b>
                  <small>
                    {date(b.due)} · {b.autopay ? "Autopay on" : "Manual payment"}
                  </small>
                </div>
                <strong>{money(b.amount)}</strong>
              </div>
            ))}
          </div>
        </Card>
        <Card
          title="Recent activity"
          action={
            <button className="text-btn" onClick={() => nav("/transactions")}>
              All transactions <ChevronRight size={14} />
            </button>
          }
        >
          <div className="activity-list">
            {transactions.slice(0, 5).map((t) => (
              <div className="activity-row" key={t.id}>
                <div className={`merchant-icon ${t.type}`}>{t.title[0]}</div>
                <div>
                  <b>{t.title}</b>
                  <small>
                    {t.merchant} · {date(t.date)}
                  </small>
                </div>
                <div className={t.type === "income" ? "amount income" : "amount"}>
                  {t.type === "income" ? "+" : "-"}
                  {money(t.amount)}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="dashboard-bottom">
        <Card
          title="Goals at a glance"
          action={
            <button className="text-btn" onClick={() => nav("/goals")}>
              Manage goals <ChevronRight size={14} />
            </button>
          }
        >
          <div className="goals-inline">
            {goals.map((g) => (
              <div className="goal-mini" key={g.id}>
                <div className="goal-icon">
                  <ShieldCheck size={18} />
                </div>
                <div className="goal-main">
                  <div>
                    <b>{g.name}</b>
                    <span>
                      {money(g.saved)} / {money(g.target)}
                    </span>
                  </div>
                  <div className="progress">
                    <i style={{ width: `${Math.min(100, (g.saved / g.target) * 100)}%` }} />
                  </div>
                  <small>
                    {Math.round((g.saved / g.target) * 100)}% complete · {g.deadline}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Smart insight">
          <div className="insight">
            <div className="insight-icon">
              <Sparkles size={19} />
            </div>
            <div>
              <b>You can save another $230 this month</b>
              <p>
                Your dining and entertainment spending is above your 3-month average. A small
                adjustment could move your savings rate from 32% to 34%.
              </p>
              <button className="text-btn">
                Explore insight <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </Page>
  );
}
