import { useState } from "react";
import {
  Plus,
  ChevronRight,
  MoreHorizontal,
  ArrowUpRight,
  Target,
  ShieldCheck,
  House,
  Plane,
  Receipt,
  CalendarClock,
  ToggleRight,
  Download,
  FileText,
  TrendingUp,
  Lightbulb,
  Landmark,
  Repeat2,
  Settings as SettingsIcon,
} from "lucide-react";
import { accounts, bills, budgets, goals, categories, transactions } from "../data/mock";
import { money, date } from "../lib/format";
import { Button, Card, Stat, Status, Modal, IconButton } from "../components/ui";
import Page, { AddButton } from "../components/Page";
import { useNavigate } from "react-router-dom";
export function Accounts() {
  const [open, setOpen] = useState(false);
  return (
    <Page
      title="Accounts"
      description="Connect and monitor everything you own and spend from."
      action={<AddButton onClick={() => setOpen(true)} label="Add account" />}
    >
      <div className="account-grid">
        {accounts.map((a) => (
          <Card key={a.id} className="account-card">
            <div className="account-top">
              <div className="bank-logo" style={{ background: a.color + "22", color: a.color }}>
                {a.institution[0]}
              </div>
              <IconButton>
                <MoreHorizontal />
              </IconButton>
            </div>
            <span className="muted">
              {a.institution} · {a.type}
            </span>
            <h2>{a.name}</h2>
            <strong className="account-balance">{money(a.balance)}</strong>
            <small>{a.mask}</small>
            <div className="account-footer">
              <span>Synced today</span>
              <span className="sync-dot" />
            </div>
          </Card>
        ))}
      </div>
      <Card title="Net worth">
        <div className="networth">
          <div>
            <span>Total assets</span>
            <b>$25,481.02</b>
          </div>
          <div>
            <span>Liabilities</span>
            <b>$3,284.20</b>
          </div>
          <div>
            <span>Net worth</span>
            <b className="positive">$22,196.82</b>
          </div>
        </div>
      </Card>
      <Modal open={open} onClose={() => setOpen(false)} title="Connect an account">
        <p className="muted">Choose how you want to add an account to Finance Track.</p>
        <div className="connect-grid">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Bank account
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Credit card
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cash account
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Investment
          </Button>
        </div>
      </Modal>
    </Page>
  );
}
export function Bills() {
  const [items, setItems] = useState(bills);
  return (
    <Page
      title="Bills & payments"
      description="Know what is due, when it is due, and what is already covered."
      action={
        <Button>
          <Plus size={17} /> Add bill
        </Button>
      }
    >
      <div className="stats-grid three">
        <Stat label="Due this month" value="$2,923.20" change="4 payments" icon={Receipt} />
        <Stat label="Paid this month" value="$1,800.00" change="1 payment" icon={ShieldCheck} />
        <Stat label="Overdue" value="$142.90" change="Needs attention" positive={false} />
      </div>
      <Card>
        <div className="bill-list detailed">
          {items.map((b) => (
            <div className="bill-row" key={b.id}>
              <div className="bill-icon">{b.name[0]}</div>
              <div className="bill-grow">
                <b>{b.name}</b>
                <small>
                  {b.category} · Due {date(b.due)}
                </small>
              </div>
              <span className="autopay">{b.autopay ? "Autopay" : "Manual"}</span>
              <Status
                type={b.status === "overdue" ? "danger" : b.status === "paid" ? "ok" : "warn"}
              >
                {b.status}
              </Status>
              <strong>{money(b.amount)}</strong>
              <IconButton>
                <MoreHorizontal />
              </IconButton>
            </div>
          ))}
        </div>
      </Card>
    </Page>
  );
}
export function Cards() {
  return (
    <Page
      title="Credit cards"
      description="Track limits, utilization, statements and payment dates."
    >
      <div className="credit-grid">
        <Card className="credit-card">
          <div className="cc-chip" />
          <span>PLATINUM</span>
          <strong>•••• 4812</strong>
          <div>
            <small>Sarah Miller</small>
            <small>09/28</small>
          </div>
        </Card>
        <Card title="Current statement">
          <div className="statement">
            <span>Statement balance</span>
            <b>$860.40</b>
            <span>Payment due Sep 15</span>
            <div className="progress">
              <i style={{ width: "38%" }} />
            </div>
            <small>38% of $2,250 limit used</small>
          </div>
          <Button variant="outline">Make a payment</Button>
        </Card>
      </div>
      <div className="stats-grid three">
        <Stat label="Total limit" value="$8,000" />
        <Stat label="Used" value="$3,046" />
        <Stat label="Available" value="$4,954" />
      </div>
    </Page>
  );
}
export function Budgets() {
  return (
    <Page
      title="Budgets"
      description="Give every major spending category a job before the month begins."
      action={
        <Button>
          <Plus size={17} /> New budget
        </Button>
      }
    >
      <div className="budget-grid">
        {budgets.map((b) => {
          const p = Math.min(100, (b.spent / b.limit) * 100);
          return (
            <Card key={b.id} className="budget-card">
              <div className="budget-head">
                <div>
                  <span className="muted">Monthly</span>
                  <h3>{b.category}</h3>
                </div>
                <IconButton>
                  <MoreHorizontal />
                </IconButton>
              </div>
              <div className="budget-amount">
                <b>{money(b.spent)}</b>
                <span>of {money(b.limit)}</span>
              </div>
              <div className="progress">
                <i style={{ width: `${p}%` }} />
              </div>
              <div className="budget-foot">
                <span>{Math.round(p)}% used</span>
                <b className={p > 85 ? "warning" : ""}>
                  {money(Math.max(0, b.limit - b.spent))} left
                </b>
              </div>
            </Card>
          );
        })}
      </div>
      <Card title="Budget health">
        <div className="budget-health">
          <div className="health-ring">76</div>
          <div>
            <h3>You're on track</h3>
            <p>
              Most categories are within their limits. Entertainment is the only category trending
              above its target.
            </p>
          </div>
        </div>
      </Card>
    </Page>
  );
}
const GoalIcon = ({ name }: { name: string }) =>
  name === "House" ? <House /> : name === "Plane" ? <Plane /> : <ShieldCheck />;
