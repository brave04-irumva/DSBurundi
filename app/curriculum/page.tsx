"use client";

import { useState } from "react";
import Link from "next/link";

export default function TuitionClearancePage() {
  // Input tracking states
  const [studentIdInput, setStudentIdInput] = useState("");
  const [activeChannel, setActiveChannel] = useState("BANCOBU"); // 'BANCOBU', 'BCB'

  // Network verification states
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedStudent, setVerifiedStudent] = useState<{
    fullName: string;
    grade: string;
    idToken: string;
  } | null>(null);
  const [lookupError, setLookupError] = useState("");

  const handleVerifyStudentId = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentIdInput.trim()) return;

    setIsVerifying(true);
    setLookupError("");
    setVerifiedStudent(null);

    try {
      // Execute live asynchronous HTTP query string request directly against our verification API node
      const response = await fetch(
        `/api/verify-student?code=${encodeURIComponent(studentIdInput.trim().toUpperCase())}`,
      );
      const data = await response.json();

      if (!response.ok || !data.verified) {
        throw new Error(
          data.error || "Verification failed. Student token not located.",
        );
      }

      // Populate verified profile data structure on success
      setVerifiedStudent(data.studentData);
    } catch (err: any) {
      setLookupError(
        err.message || "Failed to establish validation telemetry connections.",
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResetVerification = () => {
    setVerifiedStudent(null);
    setStudentIdInput("");
    setLookupError("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4 py-12 relative font-sans">
      {/* Structural background aesthetics */}
      <div className="absolute top-1/3 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none transform -translate-x-1/2" />

      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl space-y-8">
        <div className="text-center md:text-left space-y-2">
          <span className="text-[10px] uppercase tracking-widest font-black text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20">
            Institutional Accounting
          </span>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Tuition & Fee Clearance Gate
          </h1>
          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
            Verify official student enrollment identity credentials below to
            display custom financial settlement routing numbers for the Gihosha
            campus.
          </p>
        </div>

        {/* ERROR STATE VIEWPORT */}
        {lookupError && (
          <div className="p-4 bg-red-950/40 border border-red-900/50 text-red-400 rounded-2xl font-bold text-xs leading-relaxed">
            ⚠️ DIRECTORY ALERT: {lookupError}
          </div>
        )}

        {/* STEP A: ENROLLMENT IDENTITY CODE INPUT BLOCK (Rendered when unverified) */}
        {!verifiedStudent ? (
          <form
            onSubmit={handleVerifyStudentId}
            className="space-y-4 text-xs font-medium"
          >
            <div className="space-y-2">
              <label className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                Enter Official Student ID Code
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  required
                  value={studentIdInput}
                  onChange={(e) => setStudentIdInput(e.target.value)}
                  placeholder="E.g., DSB-041"
                  className="flex-grow bg-slate-950 border border-slate-800 rounded-xl p-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors font-mono uppercase tracking-widest"
                />
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="sm:px-8 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-800 text-slate-950 disabled:text-slate-500 font-black text-xs uppercase tracking-widest rounded-xl shadow-md transition-all whitespace-nowrap"
                >
                  {isVerifying
                    ? "Querying Roster Database..."
                    : "Verify Roster Enrollment"}
                </button>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 leading-normal">
              *Note: Access parameters require an active student registration
              token (e.g., try querying your seeded test code:{" "}
              <span className="font-mono text-slate-400 font-bold">
                DSB-041
              </span>
              ).
            </p>
          </form>
        ) : (
          /* STEP B: SECURE BANK ROUTING MATRIX (Rendered only on successful database verification lookup) */
          <div className="space-y-6 animate-scale-up">
            {/* Student Identity Verification Token Card */}
            <div className="p-4 bg-blue-950/20 border border-blue-900/40 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase tracking-wider font-bold text-blue-400 block">
                  Verified Enrollment Clearance
                </span>
                <span className="text-sm font-black text-white block">
                  {verifiedStudent.fullName}
                </span>
                <span className="text-slate-400 block font-medium">
                  {verifiedStudent.grade} — Gihosha Corporate Registry
                </span>
              </div>
              <button
                type="button"
                onClick={handleResetVerification}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold tracking-wide rounded-lg transition-colors text-[10px] self-start sm:self-auto cursor-pointer uppercase"
              >
                🔄 Switch Student
              </button>
            </div>

            {/* Corporate Channel Switch Matrix */}
            <div className="space-y-2 text-xs">
              <label className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                Select Financial Rail Channel
              </label>
              <div className="grid grid-cols-2 gap-2 text-center font-bold">
                <button
                  type="button"
                  onClick={() => setActiveChannel("BANCOBU")}
                  className={`py-3.5 rounded-xl border transition-all ${activeChannel === "BANCOBU" ? "bg-white text-slate-950 border-white shadow-md" : "bg-slate-950/40 border-slate-800 text-slate-400 hover:text-white"}`}
                >
                  🏛️ BANCOBU eNoti Channel
                </button>
                <button
                  type="button"
                  onClick={() => setActiveChannel("BCB")}
                  className={`py-3.5 rounded-xl border transition-all ${activeChannel === "BCB" ? "bg-white text-slate-950 border-white shadow-md" : "bg-slate-950/40 border-slate-800 text-slate-400 hover:text-white"}`}
                >
                  🏛️ BCB Corporate Account Hub
                </button>
              </div>
            </div>

            {/* Display Routing details mapped from active selection parameters */}
            <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-4 font-medium text-xs leading-relaxed text-slate-300">
              {activeChannel === "BANCOBU" ? (
                <div className="space-y-3">
                  <h3 className="font-bold text-white text-sm">
                    BANCOBU Processing Instructions:
                  </h3>
                  <p>
                    1. Open your **BANCOBU eNoti mobile platform** or visit the
                    nearest corporate branch desk line.
                  </p>
                  <p>
                    2. Execute payment directly against Discovery School
                    Corporate Account String:
                  </p>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl font-mono text-center text-blue-400 font-bold text-sm tracking-wider select-all">
                    01025-0048291-01
                  </div>
                  <p>
                    3. Input the student tracking token reference (
                    <span className="font-mono text-white font-bold">
                      {verifiedStudent.idToken}
                    </span>
                    ) into the tracking remarks field to guarantee automatic
                    clearance compilation.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <h3 className="font-bold text-white text-sm">
                    BCB Transfer Specifications:
                  </h3>
                  <p>
                    1. Initialize an electronic bank-to-bank wire transfer or
                    branch bank deposit sequence.
                  </p>
                  <p>
                    2. Address the institutional funds transfer directly to the
                    BCB Corporate Hub String:
                  </p>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl font-mono text-center text-blue-400 font-bold text-sm tracking-wider select-all">
                    1004-9821034-42
                  </div>
                  <p>
                    3. Reference candidate token:{" "}
                    <span className="font-mono text-white font-bold">
                      {verifiedStudent.idToken}
                    </span>
                    . Keep a physical print duplication copy of your receipt to
                    present to Mrs. Johnson.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer Navigation Backtracks */}
        <div className="pt-4 border-t border-slate-800/60 flex justify-between text-[11px] text-slate-500 font-bold">
          <Link
            href="/"
            className="hover:text-slate-300 transition-colors underline"
          >
            ← Main Public View
          </Link>
          <Link
            href="/support"
            className="hover:text-slate-300 transition-colors underline"
          >
            Report payment submission log →
          </Link>
        </div>
      </div>
    </div>
  );
}
