import {
  ArrowRight,
  ArrowUpRight,
  Users,
  UserPlus,
  BadgeCheck,
  UserRoundX,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import { getDashboard } from "../services/dashboard.service";

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      total: 0,
      New: 0,
      Contacted: 0,
      Qualified: 0,
      Lost: 0,
    },
    recentLeads: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboard();
        setDashboardData(data);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const { stats, recentLeads } = dashboardData;

  const statCards = [
    {
      label: "Total leads",
      value: stats.total,
      note: "All contacts in your workspace",
      icon: Users,
      iconClass: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "New leads",
      value: stats.New,
      note: "Waiting for first contact",
      icon: UserPlus,
      iconClass: "bg-sky-50 text-sky-600",
    },
    {
      label: "Qualified leads",
      value: stats.Qualified,
      note: "Potential customers",
      icon: BadgeCheck,
      iconClass: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Lost leads",
      value: stats.Lost,
      note: "Not moving forward",
      icon: UserRoundX,
      iconClass: "bg-rose-50 text-rose-600",
    },
  ];

  const pipeline = [
    { status: "New", color: "bg-sky-500", total: stats.New },
    { status: "Contacted", color: "bg-violet-500", total: stats.Contacted },
    { status: "Qualified", color: "bg-emerald-500", total: stats.Qualified },
    { status: "Lost", color: "bg-rose-500", total: stats.Lost },
  ];

  if (loading) {
    return (
      <div className="py-20 text-center text-sm text-slate-500">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-indigo-600">Overview</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Here's what's happening with your leads.
          </p>
        </div>

        <Link
          to="/leads"
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 sm:self-auto"
        >
          View all leads <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_1.6fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">Lead pipeline</h2>
              <p className="mt-1 text-xs text-slate-500">
                Distribution by current status
              </p>
            </div>

            <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
              <ArrowUpRight size={18} />
            </div>
          </div>

          <div className="mt-7 space-y-5">
            {pipeline.map((item) => {
              const percent = stats.total
                ? Math.round((item.total / stats.total) * 100)
                : 0;

              return (
                <div key={item.status}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">
                      {item.status}
                    </span>

                    <span className="text-xs font-semibold text-slate-500">
                      {item.total}
                      <span className="ml-1 font-normal text-slate-400">
                        ({percent}%)
                      </span>
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-7 rounded-xl bg-slate-50 px-4 py-3">
            <p className="text-xs leading-5 text-slate-500">
              Keep your pipeline updated as you make progress with each contact.
            </p>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/40">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
            <div>
              <h2 className="font-semibold text-slate-900">Recent leads</h2>
              <p className="mt-1 text-xs text-slate-500">
                The latest contacts added to your CRM
              </p>
            </div>

            <Link
              to="/leads"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
            >
              View all
            </Link>
          </div>

          {recentLeads.length ? (
            <div className="divide-y divide-slate-100">
              {recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between gap-3 px-5 py-4 sm:px-6"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xs font-bold text-indigo-700">
                      {lead.name
                        .split(" ")
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {lead.name}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {lead.company}
                      </p>
                    </div>
                  </div>

                  <StatusBadge status={lead.status} />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center text-sm text-slate-500">
              No leads yet. Add your first lead to get started.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
