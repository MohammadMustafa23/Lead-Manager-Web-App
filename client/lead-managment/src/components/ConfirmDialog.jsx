import { AlertTriangle, X } from "lucide-react";

export default function ConfirmDialog({ lead, onCancel, onConfirm }) {
  if (!lead) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-[2px]">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl shadow-slate-900/15">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600"><AlertTriangle size={21} /></div>
          <button onClick={onCancel} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X size={18} /></button>
        </div>
        <h2 className="mt-4 text-lg font-semibold text-slate-900">Delete this lead?</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">You're about to delete <span className="font-semibold text-slate-700">{lead.name}</span>. This action cannot be undone.</p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Keep lead</button>
          <button onClick={onConfirm} className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700">Delete lead</button>
        </div>
      </div>
    </div>
  );
}
