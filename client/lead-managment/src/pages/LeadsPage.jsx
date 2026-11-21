import { useMemo, useState } from "react";
import { Plus, Search, SlidersHorizontal, Users } from "lucide-react";
import { useLeads } from "../context/LeadContext";
import LeadFormModal from "../components/LeadFormModal";
import ConfirmDialog from "../components/ConfirmDialog";
import LeadsTable from "../components/LeadsTable";

const statuses = ["All statuses", "New", "Contacted", "Qualified", "Lost"];

export default function LeadsPage() {
  const { leads, addLead, updateLead, deleteLead } = useLeads();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [formOpen, setFormOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filteredLeads = useMemo(() => leads.filter((lead) => {
    const matchesSearch = lead.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "All statuses" || lead.status === status;
    return matchesSearch && matchesStatus;
  }), [leads, search, status]);

  function openCreate() {
    setSelectedLead(null);
    setFormOpen(true);
  }

  function openEdit(lead) {
    setSelectedLead(lead);
    setFormOpen(true);
  }

  function saveLead(data) {
    if (selectedLead) updateLead(selectedLead.id, data);
    else addLead(data);
  }

  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-medium text-indigo-600">Workspace</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Leads</h1><p className="mt-2 text-sm text-slate-500">Manage your contacts and keep every opportunity moving.</p></div><button onClick={openCreate} className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 sm:self-auto"><Plus size={17} /> Add new lead</button></div>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <div className="relative"><Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search leads by name..." className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50" /></div>
        <div className="relative"><SlidersHorizontal size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" /><select value={status} onChange={(event) => setStatus(event.target.value)} className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-9 text-sm font-medium text-slate-600 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 sm:min-w-44">{statuses.map((item) => <option key={item}>{item}</option>)}</select><span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400">⌄</span></div>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/40">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6"><div className="flex items-center gap-2.5"><div className="rounded-lg bg-indigo-50 p-2 text-indigo-600"><Users size={17} /></div><div><h2 className="text-sm font-semibold text-slate-800">All leads</h2><p className="mt-0.5 text-xs text-slate-500">Your complete contact list</p></div></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{filteredLeads.length} {filteredLeads.length === 1 ? "lead" : "leads"}</span></div>
        <LeadsTable leads={filteredLeads} onEdit={openEdit} onDelete={setDeleteTarget} />
      </section>

      <LeadFormModal open={formOpen} lead={selectedLead} onClose={() => setFormOpen(false)} onSave={saveLead} />
      <ConfirmDialog lead={deleteTarget} onCancel={() => setDeleteTarget(null)} onConfirm={() => { deleteLead(deleteTarget.id); setDeleteTarget(null); }} />
    </div>
  );
}
