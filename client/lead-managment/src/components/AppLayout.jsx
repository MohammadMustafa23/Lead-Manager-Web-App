import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Menu,
  Bell,
  Search,
  CircleHelp,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/leads", label: "Leads", icon: Users },
];

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-900">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-[76px] items-center gap-3 border-b border-slate-100 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-lg shadow-indigo-200">
            M
          </div>
          <div>
            <p className="font-semibold tracking-tight">Mini CRM</p>
            <p className="text-xs text-slate-500">Lead management</p>
          </div>
        </div>
        <div className="px-4 pt-8">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Workspace
          </p>
          <nav className="space-y-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`
                }
              >
                <Icon size={18} strokeWidth={1.9} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <div className="mt-4 flex items-center gap-3 border-t border-slate-100 px-2 pt-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
              AD
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">Admin</p>
              <p className="truncate text-xs text-slate-500">
                admin@minicrm.com
              </p>
            </div>
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <button
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden"
        />
      )}

      <div className="min-h-screen lg:pl-64">
        <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl sm:px-7 lg:px-9">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={20} />
            </button>
            <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-400 sm:flex">
              <Search size={15} />
              <span>Manage your workspace</span>
            </div>
            <p className="text-sm font-semibold sm:hidden">Mini CRM</p>
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                A
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold">Admin</p>
                <p className="text-xs text-slate-500">Administrator</p>
              </div>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-[1500px] p-4 sm:p-7 lg:p-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
