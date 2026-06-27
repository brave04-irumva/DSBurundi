"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function MainDashboardOverview() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState("overview");
  const [metrics, setMetrics] = useState({
    totalSupportEntries: 0,
    verifiedTuitionClearances: 0,
    pendingFileUploads: 0,
  });
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Grading ledger workstation states
  const [roster, setRoster] = useState([]);
  const [loadingGrades, setLoadingGrades] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [editMarks, setEditMarks] = useState<any>({});
  const [editComments, setEditComments] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Storage upload states
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState("");

  // Financial Auditing local operation processing states
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Subjects configuration definitions
  const coreSubjects = ["mathematics", "english", "science", "kirundi"];

  useEffect(() => {
    fetchDashboardMetrics();
  }, [currentTab]);

  async function fetchDashboardMetrics() {
    try {
      const response = await fetch("/api/dashboard");
      if (!response.ok)
        throw new Error("Failed to pull treasury metrics token stream.");

      const data = await response.json();
      if (data.success) {
        setMetrics(data.summary);
        setSubmissions(data.recentSubmissions || []);
      }
    } catch (err: any) {
      setError(err.message || "Metrics parsing error.");
    } finally {
      setLoading(false);
    }
  }

  // Load active grading ledger roster states dynamically when entering the grades context view
  useEffect(() => {
    if (currentTab === "grades") {
      fetchGradingRoster();
    }
  }, [currentTab]);

  async function fetchGradingRoster() {
    setLoadingGrades(true);
    setError("");
    try {
      const response = await fetch("/api/grades");
      const data = await response.json();
      if (data.success) {
        setRoster(data.roster);
        if (data.roster.length > 0 && !selectedStudent) {
          loadStudentIntoWorkstation(data.roster[0]);
        }
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      setError(err.message || "Failed to parse system evaluation roster.");
    } finally {
      setLoadingGrades(false);
    }
  }

  const loadStudentIntoWorkstation = (student: any) => {
    setSelectedStudent(student);
    setEditComments(student.comments);

    const localizedMarks: any = {};
    coreSubjects.forEach((subject) => {
      localizedMarks[subject] = {
        test: student.marks[subject]?.test ?? "",
        exam: student.marks[subject]?.exam ?? "",
      };
    });
    setEditMarks(localizedMarks);
    setSaveSuccess(false);
  };

  const handleMarkChange = (
    subject: string,
    field: "test" | "exam",
    value: string,
  ) => {
    setSaveSuccess(false);
    const numericValue =
      value === "" ? "" : Math.min(100, Math.max(0, parseInt(value) || 0));
    setEditMarks((prev: any) => ({
      ...prev,
      [subject]: {
        ...prev[subject],
        [field]: numericValue,
      },
    }));
  };

  const handleSaveReportCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaveSuccess(false);

    try {
      const compiledMarks: any = {};
      coreSubjects.forEach((subject) => {
        const testMark = parseInt(editMarks[subject]?.test) || 0;
        const examMark = parseInt(editMarks[subject]?.exam) || 0;
        const totalWeighted = Math.round(testMark * 0.4 + examMark * 0.6);

        compiledMarks[subject] = {
          test: editMarks[subject]?.test === "" ? 0 : testMark,
          exam: editMarks[subject]?.exam === "" ? 0 : examMark,
          total: totalWeighted,
        };
      });

      const response = await fetch("/api/grades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentUuid: selectedStudent.studentUuid,
          gradeLevel: selectedStudent.gradeLevel,
          term: selectedStudent.term,
          marks: compiledMarks,
          comments: editComments,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success)
        throw new Error(data.error || "Failed to commit ledger parameters.");

      setSaveSuccess(true);

      const updatedRoster: any = roster.map((item: any) => {
        if (item.studentUuid === selectedStudent.studentUuid) {
          return { ...item, marks: compiledMarks, comments: editComments };
        }
        return item;
      });
      setRoster(updatedRoster);
    } catch (err: any) {
      setError(
        err.message || "Failed to deploy evaluation parameters to cloud node.",
      );
    }
  };

  // 🏛️ Live Audit Reconciliation Click Handler
  const handleAuditTransaction = async (
    contributionId: string,
    status: "VERIFIED" | "REJECTED",
    rawNotes: string,
  ) => {
    setError("");
    setProcessingId(contributionId);

    // Dynamic extraction: look inside the note string to parse out student identifiers (like DSB-041)
    let detectedStudentCode = "";
    const match = rawNotes.match(/DSB-\d+/i);
    if (match) {
      detectedStudentCode = match[0].toUpperCase();
    }

    try {
      const response = await fetch("/api/verify-contribution", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contributionId,
          status,
          targetStudentCode: detectedStudentCode || null,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success)
        throw new Error(data.error || "Reconciliation route mismatch.");

      // Refresh data logs instantly on the view frame without requiring page reloads
      await fetchDashboardMetrics();
    } catch (err: any) {
      setError(err.message || "Failed to finalize database audit parameters.");
    } finally {
      setProcessingId(null);
    }
  };

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      const { error: logoutError } = await supabase.auth.signOut();
      if (logoutError) throw logoutError;
      router.refresh();
      router.push("/dashboard/login");
    } catch (err: any) {
      setError(err.message || "Session termination failure.");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setUploadSuccessMessage("");

    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setUploadingFile(true);

    try {
      const supabase = createClient();
      const fileExtension = file.name.split(".").pop();
      const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery-vault")
        .upload(cleanFileName, file, { cacheControl: "3600", upsert: false });

      if (uploadError) throw uploadError;
      setUploadSuccessMessage(
        `Successfully compiled and pushed: ${file.name} to cloud storage!`,
      );
    } catch (err: any) {
      setError(err.message || "Failed to stream asset binary to cloud.");
    } finally {
      setUploadingFile(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center font-sans text-xs tracking-widest text-slate-400 uppercase">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <span>Compiling Registry Node Canvas...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      {/* 🧭 LEFT SIDEBAR CONTROL PANEL */}
      <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between p-6 flex-shrink-0 md:h-screen md:sticky md:top-0">
        <div className="space-y-8">
          <div className="space-y-1">
            <h2 className="text-lg font-black tracking-tight text-white uppercase">
              Discovery Desk
            </h2>
            <p className="text-[10px] uppercase tracking-widest font-bold text-amber-500">
              System Dashboard
            </p>
          </div>

          <nav className="flex flex-col space-y-1 text-xs font-bold text-slate-400">
            <button
              type="button"
              onClick={() => setCurrentTab("overview")}
              className={`w-full p-3 rounded-xl text-left transition-colors flex items-center space-x-3 cursor-pointer ${currentTab === "overview" ? "bg-slate-800 text-white border-l-4 border-amber-500 pl-2" : "hover:bg-slate-800/40 hover:text-white"}`}
            >
              <span>📊</span> <span>Overview Dashboard</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentTab("vault")}
              className={`w-full p-3 rounded-xl text-left transition-colors flex items-center space-x-3 cursor-pointer ${currentTab === "vault" ? "bg-slate-800 text-white border-l-4 border-amber-500 pl-2" : "hover:bg-slate-800/40 hover:text-white"}`}
            >
              <span>🖼️</span> <span>Gallery Vault Uploads</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentTab("grades")}
              className={`w-full p-3 rounded-xl text-left transition-colors flex items-center space-x-3 cursor-pointer ${currentTab === "grades" ? "bg-slate-800 text-white border-l-4 border-amber-500 pl-2" : "hover:bg-slate-800/40 hover:text-white"}`}
            >
              <span>📝</span> <span>Student Report Cards</span>
            </button>
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800 text-xs space-y-3 mt-auto">
          <div>
            <span className="font-bold text-white block">Mrs. Johnson</span>
            <span className="text-[10px] text-slate-500 block font-medium">
              Registrar Admin
            </span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full text-center py-2.5 bg-slate-950 border border-slate-800 text-red-400 hover:bg-red-950/30 hover:border-red-900 rounded-xl transition-all font-bold cursor-pointer uppercase tracking-wider text-[10px]"
          >
            🚪 Log Out Staff
          </button>
        </div>
      </aside>

      {/* 🖥️ MAIN WORKSPACE VIEWPORT */}
      <main className="flex-grow p-6 md:p-10 space-y-8 overflow-y-auto max-h-screen">
        {error && (
          <div className="p-3.5 bg-red-950/40 text-red-400 border border-red-900/50 rounded-xl font-bold text-xs">
            ⚠️ Node Error: {error}
          </div>
        )}

        {/* TAB 1: OVERVIEW AUDIT SCREEN */}
        {currentTab === "overview" && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-black text-white tracking-tight">
                System Status Overview
              </h1>
              <p className="text-xs text-slate-400">
                Live summary counters synchronized from application logs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase block tracking-wider">
                  Active Support Entries
                </span>
                <span className="text-3xl font-black text-white block">
                  {metrics.totalSupportEntries}
                </span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase block tracking-wider">
                  Verified Tuition Clearances
                </span>
                <span className="text-3xl font-black text-emerald-400 block">
                  {metrics.verifiedTuitionClearances}
                </span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase block tracking-wider">
                  Pending File Uploads
                </span>
                <span className="text-3xl font-black text-amber-500 block">
                  {metrics.pendingFileUploads}
                </span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-slate-800 bg-slate-900/50">
                <h3 className="font-bold text-sm text-white">
                  Financial Clearance Audit Station
                </h3>
              </div>
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-500 font-bold bg-slate-950/20">
                      <th className="p-4">Reference Token</th>
                      <th className="p-4">Submission Metadata</th>
                      <th className="p-4">Method</th>
                      <th className="p-4">Value (BIF)</th>
                      <th className="p-4 text-center">Audit Status</th>
                      <th className="p-4 text-right">Action Gate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-medium text-slate-300">
                    {submissions.map((row: any) => {
                      const status = row.verification_status || "PENDING";
                      const isProcessing = processingId === row.id;

                      return (
                        <tr
                          key={row.id}
                          className="hover:bg-slate-800/20 transition-colors"
                        >
                          <td className="p-4 font-mono text-[11px] text-amber-500 max-w-[120px] truncate">
                            {row.transaction_reference || row.id}
                          </td>
                          <td className="p-4 text-white max-w-[220px] truncate">
                            <span className="block font-bold">
                              {row.notes
                                ?.split(" - ")[1]
                                ?.replace("Name: ", "") ||
                                "Anonymous Submitter"}
                            </span>
                            <span className="block text-[10px] text-slate-500 truncate">
                              {row.notes || "No metadata flags compiled."}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 bg-slate-800 text-slate-400 rounded text-[10px] font-bold uppercase">
                              {row.payment_method || row.type}
                            </span>
                          </td>
                          <td className="p-4 font-bold text-slate-200">
                            {parseInt(
                              row.amount_fbu || row.amount || 0,
                            ).toLocaleString()}{" "}
                            FBU
                          </td>
                          <td className="p-4 text-center">
                            <span
                              className={`px-2 py-1 rounded-full text-[9px] font-black tracking-wider uppercase ${
                                status === "VERIFIED"
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : status === "REJECTED"
                                    ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              }`}
                            >
                              {status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            {status === "PENDING" ? (
                              <div className="flex justify-end gap-1.5">
                                <button
                                  type="button"
                                  disabled={isProcessing}
                                  onClick={() =>
                                    handleAuditTransaction(
                                      row.id,
                                      "VERIFIED",
                                      row.notes || "",
                                    )
                                  }
                                  className="px-2.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-800 text-slate-950 font-extrabold text-[10px] rounded uppercase tracking-wider transition-colors cursor-pointer"
                                >
                                  {isProcessing ? "..." : "Approve"}
                                </button>
                                <button
                                  type="button"
                                  disabled={isProcessing}
                                  onClick={() =>
                                    handleAuditTransaction(
                                      row.id,
                                      "REJECTED",
                                      row.notes || "",
                                    )
                                  }
                                  className="px-2.5 py-1.5 bg-slate-800 hover:bg-red-950 hover:text-red-400 border border-slate-700 hover:border-red-900 disabled:bg-slate-800 text-slate-300 font-extrabold text-[10px] rounded uppercase tracking-wider transition-all cursor-pointer"
                                >
                                  {isProcessing ? "..." : "Reject"}
                                </button>
                              </div>
                            ) : (
                              <span className="text-[11px] text-slate-600 font-bold italic pr-2">
                                Reconciled
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GALLERY VAULT SCREEN */}
        {currentTab === "vault" && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-black text-white tracking-tight">
                Gallery Vault Storage
              </h1>
              <p className="text-xs text-slate-400">
                Upload high-resolution highlights direct to server CDN storage
                buckets.
              </p>
            </div>

            {uploadSuccessMessage && (
              <div className="p-4 bg-emerald-950/40 border border-emerald-900 text-emerald-400 rounded-2xl font-bold text-xs">
                🎉 {uploadSuccessMessage}
              </div>
            )}

            <div className="border-2 border-dashed border-slate-800 bg-slate-900/20 rounded-3xl p-12 text-center space-y-4 relative">
              <div className="text-4xl">{uploadingFile ? "⏳" : "📤"}</div>
              <div className="space-y-1">
                <p className="font-bold text-sm text-white">
                  {uploadingFile
                    ? "Streaming bytes up to cloud repository storage..."
                    : "Upload campus highlights or staff portraits"}
                </p>
                <p className="text-[11px] text-slate-500">
                  Supports PNG, JPG assets up to 10MB each.
                </p>
              </div>

              <div className="pt-2">
                <label className="inline-block bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-6 py-3 rounded-xl border border-slate-700 transition-all cursor-pointer shadow-sm">
                  <span>
                    {uploadingFile
                      ? "Uploading File Asset..."
                      : "Select Image File"}
                  </span>
                  <input
                    type="file"
                    disabled={uploadingFile}
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: GRADING WORKSTATION */}
        {currentTab === "grades" && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-black text-white tracking-tight">
                Terminal Marks Matrix
              </h1>
              <p className="text-xs text-slate-400">
                Manage relational JSON student profiles and log academic
                evaluations safely.
              </p>
            </div>

            {saveSuccess && (
              <div className="p-3.5 bg-emerald-950/40 border border-emerald-900 text-emerald-400 rounded-xl font-bold text-xs">
                🎉 Success: Marks compiled and saved securely to the cloud
                record database node.
              </div>
            )}

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-72 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 h-fit flex-shrink-0">
                <h3 className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                  Campus Student Roster
                </h3>
                {loadingGrades ? (
                  <p className="text-xs text-slate-400 animate-pulse py-4 text-center">
                    Loading registry records...
                  </p>
                ) : (
                  <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1">
                    {roster.map((student: any) => (
                      <button
                        key={student.studentUuid}
                        type="button"
                        onClick={() => loadStudentIntoWorkstation(student)}
                        className={`w-full p-3 rounded-xl text-left transition-all block cursor-pointer border ${selectedStudent?.studentUuid === student.studentUuid ? "bg-amber-500 border-amber-500 text-slate-950 font-bold shadow-md" : "bg-slate-950/40 border-slate-800 text-slate-300 hover:bg-slate-800/50"}`}
                      >
                        <span className="block font-bold text-xs tracking-tight truncate">
                          {student.fullName}
                        </span>
                        <span
                          className={`block text-[10px] uppercase tracking-wider font-semibold ${selectedStudent?.studentUuid === student.studentUuid ? "text-slate-800" : "text-slate-500"}`}
                        >
                          {student.studentCode} — {student.gradeLevel}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {selectedStudent && (
                <form
                  onSubmit={handleSaveReportCard}
                  className="flex-grow bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6"
                >
                  <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h2 className="text-lg font-black text-white tracking-tight">
                        {selectedStudent.fullName}
                      </h2>
                      <p className="text-[11px] font-semibold text-amber-500 uppercase tracking-widest font-mono">
                        Evaluation: {selectedStudent.term} —{" "}
                        {selectedStudent.gradeLevel}
                      </p>
                    </div>
                  </div>

                  <div className="overflow-x-auto border border-slate-800 rounded-xl">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-950/50 border-b border-slate-800 font-bold text-slate-400">
                          <th className="p-4 uppercase tracking-wider text-[10px]">
                            Subject Matter Node
                          </th>
                          <th className="p-4 w-28 text-center uppercase tracking-wider text-[10px]">
                            Test score (40%)
                          </th>
                          <th className="p-4 w-28 text-center uppercase tracking-wider text-[10px]">
                            Exam score (60%)
                          </th>
                          <th className="p-4 w-32 text-right uppercase tracking-wider text-[10px]">
                            Calculated term score
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-semibold">
                        {coreSubjects.map((subject) => {
                          const testVal = editMarks[subject]?.test ?? "";
                          const examVal = editMarks[subject]?.exam ?? "";
                          const liveTotal =
                            testVal === "" && examVal === ""
                              ? 0
                              : Math.round(
                                  (parseInt(testVal) || 0) * 0.4 +
                                    (parseInt(examVal) || 0) * 0.6,
                                );

                          return (
                            <tr
                              key={subject}
                              className="hover:bg-slate-950/10 transition-colors"
                            >
                              <td className="p-4 font-bold text-white uppercase tracking-wider text-[11px]">
                                {subject}
                              </td>
                              <td className="p-4">
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={testVal}
                                  onChange={(e) =>
                                    handleMarkChange(
                                      subject,
                                      "test",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="0"
                                  className="w-20 mx-auto block bg-slate-950 border border-slate-800 rounded-lg p-2 text-center text-white focus:outline-none focus:border-amber-500 font-mono font-bold"
                                />
                              </td>
                              <td className="p-4">
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={examVal}
                                  onChange={(e) =>
                                    handleMarkChange(
                                      subject,
                                      "exam",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="0"
                                  className="w-20 mx-auto block bg-slate-950 border border-slate-800 rounded-lg p-2 text-center text-white focus:outline-none focus:border-amber-500 font-mono font-bold"
                                />
                              </td>
                              <td className="p-4 text-right pr-6 font-mono font-black text-sm">
                                <span
                                  className={
                                    liveTotal >= 50
                                      ? "text-emerald-400"
                                      : "text-rose-500"
                                  }
                                >
                                  {liveTotal} / 100
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                      General Faculty Comments
                    </label>
                    <textarea
                      rows={3}
                      value={editComments}
                      onChange={(e) => setEditComments(e.target.value)}
                      placeholder="Input remarks regarding student behavior, development benchmarks, and campus leadership attributes..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 font-medium leading-relaxed resize-none"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-md transition-colors cursor-pointer transform active:scale-[0.99]"
                    >
                      Commit Evaluation Ledger Rows
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
