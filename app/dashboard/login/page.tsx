"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Fixed: Added internal Link navigation component
import { createClient } from "@/utils/supabase/client";

export default function DashboardLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("teacher");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const supabase = createClient();

      const { data, error: authError } = await supabase.auth.signInWithPassword(
        {
          email: email.trim(),
          password: password,
        },
      );

      if (authError) throw authError;

      setIsLoading(false);
      router.push("/dashboard");
    } catch (err: any) {
      setError(
        err.message ||
          "Authentication failed. Verify credentials or contact admin desk.",
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 relative overflow-hidden text-white">
      {/* Background aesthetic layers */}
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-amber-500 opacity-5 rounded-full blur-3xl -ml-20 -mb-20" />
      <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500 opacity-5 rounded-full blur-3xl -mr-20 -mt-20" />

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl space-y-6 text-white animate-scale-up">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-2xl flex items-center justify-center text-xl font-bold mx-auto shadow-inner">
            🔐
          </div>
          <h1 className="text-2xl font-black tracking-tight">
            Staff Portal Gateway
          </h1>
          <p className="text-xs text-slate-400">
            Discovery School Burundi Internal Management Terminal
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-950/40 text-red-400 border border-red-900/50 rounded-xl font-bold text-xs leading-normal">
            ⚠️ ACCESS DENIED: {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">
              Access Role Scope
            </label>
            <div className="grid grid-cols-2 gap-2 text-center font-bold">
              <button
                type="button"
                onClick={() => setRole("teacher")}
                className={`py-3 rounded-xl border transition-all ${role === "teacher" ? "bg-white text-slate-950 border-white shadow-sm" : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white"}`}
              >
                🎓 Teacher
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`py-3 rounded-xl border transition-all ${role === "admin" ? "bg-white text-slate-950 border-white shadow-sm" : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white"}`}
              >
                💼 Administrator
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">
              Institutional Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@discoveryschoolburundi.org"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">
              Security Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors font-mono tracking-widest"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl shadow-md transition-colors disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed"
          >
            {isLoading
              ? "Validating Session Tokens..."
              : "Authorize Internal Access"}
          </button>
        </form>

        <div className="text-center">
          {/* Fixed: Replaced raw anchor element with Next.js Link client router optimization */}
          <Link
            href="/"
            className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors underline"
          >
            ← Return to main public website
          </Link>
        </div>
      </div>
    </div>
  );
}
