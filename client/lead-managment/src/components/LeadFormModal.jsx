import { useEffect, useState } from "react";
import { X } from "lucide-react";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  source: "Website",
  status: "New",
};
const sources = [
  "Website",
  "Referral",
  "LinkedIn",
  "Cold Call",
  "Event",
  "Other",
];

const statuses = ["New", "Contacted", "Qualified", "Lost"];

export default function LeadFormModal({ open, lead, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setForm(lead ? { ...emptyForm, ...lead } : emptyForm);
      setErrors({});
    }
  }, [open, lead]);

  if (!open) return null;

  function change(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  function submit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!form.email.trim()) nextErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      nextErrors.email = "Enter a valid email address";
    if (!form.phone.trim()) nextErrors.phone = "Phone is required";
    else if (
      form.phone.replace(/\D/g, "").length < 7 ||
      form.phone.replace(/\D/g, "").length > 15
    )
      nextErrors.phone = "Enter a valid phone number";
    if (!form.company.trim()) nextErrors.company = "Company is required";
    if (!form.source) nextErrors.source = "Select a source";

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    onSave({
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      company: form.company.trim(),
    });
    onClose();
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="my-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl shadow-slate-900/15">
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {lead ? "Edit lead" : "Add a new lead"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Add the contact details below.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={submit} className="px-6 py-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">
              Full name
              <input
                name="name"
                value={form.name}
                onChange={change}
                placeholder="e.g. Alex Morgan"
                className={inputClass}
              />
              {errors.name && (
                <span className="mt-1 block text-xs text-rose-600">
                  {errors.name}
                </span>
              )}
            </label>
            <label className="text-sm font-medium text-slate-700">
              Email address
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={change}
                placeholder="alex@company.com"
                className={inputClass}
              />
              {errors.email && (
                <span className="mt-1 block text-xs text-rose-600">
                  {errors.email}
                </span>
              )}
            </label>
            <label className="text-sm font-medium text-slate-700">
              Phone number
              <input
                name="phone"
                value={form.phone}
                onChange={change}
                placeholder="+1 555 000 0000"
                className={inputClass}
              />
              {errors.phone && (
                <span className="mt-1 block text-xs text-rose-600">
                  {errors.phone}
                </span>
              )}
            </label>
            <label className="text-sm font-medium text-slate-700">
              Company
              <input
                name="company"
                value={form.company}
                onChange={change}
                placeholder="Company name"
                className={inputClass}
              />
              {errors.company && (
                <span className="mt-1 block text-xs text-rose-600">
                  {errors.company}
                </span>
              )}
            </label>
            <label className="text-sm font-medium text-slate-700">
              Lead source
              <select
                name="source"
                value={form.source}
                onChange={change}
                className={inputClass}
              >
                {sources.map((source) => (
                  <option key={source}>{source}</option>
                ))}
              </select>
              
            </label>
            <label className="text-sm font-medium text-slate-700">
              Status
              <select
                name="status"
                value={form.status}
                onChange={change}
                className={inputClass}
              >
                {statuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
            >
              {lead ? "Save changes" : "Create lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
