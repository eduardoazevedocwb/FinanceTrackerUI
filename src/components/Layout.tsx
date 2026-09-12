import type React from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import {  LayoutDashboard,  WalletCards,  ArrowLeftRight,  ReceiptText,  CreditCard,  ChartNoAxesCombined,  Target,  CalendarDays,  Lightbulb,  Landmark,  Repeat2,  Settings,  LogOut,  Search,  Bell,  Plus,  Menu,  X,  ShieldCheck, } from "lucide-react";
import { useState } from "react";
import { getUserDisplayName } from "../services/authService";
const nav = [
  ["Dashboard", "/dashboard", LayoutDashboard],
  ["Accounts", "/accounts", WalletCards],
  ["Transactions", "/transactions", ArrowLeftRight],
  ["Bills & Payments", "/bills", ReceiptText],
  ["Credit Cards", "/cards", CreditCard],
  ["Budgets", "/budgets", ChartNoAxesCombined],
  ["Goals", "/goals", Target],
  ["Calendar", "/calendar", CalendarDays],
  ["Reports", "/reports", ChartNoAxesCombined],
  ["Insights", "/insights", Lightbulb],
  ["Debts", "/debts", Landmark],
  ["Subscriptions", "/subscriptions", Repeat2],
] as const;

export default function Layout() {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  var displayName = getUserDisplayName();

  return (
    <div className="app-shell">
      <aside className={open ? "sidebar mobile-open" : "sidebar"}>
        <div className="brand">
          <div className="brand-mark">
            <span>F</span>
          </div>
          <div>
            <b>FINANCE</b>
            <b>TRACK</b>
          </div>
          <button className="mobile-close" onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>
        <div className="workspace">
          <span className="avatar small">SM</span>
          <div>
            <b>{displayName}</b>
            <small>Personal account</small>
          </div>
          <span className="dot-online" />
        </div>
        <nav>
          {nav.map(([label, path, Icon]) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <NavLink to="/settings" className="nav-item">
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>
          <button className="nav-item logout" onClick={() => navigate("/login")}>
            <LogOut size={18} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>
      <main className="main">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setOpen(true)}>
            <Menu />
          </button>
          <div className="breadcrumb">
            <span>Finance Track</span>
            <span>/</span>
            <b>Personal finance</b>
          </div>
          <div className="top-actions">
            <button className="search">
              <Search size={18} />
              <span>Search</span>
              <kbd>⌘ K</kbd>
            </button>
            <button className="icon-btn bell">
              <Bell size={19} />
              <i>3</i>
            </button>
            <button className="profile" onClick={() => navigate("/settings")}>
              <span className="avatar">SM</span>
              <span className="profile-name">{displayName}</span>
              <span>⌄</span>
            </button>
          </div>
        </header>
        <div className="content">
          <Outlet />
        </div>
        <div className="mobile-nav">
          {nav.slice(0, 4).map(([label, path, Icon]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => (isActive ? "mnav active" : "mnav")}
            >
              <Icon size={19} />
              <span>{label.split(" ")[0]}</span>
            </NavLink>
          ))}
          <button className="mnav add" onClick={() => navigate("/transactions/new")}>
            <Plus size={22} />
          </button>
          <NavLink to="/settings" className="mnav">
            <Settings size={19} />
            <span>More</span>
          </NavLink>
        </div>
      </main>
    </div>
  );
}
