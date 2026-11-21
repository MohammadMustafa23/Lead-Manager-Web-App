import { useState } from "react";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Mail,
  Phone,
  Building2,
} from "lucide-react";

import StatusBadge from "./StatusBadge";

function initials(name) {
  const words = (name || "").trim().split(/\s+/).filter(Boolean);

  return (
    words
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "?"
  );
}

function dateLabel(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function LeadsTable({ leads = [], onEdit, onDelete }) {
  const [activeMenu, setActiveMenu] = useState(null);

  if (!leads.length) {
    return (
      <div className="px-6 py-16 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
          <Building2 size={22} />
        </div>

        <h3 className="mt-4 font-semibold text-slate-800">No leads found</h3>

        <p className="mt-1 text-sm text-slate-500">
          Try changing your search or filter.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[940px] text-left">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <th className="px-6 py-4">Lead</th>
            <th className="px-4 py-4">Contact</th>
            <th className="px-4 py-4">Company</th>
            <th className="px-4 py-4">Source</th>
            <th className="px-4 py-4">Status</th>
            <th className="px-4 py-4">Created</th>
            <th className="px-5 py-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {leads.map((lead) => (
            <tr key={lead.id} className="group transition hover:bg-slate-50/70">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xs font-bold text-indigo-700">
                    {initials(lead.name)}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {lead.name || "Unnamed lead"}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Lead #{String(lead.id ?? "").slice(-5)}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-4 py-4">
                <div className="space-y-1.5">
                  <p className="flex items-center gap-2 text-xs text-slate-600">
                    <Mail size={13} className="shrink-0 text-slate-400" />
                    {lead.email || "—"}
                  </p>

                  <p className="flex items-center gap-2 text-xs text-slate-500">
                    <Phone size={13} className="shrink-0 text-slate-400" />
                    {lead.phone || "—"}
                  </p>
                </div>
              </td>

              <td className="px-4 py-4 text-sm text-slate-600">
                {lead.company || "—"}
              </td>

              <td className="px-4 py-4 text-sm text-slate-600">
                {lead.source || "—"}
              </td>

              <td className="px-4 py-4">
                <StatusBadge status={lead.status} />
              </td>

              <td className="px-4 py-4 text-xs text-slate-500">
                {dateLabel(lead.createdAt)}
              </td>

              <td className="relative px-5 py-4 text-right">
                <button
                  type="button"
                  aria-label={`Actions for ${lead.name || "lead"}`}
                  aria-expanded={activeMenu === lead.id}
                  onClick={() =>
                    setActiveMenu(activeMenu === lead.id ? null : lead.id)
                  }
                  className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-slate-700 hover:shadow-sm"
                >
                  <MoreHorizontal size={18} />
                </button>

                {activeMenu === lead.id && (
                  <>
                    <button
                      type="button"
                      aria-label="Close actions"
                      className="fixed inset-0 z-10 cursor-default"
                      onClick={() => setActiveMenu(null)}
                    />

                    <div className="absolute right-8 top-12 z-20 w-36 rounded-xl border border-slate-100 bg-white p-1.5 text-left shadow-xl shadow-slate-900/10">
                      <button
                        type="button"
                        onClick={() => {
                          onEdit(lead);
                          setActiveMenu(null);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
                      >
                        <Pencil size={14} />
                        Edit lead
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onDelete(lead);
                          setActiveMenu(null);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 size={14} />
                        Delete lead
                      </button>
                    </div>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
