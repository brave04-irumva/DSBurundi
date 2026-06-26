"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function PublicSupportFormPage() {
  // Core UI states
  const [supportType, setSupportType] = useState("money"); // 'money', 'prayer', 'volunteer', 'material'
  const [paymentMethod, setPaymentMethod] = useState("ECOCASH"); // 'ECOCASH', 'LUMICASH', 'BANCOBU', 'BCB'

  // Data input states
  const [fullName, setFullName] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amountFbu, setAmountFbu] = useState("");
  const [transactionRef, setTransactionRef] = useState("");
  const [customNotes, setCustomNotes] = useState("");

  // Transaction processing states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitContribution = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const supabase = createClient();

      // Formulate clean metadata note blocks to pass parsing checks safely
      const compiledNotes = `CNI: ${identityNumber.trim()} - Name: ${fullName.trim()} - Message: ${customNotes.trim() || "None"}`;
      const numericAmount =
        supportType === "money" ? parseFloat(amountFbu) || 0 : 0;
      const selectiveMethod = supportType === "money" ? paymentMethod : "N/A";
      const selectiveRef =
        supportType === "money"
          ? transactionRef.trim().toUpperCase()
          : `REG-${Date.now().toString().substring(8)}`;

      // Execute live PostgreSQL table insertion row allocation stream
      const { data, error: insertError } = await supabase
        .from("contributions")
        .insert([
          {
            support_type: supportType,
            payment_method: selectiveMethod,
            amount_fbu: numericAmount,
            transaction_reference: selectiveRef,
            notes: compiledNotes,
          },
        ]);

      if (insertError) throw insertError;

      // Reset text inputs on processing validation success
      setSuccessMessage(
        `Mwarakoze cane! Your contribution record has been filed and logged directly into our cloud ledger.`,
      );
      setFullName("");
      setIdentityNumber("");
      setPhoneNumber("");
      setAmountFbu("");
      setTransactionRef("");
      setCustomNotes("");
    } catch (err: any) {
      setErrorMessage(
        err.message ||
          "Failed to process form stream. Verify network telemetry channels.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4 py-12 relative font-sans">
      {/* Decorative accent gradients */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl space-y-8">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-[10px] uppercase tracking-widest font-black text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Get Involved
          </span>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Support Discovery School
          </h1>
          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
            Contribute to academic infrastructure, spiritual partnerships, or
            process term tuition clearance registry notifications below.
          </p>
        </div>

        {successMessage && (
          <div className="p-4 bg-emerald-950/40 border border-emerald-900/50 text-emerald-400 rounded-2xl font-bold text-xs leading-relaxed animate-fade-in">
            🎉 SUCCESS: {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="p-4 bg-red-950/40 border border-red-900/50 text-red-400 rounded-2xl font-bold text-xs leading-relaxed animate-fade-in">
            ⚠️ TRANSACTION BLOCK: {errorMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmitContribution}
          className="space-y-6 text-xs font-medium"
        >
          {/* Track Selection Switcher */}
          <div className="space-y-2">
            <label className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
              1. Choose Support Dimension
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-bold text-center">
              {[
                { id: "money", label: "Financial / Tuition", icon: "💵" },
                { id: "prayer", label: "Spiritual / Prayer", icon: "🙏" },
                { id: "volunteer", label: "Time / Volunteer", icon: "⏳" },
                { id: "material", label: "Material Resources", icon: "📦" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSupportType(item.id);
                    setErrorMessage("");
                    setSuccessMessage("");
                  }}
                  className={`p-4 rounded-xl border transition-all flex flex-col items-center justify-center space-y-1.5 ${supportType === item.id ? "bg-white text-slate-950 border-white shadow-md scale-[1.02]" : "bg-slate-950/40 border-slate-800 text-slate-400 hover:text-white"}`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-[10px] uppercase tracking-tight block">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Identity Matrix Form Block */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                Full Legal Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="E.g., Jean-Luc Nkurunziza"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                National ID / Passport (CNI)
              </label>
              <input
                type="text"
                required
                value={identityNumber}
                onChange={(e) => setIdentityNumber(e.target.value)}
                placeholder="CNI Number or Student Identifier ID"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors font-mono uppercase"
              />
            </div>
          </div>

          {/* Dynamic Render block context: Financial Framework Gateway */}
          {supportType === "money" && (
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-5 animate-slide-down">
              <div className="space-y-2">
                <label className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                  Select Clearing Method Channel
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-bold font-mono text-[10px]">
                  {["ECOCASH", "LUMICASH", "BANCOBU", "BCB"].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`p-3 rounded-lg border transition-all ${paymentMethod === method ? "bg-amber-500 text-slate-950 border-amber-500 shadow-sm" : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"}`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic instruction notes depending on vendor options */}
              <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-[11px] leading-relaxed text-slate-400">
                {paymentMethod === "ECOCASH" && (
                  <span>
                    📱 Dial **\*141#** on your Econet line. Select Merchant
                    Payments, input code **`MERCH-25704`**, execute payment,
                    then capture the SMS transaction string.
                  </span>
                )}
                {paymentMethod === "LUMICASH" && (
                  <span>
                    📱 Dial **\*150#** on your Lumitel line. Choose Transfer
                    Money, execute to Merchant Identifier code **`25704`**, then
                    note down your confirmation text code.
                  </span>
                )}
                {paymentMethod === "BANCOBU" && (
                  <span>
                    🏛️ Execute via eNoti processing application portal or
                    deposit directly to Account Number **`01025-0048291-01`**
                    (Discovery School General Ledger).
                  </span>
                )}
                {paymentMethod === "BCB" && (
                  <span>
                    🏛️ Transfer directly to BCB Corporate Account Hub string
                    **`1004-9821034-42`**. Ensure student name references match
                    completely.
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                    Amount Specification (BIF)
                  </label>
                  <input
                    type="number"
                    required
                    value={amountFbu}
                    onChange={(e) => setAmountFbu(e.target.value)}
                    placeholder="Value in Burundian Francs"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                    SMS Receipt / Transaction Reference
                  </label>
                  <input
                    type="text"
                    required
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    placeholder="E.g., MP260621.1742.A10321"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors font-mono uppercase tracking-wider"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Alternate Context: Description boxes for Non-Financial backing tracks */}
          {supportType !== "money" && (
            <div className="space-y-1.5 animate-slide-down">
              <label className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                {supportType === "prayer" &&
                  "Prayer Partnership / Spiritual Intent Specifications"}
                {supportType === "volunteer" &&
                  "Time Commitment / Volunteer Availability Parameters"}
                {supportType === "material" &&
                  "Resource Logistics Specification (Books, Desks, Hardware, etc.)"}
              </label>
              <textarea
                required
                rows={4}
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder={
                  supportType === "prayer"
                    ? "State themes, partnership preferences, or specific prayer groups you want to mount with faculty..."
                    : supportType === "volunteer"
                      ? "List specialized departments (IT coaching, athletic tutoring, language speech therapy) and weekly hour openings..."
                      : "List resource item quantities, supply origin points, or transport delivery timeline approximations..."
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors font-medium leading-relaxed resize-none"
              />
            </div>
          )}

          {/* Submission action lines */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-white hover:bg-slate-200 text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl shadow-lg transition-all disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed transform active:scale-[0.99]"
          >
            {isSubmitting
              ? "Streaming payload parameters directly to cloud registry..."
              : "Commit Registry Declaration Token"}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-800/60 flex justify-between text-[11px] text-slate-500 font-bold">
          <Link
            href="/"
            className="hover:text-slate-300 transition-colors underline"
          >
            ← Main Page
          </Link>
          <Link
            href="/dashboard/login"
            className="hover:text-slate-300 transition-colors flex items-center space-x-1"
          >
            <span>🔐 Staff Portal Access Desk</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
