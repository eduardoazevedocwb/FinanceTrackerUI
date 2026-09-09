import React from "react";
import {
  Plus,
  Search,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  CheckCircle2,
  AlertTriangle,
  CalendarDays,
} from "lucide-react";
export function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "outline" | "danger";
  className?: string;
  type?: "button" | "submit";
}) {
  return (
    <button type={type} onClick={onClick} className={`btn btn-${variant} ${className}`}>
      {children}
    </button>
  );
}
export function Card({
  children,
  className = "",
  title,
  action,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  action?: React.ReactNode;
}) {
  return (
    <section className={`card ${className}`}>
      {(title || action) && (
        <div className="card-head">
          {title && <h3>{title}</h3>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
export function Stat({
  label,
  value,
  change,
  positive = true,
  icon: Icon,
}: {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
  icon?: React.ElementType;
}) {
  return (
    <Card className="stat">
      <div className="stat-top">
        <span>{label}</span>
        {Icon && (
          <span className="icon-chip">
            <Icon size={17} />
          </span>
        )}
      </div>
      <strong>{value}</strong>
      {change && (
        <div className={positive ? "trend up" : "trend down"}>
          {positive ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />} {change}
        </div>
      )}
    </Card>
  );
}
export function EmptyState({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="empty">
      <div className="empty-orb">
        <Search size={25} />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
      {action}
    </div>
  );
}
export const IconButton = ({
  children,
  onClick,
  title,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  title?: string;
}) => (
  <button aria-label={title} title={title} onClick={onClick} className="icon-btn">
    {children}
  </button>
);
export const Select = ({
  children,
  value,
  onChange,
}: {
  children: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
}) => (
  <select className="input select" value={value} onChange={(e) => onChange(e.target.value)}>
    {children}
  </select>
);
export const Modal = ({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) =>
  open ? (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-head">
          <h2>{title}</h2>
          <IconButton onClick={onClose}>
            <span>×</span>
          </IconButton>
        </div>
        {children}
      </div>
    </div>
  ) : null;
export const Status = ({
  children,
  type = "ok",
}: {
  children: React.ReactNode;
  type?: "ok" | "warn" | "danger";
}) => (
  <span className={`status ${type}`}>
    {type === "ok" ? (
      <CheckCircle2 size={13} />
    ) : type === "warn" ? (
      <CalendarDays size={13} />
    ) : (
      <AlertTriangle size={13} />
    )}{" "}
    {children}
  </span>
);
