export default function StatCard({ label, value, note, icon: Icon, iconClass }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
        </div>
        <div className={`rounded-xl p-3 ${iconClass}`}><Icon size={20} /></div>
      </div>
      <p className="mt-4 text-xs text-slate-500">{note}</p>
    </div>
  );
}
