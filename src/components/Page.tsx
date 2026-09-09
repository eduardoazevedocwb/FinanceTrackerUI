import type React from "react";
import { Plus, Download, Filter } from "lucide-react";
import { Button } from "./ui";
export default function Page({
  eyebrow,
  title,
  description,
  children,
  action,
  secondary,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  secondary?: React.ReactNode;
}) {
  return (
    <>
      <div className="page-title">
        <div>
          <span className="eyebrow">{eyebrow || "FINANCE TRACK"}</span>
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>
        <div className="page-actions">
          {secondary}
          {action}
        </div>
      </div>
      {children}
    </>
  );
}
export const AddButton = ({
  onClick,
  label = "Add transaction",
}: {
  onClick: () => void;
  label?: string;
}) => (
  <Button onClick={onClick}>
    <Plus size={17} />
    {label}
  </Button>
);
