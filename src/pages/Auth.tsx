import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Button } from "../components/ui";
export default function Auth({ mode }: { mode: "login" | "register" | "forgot" | "reset" }) {
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("sarah@example.com");
  const title =
    mode === "login"
      ? "Welcome back"
      : mode === "register"
        ? "Create your account"
        : mode === "forgot"
          ? "Recover your account"
          : "Create a new password";
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    mode === "forgot" ? nav("/login") : nav("/dashboard");
  };
  return (
    <div className="auth">
      <div className="auth-art">
        <div className="art-grid" />
        <div className="auth-copy">
          <div className="brand large">
            <div className="brand-mark">
              <span>F</span>
            </div>
            <div>
              <b>FINANCE</b>
              <b>TRACK</b>
            </div>
          </div>
          <h1>
            Your financial life, <em>finally in focus.</em>
          </h1>
          <p>
            Track spending, plan ahead and build better money habits from one calm, intelligent
            workspace.
          </p>
          <div className="mini-proof">
            <ShieldCheck size={20} />
            <span>
              <b>Private by design</b>
              <small>Your financial data stays yours.</small>
            </span>
          </div>
        </div>
      </div>
      <div className="auth-panel">
        <div className="auth-form">
          <span className="eyebrow">FINANCE TRACK</span>
          <h2>{title}</h2>
          <p className="muted">
            {mode === "login"
              ? "Sign in to continue to your dashboard."
              : mode === "register"
                ? "Start your personal finance journey in minutes."
                : mode === "forgot"
                  ? "We will send a secure recovery link to your email."
                  : "Choose a strong password for your account."}
          </p>
          <form onSubmit={submit}>
            {mode !== "reset" && (
              <label>
                Email address
                <input
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
              </label>
            )}
            {mode !== "forgot" && (
              <label>
                {mode === "reset" ? "New password" : "Password"}
                <div className="password">
                  <input
                    className="input"
                    type={show ? "text" : "password"}
                    defaultValue="password123"
                    required
                  />
                  <button type="button" onClick={() => setShow(!show)}>
                    {show ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </label>
            )}
            {mode === "register" && (
              <label>
                Confirm password
                <input className="input" type="password" defaultValue="password123" />
              </label>
            )}
            <Button type="submit" className="wide">
              {mode === "forgot"
                ? "Send recovery link"
                : mode === "login"
                  ? "Sign in"
                  : mode === "register"
                    ? "Create account"
                    : "Update password"}{" "}
              <ArrowRight size={17} />
            </Button>
          </form>
          {mode === "login" && (
            <div className="auth-links">
              <button onClick={() => nav("/forgot-password")}>Forgot password?</button>
              <span>
                New here? <button onClick={() => nav("/register")}>Create account</button>
              </span>
            </div>
          )}
          {mode === "forgot" && (
            <div className="auth-links">
              <button onClick={() => nav("/login")}>Back to sign in</button>
            </div>
          )}
          {mode === "register" && (
            <div className="auth-links">
              <span>
                Already have an account? <button onClick={() => nav("/login")}>Sign in</button>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
