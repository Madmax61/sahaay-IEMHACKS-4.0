import { LayoutDashboard, Search, FileCheck2, MessageSquareWarning, BarChart3, ShieldCheck } from 'lucide-react';

const items = [
  ['dashboard', 'Dashboard', LayoutDashboard],
  ['schemes', 'Find Schemes', Search],
  ['applications', 'My Applications', FileCheck2],
  ['grievances', 'Grievances', MessageSquareWarning],
  ['analytics', 'Analytics', BarChart3],
];

export default function Sidebar({ active, onChange }) {
  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[245px] border-r border-slate-200 bg-white px-4 py-5 lg:block">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-leaf font-black text-white">
          <ShieldCheck size={20} />
        </div>
        <div>
          <div className="font-bold">Sahaay</div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-muted">Public welfare access</div>
        </div>
      </div>
      <nav className="space-y-1">
        {items.map(([id, label, Icon]) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold ${active === id ? 'bg-lime text-leafDark' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <span><Icon size={18} /></span>
            <label>{label}</label>
          </button>
        ))}
      </nav>
      <div className="absolute bottom-5 left-4 right-4 rounded-2xl bg-ink p-4 text-white">
        <div className="text-sm font-semibold">Privacy first</div>
        <p className="mt-1 text-xs leading-5 text-slate-300">Public complaints do not expose the reporter's identity.</p>
      </div>
    </aside>
  );
}

export function MobileNav({ active, onChange }) {
  return (
    <div className="sticky top-0 z-20 flex gap-1 overflow-x-auto border-b border-slate-200 bg-white p-2 lg:hidden">
      {items.map(([id, label, Icon]) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold ${active === id ? 'bg-lime text-leafDark' : 'text-slate-600'}`}
        >
          <Icon size={16} />
          <label>{label}</label>
        </button>
      ))}
    </div>
  );
}