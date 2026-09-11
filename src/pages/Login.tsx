import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

type Mode = "login" | "register";

interface FormState {
  name: string;
  username: string;
  emailOrUsername: string;
  email: string;
  password: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  username: "",
  emailOrUsername: "",
  email: "",
  password: "",
};

export function Login() {
  // const [mode, setMode] = useState<Mode>("login");
  // const [form, setForm] = useState<FormState>(EMPTY_FORM);
  // const [error, setError] = useState<string | null>(null);
  // const [submitting, setSubmitting] = useState(false);

  // const { login, register } = useAuth();
  // const navigate = useNavigate();

  // function updateField(field: keyof FormState, value: string) {
  //   setForm((prev) => ({ ...prev, [field]: value }));
  // }

  // function switchMode(next: Mode) {
  //   setMode(next);
  //   setError(null);
  //   setForm(EMPTY_FORM);
  // }

  // async function handleSubmit(e: FormEvent) {
  //   console.log("test")
  //   e.preventDefault();
  //   setError(null);
  //   setSubmitting(true);

  //   try {
  //     if (mode === "login") {
  //       await login({
  //         emailOrUsername: form.emailOrUsername,
  //         password: form.password,
  //       });
  //     } else {
  //       await register({
  //         name: form.name,
  //         username: form.username,
  //         email: form.email,
  //         password: form.password,
  //       });
  //     }
  //     navigate("/dashboard", { replace: true });
  //   } catch (err) {
      
  //     setError(err instanceof Error ? err.message : "Something went wrong");
  //   } finally {
  //     setSubmitting(false);
  //   }
  // }

  // return (
  //   <div className="auth-screen">
  //     <aside className="auth-panel">
  //       <div className="auth-panel__mark">FinanceTrack</div>
  //       <p className="auth-panel__line">
  //         Every record here — accounts, income, expenses, budgets — belongs to
  //         one person only: you. Nothing is shared, nothing is guessed.
  //       </p>
  //       <div className="auth-panel__rule" />
  //       <p className="auth-panel__note">
  //         Your session is verified on every request. Sign out anywhere and
  //         access ends immediately.
  //       </p>
  //     </aside>

  //     <main className="auth-form-wrap">
  //       <form className="auth-form"  onSubmit={handleSubmit} noValidate>
  //         <h1 className="auth-form__title">
  //           {mode === "login" ? "Sign in" : "Create your account"}
  //         </h1>
  //         <p className="auth-form__subtitle">
  //           {mode === "login"
  //             ? "Use your email or username."
  //             : "Takes under a minute."}
  //         </p>

  //         {mode === "register" && (
  //           <>
  //             <label className="auth-field">
  //               <span>Name</span>
  //               <input
  //                 type="text"
  //                 value={form.name}
  //                 onChange={(e) => updateField("name", e.target.value)}
  //                 autoComplete="name"
  //                 required
  //               />
  //             </label>

  //             <label className="auth-field">
  //               <span>Username</span>
  //               <input
  //                 type="text"
  //                 value={form.username}
  //                 onChange={(e) => updateField("username", e.target.value)}
  //                 autoComplete="username"
  //                 required
  //               />
  //             </label>

  //             <label className="auth-field">
  //               <span>Email</span>
  //               <input
  //                 type="email"
  //                 value={form.email}
  //                 onChange={(e) => updateField("email", e.target.value)}
  //                 autoComplete="email"
  //                 required
  //               />
  //             </label>
  //           </>
  //         )}

  //         {mode === "login" && (
  //           <label className="auth-field">
  //             <span>Email or username</span>
  //             <input
  //               type="text"
  //               value={form.emailOrUsername}
  //               onChange={(e) => updateField("emailOrUsername", e.target.value)}
  //               autoComplete="username"
  //               required
  //             />
  //           </label>
  //         )}

  //         <label className="auth-field">
  //           <span>Password</span>
  //           <input
  //             type="password"
  //             value={form.password}
  //             onChange={(e) => updateField("password", e.target.value)}
  //             autoComplete={mode === "login" ? "current-password" : "new-password"}
  //             minLength={8}
  //             required
  //           />
  //         </label>

  //         {error && (
  //           <div className="auth-error" role="alert">
  //             {error}
  //           </div>
  //         )}

  //         <button className="auth-submit" type="submit" disabled={submitting}>
  //           {submitting
  //             ? "Please wait…"
  //             : mode === "login"
  //               ? "Sign in"
  //               : "Create account"}
  //         </button>

  //         <button
  //           className="auth-switch"
  //           type="button"
  //           onClick={() => switchMode(mode === "login" ? "register" : "login")}
  //         >
  //           {mode === "login"
  //             ? "Don't have an account? Create one"
  //             : "Already have an account? Sign in"}
  //         </button>
  //       </form>
  //     </main>
  //   </div>
  // );
}
