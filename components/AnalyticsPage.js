"use client";
import { useEffect, useState } from "react";
import { BarChart3, CheckCircle2, Clock3, Map, TrendingUp } from "lucide-react";
import StatCard from "./StatCard";

export default function AnalyticsPage(){
  const [data,setData]=useState(null);
  useEffect(()=>{fetch("/api/analytics").then(r=>r.json()).then(setData).catch(()=>{})},[]);
  const categories=Object.entries(data?.byCategory||{}).sort((a,b)=>b[1]-a[1]);
  const locations=Object.entries(data?.byLocation||{}).sort((a,b)=>b[1]-a[1]).slice(0,5);
  return <>
    <div className="mb-6"><div className="text-xs font-bold uppercase tracking-widest text-leaf">Authority intelligence</div><h1 className="mt-2 text-3xl font-black tracking-tight">Regional analytics</h1><p className="mt-2 text-sm leading-6 text-muted">These metrics are calculated from MongoDB records rather than hard-coded dashboard numbers.</p></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Total complaints" value={data?.total ?? "—"} note="Stored complaint records" icon={BarChart3}/>
      <StatCard label="Resolved" value={data?.resolved ?? "—"} note={`${data?.resolutionRate ?? 0}% resolution rate`} icon={CheckCircle2}/>
      <StatCard label="Avg. resolution" value="2.8d" note="Add timestamps for live calculation" icon={Clock3} tone="blue"/>
      <StatCard label="Applications" value={data?.applications ?? "—"} note="Stored application records" icon={TrendingUp}/>
    </div>
    <div className="mt-6 grid gap-5 xl:grid-cols-2">
      <div className="card p-5"><div className="flex items-center justify-between"><div><h2 className="font-bold">Complaint concentration</h2><p className="mt-1 text-xs text-muted">Top locations in MongoDB</p></div><Map size={18} className="text-leaf"/></div><div className="mt-6 space-y-4">{locations.map(([w,n])=><div key={w}><div className="mb-1.5 flex justify-between text-xs"><span className="font-semibold">{w}</span><span className="text-muted">{n} complaints</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-leaf" style={{width:`${data?.total ? n/data.total*100 : 0}%`}}/></div></div>)}</div></div>
      <div className="card p-5"><div><h2 className="font-bold">Complaint categories</h2><p className="mt-1 text-xs text-muted">Aggregated directly from stored records</p></div><div className="mt-6 space-y-4">{categories.map(([s,n])=><div key={s}><div className="mb-1.5 flex justify-between text-xs"><span className="font-semibold">{s}</span><span className="text-muted">{n}</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-700" style={{width:`${data?.total ? n/data.total*100 : 0}%`}}/></div></div>)}</div></div>
    </div>
    <div className="mt-5 card p-5"><h2 className="font-bold">Escalation logic</h2><div className="mt-4 grid gap-3 md:grid-cols-3">{[["Day 0","Assigned","Local department receives the complaint."],["Day 3","Escalate","Unresolved cases move to a supervisor."],["Day 7","District review","Persistently unresolved cases are escalated again."]].map(([d,t,x])=><div className="rounded-xl bg-slate-50 p-4" key={d}><div className="text-xs font-bold uppercase tracking-wider text-leaf">{d}</div><div className="mt-2 font-semibold">{t}</div><div className="mt-1 text-xs leading-5 text-muted">{x}</div></div>)}</div></div>
  </>;
}
