"use client"

import { useState, useEffect } from "react";
import { RefreshCw, Database, Trash2, CloudUpload, Loader2, CheckCircle2, AlertCircle, X } from "lucide-react";
import { getApiData } from "@/utils/api";

type StatusMessage = {
  text: string;
  type: "success" | "error" | null;
};

export default function SyncDatabasePanel() {
  const [loading, setLoading] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusMessage>({ text: "", type: null });

  // Auto-clear status after 5 seconds
  useEffect(() => {
    if (status.text) {
      const timer = setTimeout(() => setStatus({ text: "", type: null }), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleAction = async (title: string, slug: string) => {
    setLoading(title);
    setStatus({ text: "", type: null });

    try {
      // const result = await getApiData(slug, "POST", { timestamp: Date.now() }, "authorize");

      const result = await getApiData(`/administrator/${slug}`, "POST", { timestamp: Date.now() }, "authorize");

      console.log("result:", result);


      if (result && result.ok !== false) {
        setStatus({
          text: `Success: ${title} completed successfully.`,
          type: "success"
        });
      } else {
        setStatus({
          text: `Failed: ${result?.message || "Server returned an error."}`,
          type: "error"
        });
      }
    } catch (error) {
      setStatus({
        text: "Connection Error: Could not reach the server.",
        type: "error"
      });
    } finally {
      setLoading(null);
    }
  };

  const panels = [
    { id: "sync", title: "Full Sync", slug: "sync-db", icon: <RefreshCw className="text-blue-500" />, color: "bg-blue-50 text-blue-700 hover:bg-blue-100", desc: "Sync data for production." },
    { id: "backup", title: "Backup Data", slug: "create-backup", icon: <Database className="text-emerald-500" />, color: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100", desc: "Snapshot current database state." },
    { id: "push", title: "Push Templates", slug: "push-templates", icon: <CloudUpload className="text-purple-500" />, color: "bg-purple-50 text-purple-700 hover:bg-purple-100", desc: "Upload JSON configs to storage." },
    { id: "clear", title: "Clear Cache", slug: "clear-cache", icon: <Trash2 className="text-rose-500" />, color: "bg-rose-50 text-rose-700 hover:bg-rose-100", desc: "Purge Next.js and CDN caches." },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Sync Database</h1>
          <p className="text-slate-500 mt-1 text-sm">Orchestrate database actions and edge functions.</p>
        </div>
      </div>

      {/* Notification Toast Area */}
      <div className="min-h-[60px] mb-6">
        {status.type && (
          <div className={`flex items-center justify-between p-4 rounded-xl border animate-in fade-in slide-in-from-top-2 duration-300 ${status.type === "success"
            ? "bg-emerald-50 border-emerald-200 text-emerald-800"
            : "bg-rose-50 border-rose-200 text-rose-800"
            }`}>
            <div className="flex items-center gap-3">
              {status.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <span className="text-sm font-medium">{status.text}</span>
            </div>
            <button onClick={() => setStatus({ text: "", type: null })}>
              <X className="w-4 h-4 opacity-50 hover:opacity-100" />
            </button>
          </div>
        )}
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {panels.map((panel) => {
          const isActive = loading === panel.title;
          return (
            <div
              key={panel.id}
              className={`flex flex-col justify-between p-6 bg-white border border-slate-200 rounded-2xl shadow-sm transition-all duration-300 ${isActive ? "ring-2 ring-blue-500 ring-offset-2 animate-pulse" : "hover:shadow-md"
                }`}
            >
              <div>
                <div className="mb-4 p-3 w-fit rounded-xl bg-slate-50">
                  {panel.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800">{panel.title}</h3>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed uppercase tracking-wider font-semibold">
                  {panel.desc}
                </p>
              </div>

              <button
                disabled={loading !== null}
                onClick={() => handleAction(panel.title, panel.slug)}
                className={`cursor-pointer mt-8 w-full py-2.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${panel.color}`}
              >
                {isActive ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Execute {panel.title}</span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}