import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Button } from "../components/ui";
import { login, register } from "../services/authService";

export default function Auth({ mode }: { mode: "login" | "register" }) {

  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("")

  const title =
    mode === "login" ? "Welcome" : 
    mode === "register" ? "Create your account" :
    "Finance Track";

  const  submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try{
      if(mode == "login"){
        await login({email: email, password: psw});      
      }
      else if(mode == "register"){
        await register({email: email, password: psw});      
      }

      nav("/dashboard", {replace: true});
    } 
    catch(err){
      console.log("error" + err);
    } 
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
            {mode === "login" ? "Sign in to continue to your dashboard." : 
             mode === "register" ? "Start your personal finance journey in minutes." : 
             "Choose a strong password for your account."}
          </p>
          <form onSubmit={submit}>
             {(
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
            {(
              <label>
                Password
                <div className="password">
                  <input
                    className="input"
                    type={show ? "text" : "password"}
                    value={psw}
                    onChange={(e) => setPsw(e.target.value)}
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
                <input className="input" type="password" />
              </label>
            )}
            <Button type="submit">
              { mode === "login" ? "Sign in" : 
                mode === "register" ? "Create account" : 
                "Submit"}{" "}
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