export function Goals() {
  return (
    <Page
      title="Goals"
      description="Turn intentions into visible progress with clear targets and dates."
      action={
        <Button>
          <Plus size={17} /> New goal
        </Button>
      }
    >
      <div className="goal-grid">
        {goals.map((g) => {
          const p = (g.saved / g.target) * 100;
          return (
            <Card key={g.id} className="goal-card">
              <div className="goal-icon">
                <GoalIcon name={g.icon} />
              </div>
              <div className="goal-head">
                <div>
                  <h3>{g.name}</h3>
                  <span>Target {g.deadline}</span>
                </div>
                <IconButton>
                  <MoreHorizontal />
                </IconButton>
              </div>
              <strong>{money(g.saved)}</strong>
              <span>of {money(g.target)}</span>
              <div className="progress">
                <i style={{ width: `${p}%` }} />
              </div>
              <div className="goal-foot">
                <b>{Math.round(p)}%</b>
                <span>{money(g.target - g.saved)} remaining</span>
              </div>
            </Card>
          );
        })}
      </div>
      <Card title="Goal strategy">
        <div className="insight">
          <div className="insight-icon">
            <Target size={19} />
          </div>
          <div>
            <b>Automate your Emergency Fund</b>
            <p>Saving $520 every month would reach your $15,000 target in about 12 months.</p>
            <Button variant="outline">Set up contribution</Button>
          </div>
        </div>
      </Card>
    </Page>
  );
}
export function Reports() {
  return (
    <Page
      title="Reports"
      description="Understand where your money went and how your habits are changing."
      secondary={
        <Button variant="outline">
          <Download size={16} /> Export
        </Button>
      }
    >
      <div className="report-grid">
        {[
          ["Cash flow", "Income vs expenses over time"],
          ["Spending", "Where your money goes"],
          ["Net worth", "Assets minus liabilities"],
          ["Budget performance", "Plan vs actual spending"],
          ["Income sources", "Salary, investments and more"],
          ["Financial health", "Your overall money score"],
        ].map(([a, b], i) => (
          <Card className="report-card" key={a}>
            <div className="report-icon">
              <FileText size={19} />
            </div>
            <h3>{a}</h3>
            <p>{b}</p>
            <button className="text-btn">
              Open report <ChevronRight size={14} />
            </button>
          </Card>
        ))}
      </div>
    </Page>
  );
}
export function Calendar() {
  return (
    <Page
      title="Financial calendar"
      description="See your money commitments in the context of your month."
    >
      <Card className="calendar-card">
        <div className="calendar-head">
          <h2>September 2026</h2>
          <div>
            <Button variant="outline">‹</Button>
            <Button variant="outline">›</Button>
          </div>
        </div>
        <div className="weekdays">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
        <div className="days">
          {Array.from({ length: 30 }, (_, i) => {
            const day = i + 1;
            const event = bills.find((b) => Number(b.due.slice(-2)) === day);
            return (
              <div className={event ? "day has-event" : ""} key={day}>
                <b>{day}</b>
                {event && <small>{event.name}</small>}
              </div>
            );
          })}
        </div>
      </Card>
    </Page>
  );
}
export function Insights() {
  return (
    <Page
      title="Insights"
      description="Simple observations that help you make better financial decisions."
    >
      <div className="insight-grid">
        {[
          [
            "You spent 18% less on transport",
            "Your transport spending dropped for the second month in a row.",
            "positive",
          ],
          [
            "Dining is trending high",
            "You have spent $812 this month, about $120 above your usual pace.",
            "warning",
          ],
          [
            "Your savings rate is healthy",
            "32% of your September income is currently allocated to savings.",
            "positive",
          ],
          ["One bill needs attention", "Electricity is overdue by 2 days.", "danger"],
        ].map(([title, text, type]) => (
          <Card key={title} className="insight-card">
            <div className={`insight-symbol ${type}`}>
              <Lightbulb size={19} />
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
            <button className="text-btn">
              See details <ChevronRight size={14} />
            </button>
          </Card>
        ))}
      </div>
    </Page>
  );
}
export function Debts() {
  return (
    <Page
      title="Debts"
      description="Track balances, interest rates and payoff progress in one place."
      action={
        <Button>
          <Plus size={17} /> Add debt
        </Button>
      }
    >
      <div className="stats-grid three">
        <Stat label="Total debt" value="$12,840" />
        <Stat label="Monthly payments" value="$690" />
        <Stat label="Debt-free target" value="Aug 2027" />
      </div>
      <Card>
        <div className="debt-list">
          {[
            ["Auto loan", "$8,420", "$420/mo", "6.8%"],
            ["Credit card", "$3,280", "$170/mo", "19.9%"],
            ["Personal loan", "$1,140", "$100/mo", "8.2%"],
          ].map((x) => (
            <div className="debt-row" key={x[0]}>
              <div className="debt-icon">
                <Landmark size={18} />
              </div>
              <div>
                <b>{x[0]}</b>
                <small>
                  {x[3]} APR · {x[2]}
                </small>
              </div>
              <strong>{x[1]}</strong>
              <IconButton>
                <MoreHorizontal />
              </IconButton>
            </div>
          ))}
        </div>
      </Card>
    </Page>
  );
}
export function Subscriptions() {
  return (
    <Page
      title="Subscriptions"
      description="See recurring charges before they quietly become part of your lifestyle."
      action={
        <Button>
          <Plus size={17} /> Add subscription
        </Button>
      }
    >
      <div className="subscription-grid">
        {[
          ["Netflix", "$15.99", "Entertainment"],
          ["Spotify", "$11.99", "Entertainment"],
          ["Cloud Storage", "$2.99", "Utilities"],
          ["Gym", "$39.90", "Health"],
        ].map((x) => (
          <Card className="subscription-card" key={x[0]}>
            <div className="sub-logo">{x[0][0]}</div>
            <div>
              <h3>{x[0]}</h3>
              <small>{x[2]} · Monthly</small>
            </div>
            <strong>{x[1]}</strong>
            <span>Next charge Sep 18</span>
            <ToggleRight size={22} />
          </Card>
        ))}
      </div>
    </Page>
  );
}
export function Settings() {
  return (
    <Page
      title="Settings"
      description="Manage your profile, preferences, security and notifications."
    >
      <div className="settings-grid">
        <Card title="Profile">
          <label>
            Name
            <input className="input" defaultValue="Sarah Miller" />
          </label>
          <label>
            Email
            <input className="input" defaultValue="sarah@example.com" />
          </label>
          <label>
            Currency
            <select className="input">
              <option>USD — US Dollar</option>
              <option>BRL — Brazilian Real</option>
              <option>EUR — Euro</option>
            </select>
          </label>
          <Button>Save changes</Button>
        </Card>
        <Card title="Preferences">
          <label className="switch-row">
            <span>
              <b>Smart insights</b>
              <small>Receive personalized observations.</small>
            </span>
            <input type="checkbox" defaultChecked />
          </label>
          <label className="switch-row">
            <span>
              <b>Bill reminders</b>
              <small>Get notified before payments are due.</small>
            </span>
            <input type="checkbox" defaultChecked />
          </label>
          <label className="switch-row">
            <span>
              <b>Weekly summary</b>
              <small>A short financial review every week.</small>
            </span>
            <input type="checkbox" defaultChecked />
          </label>
        </Card>
        <Card title="Security">
          <div className="security-row">
            <ShieldCheck />
            <div>
              <b>Two-factor authentication</b>
              <small>Recommended for every account.</small>
            </div>
            <Button variant="outline">Enable</Button>
          </div>
          <div className="security-row">
            <SettingsIcon />
            <div>
              <b>Change password</b>
              <small>Last changed 24 days ago.</small>
            </div>
            <Button variant="outline">Change</Button>
          </div>
        </Card>
      </div>
    </Page>
  );
}
export function Placeholder({
  title,
  icon: Icon = Repeat2,
}: {
  title: string;
  icon?: React.ElementType;
}) {
  return (
    <Page title={title} description="This area is ready for the Finance Track API integration.">
      <Card>
        <div className="empty">
          <div className="empty-orb">
            <Icon size={26} />
          </div>
          <h3>{title} workspace</h3>
          <p>
            The UI foundation is ready. Connect the corresponding API endpoint to populate this view
            with live customer data.
          </p>
          <Button>
            <Plus size={17} /> Add first item
          </Button>
        </div>
      </Card>
    </Page>
  );
}
