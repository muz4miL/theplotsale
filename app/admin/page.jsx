import { Activity, Image, LayoutDashboard, ShieldCheck, Sparkles } from 'lucide-react';
import AddProgressForm from '@/components/admin/AddProgressForm';

const statCards = [
  {
    label: 'Total Properties',
    value: '148',
    trend: '+12 this month',
    icon: LayoutDashboard,
  },
  {
    label: 'Active Projects',
    value: '7',
    trend: '4 current / 3 upcoming',
    icon: ShieldCheck,
  },
  {
    label: 'Media Uploaded',
    value: '1,264',
    trend: 'High-resolution assets',
    icon: Image,
  },
  {
    label: 'Weekly Throughput',
    value: '22',
    trend: 'Avg updates per week',
    icon: Activity,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-6 backdrop-blur-md md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#C5A880]">Admin Console</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Dashboard Overview</h1>
            <p className="mt-2 text-sm text-neutral-400">
              Monitor portfolio growth, project activity, and media pipeline from one premium workspace.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-xl border border-[#C5A880]/40 bg-[#C5A880]/10 px-4 py-2 text-sm font-medium text-[#C5A880]">
            <Sparkles className="h-4 w-4" />
            Executive Mode
          </span>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.label}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-black/25 p-5 backdrop-blur-md"
            >
              <div className="mb-4 inline-flex rounded-lg border border-[#C5A880]/40 bg-[#C5A880]/10 p-2 text-[#C5A880]">
                <Icon className="h-4 w-4" />
              </div>
              <p className="text-sm text-neutral-400">{card.label}</p>
              <p className="mt-2 text-3xl font-semibold text-white">{card.value}</p>
              <p className="mt-1 text-xs text-[#C5A880]">{card.trend}</p>
            </article>
          );
        })}
      </section>

      <AddProgressForm />
    </div>
  );
}
