"use client";
import { useEffect, useState } from "react";
import { ExternalLink, FileCheck2, Clock3, ArrowRight } from "lucide-react";

const demoApps = [
  { scheme:"Student Education Support", status:"Ready to apply", progress:75, url:"https://www.wb.gov.in/" },
  { scheme:"General Housing Assistance", status:"Documents pending", progress:50, url:"https://www.wb.gov.in/" }
];

export default function ApplicationsPage() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/applications").then(r=>r.json()).then(async d => {
      if ((d.applications || []).length) setApps(d.applications);
      else {
        const created=[];
        for (const a of demoApps) {
          const r=await fetch("/api/applications",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({scheme:a.scheme,status:a.status,progress:a.progress,officialUrl:a.url})});
          const x=await r.json(); if(x.application) created.push(x.application);
        }
        setApps(created);
      }
    }).catch(()=>{}).finally(()=>setLoading(false));
  }, []);
  return <>
    <div className="mb-6"><div className="text-xs font-bold uppercase tracking-widest text-leaf">Application workspace</div><h1 className="mt-2 text-3xl font-black tracking-tight">My applications</h1><p className="mt-2 text-sm text-muted">Prepare applications here, then continue to the relevant official portal for submission.</p></div>
    {loading ? <div className="card p-6 text-sm text-muted">Loading applications from MongoDB...</div> : <div className="space-y-4">{apps.map(a=><div className="card p-5" key={a.applicationId || a.applicationId}><div className="flex flex-col justify-between gap-5 md:flex-row md:items-center"><div className="flex gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-lime text-leaf"><FileCheck2 size={20}/></div><div><div className="text-xs font-semibold text-muted">{a.applicationId}</div><h2 className="mt-1 font-bold">{a.scheme}</h2><div className="mt-1 flex items-center gap-2 text-xs text-muted"><Clock3 size={13}/>{a.status}</div></div></div><div className="w-full md:w-64"><div className="flex justify-between text-xs font-semibold"><span>Readiness</span><span>{a.progress}%</span></div><div className="mt-2 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-leaf" style={{width:`${a.progress}%`}}/></div></div><a href={a.officialUrl || "https://www.wb.gov.in/"} target="_blank" rel="noreferrer" className="btn-secondary">Official portal <ExternalLink size={14}/></a></div></div>)}</div>}
    <div className="mt-6 card border-dashed p-6 text-center"><ArrowRight className="mx-auto text-leaf"/><h3 className="mt-3 font-bold">After external submission</h3><p className="mx-auto mt-1 max-w-lg text-sm text-muted">Production can integrate official status APIs where available, or let users store an application reference number.</p></div>
  </>;
}
