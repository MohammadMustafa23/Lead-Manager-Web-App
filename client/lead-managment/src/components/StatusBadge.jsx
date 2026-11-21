const styles = {
  New: "bg-blue-50 text-blue-700 ring-blue-600/15",
  Contacted: "bg-violet-50 text-violet-700 ring-violet-600/15",
  Qualified: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  Lost: "bg-rose-50 text-rose-700 ring-rose-600/15",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status] || styles.New}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
