"use client";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, ExternalLink, FileText, Info, ShieldCheck, XCircle } from "lucide-react";

export default function SchemeDetails({ item, onBack }) {
  const { scheme, reasons, failures, score, passed } = item;
  const [saved, setSaved] = useState(false);
  async function saveApplication() {
    const res = await fetch("/api/applications", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ schemeId:scheme.id, scheme:scheme.name, status:passed ? "Ready to apply" : "Needs review", progress:score, officialUrl:scheme.applicationUrl, missingDocuments:[] }) });
    if (res.ok) setSaved(true);
  }
  return <>
    <button className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-muted" onClick={onBack}><ArrowLeft size={16}/> Back to schemes</button>
    <div className="grid gap-5 xl:grid-cols-[1.45fr_.8fr]">
      <div className="card p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div><div className="mb-2 inline-flex rounded-full bg-sage px-2.5 py-1 text-[11px] font-bold text-leafDark">{scheme.category}</div><h1 className="text-3xl font-black tracking-tight">{scheme.name}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{scheme.short}</p></div>
          <div className="rounded-2xl bg-lime px-4 py-3 text-center"><div className="text-2xl font-black">{score}%</div><div className="text-[10px] font-bold uppercase tracking-wider">match</div></div>
        </div>
        <div className="mt-7 grid gap-3 md:grid-cols-2"><div className="rounded-xl bg-slate-50 p-4"><div className="text-xs font-bold uppercase tracking-wider text-muted">Benefit</div><div className="mt-1 font-semibold">{scheme.benefit}</div></div><div className="rounded-xl bg-slate-50 p-4"><div className="text-xs font-bold uppercase tracking-wider text-muted">Authority</div><div className="mt-1 font-semibold">{scheme.authority}</div></div></div>
        <div className="mt-7"><h2 className="font-bold">Why the engine gave this result</h2><div className="mt-3 space-y-2">{reasons.map((r,i)=><div key={i} className="flex gap-2 rounded-lg bg-lime/60 px-3 py-2.5 text-sm"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-leaf"/>{r}</div>)}{failures.map((r,i)=><div key={i} className="flex gap-2 rounded-lg bg-redSoft px-3 py-2.5 text-sm text-red-800"><XCircle size={16} className="mt-0.5 shrink-0"/>{r}</div>)}</div></div>
        <div className="mt-7 rounded-2xl border border-amber-200 bg-amberSoft p-4"><div className="flex gap-3"><Info size={18} className="mt-0.5 shrink-0 text-amber-700"/><div><div className="font-semibold text-amber-900">Verify before applying</div><p className="mt-1 text-xs leading-5 text-amber-800">This prototype uses demo scheme records. Production data must be sourced from official sources and kept fresh.</p></div></div></div>
      </div>
      <div className="space-y-5">
        <div className="card p-5"><div className="flex items-center gap-2"><FileText size={18} className="text-leaf"/><h2 className="font-bold">Application readiness</h2></div><div className="mt-4 space-y-2">{scheme.documents.map((d,i)=><div key={d} className="flex justify-between rounded-lg border border-slate-100 px-3 py-2.5 text-sm"><span>{d}</span><span className={i<Math.ceil(scheme.documents.length*.75)?"font-semibold text-leaf":"text-muted"}>{i<Math.ceil(scheme.documents.length*.75)?"Present":"Check"}</span></div>)}</div></div>
        <div className="card p-5"><div className="flex items-center gap-2"><ShieldCheck size={18} className="text-leaf"/><h2 className="font-bold">Next step</h2></div><p className="mt-2 text-sm leading-6 text-muted">Sahaay prepares and explains the process. The actual submission happens on the official government portal.</p><button className="btn-secondary mt-4 w-full" onClick={saveApplication}>{saved ? "Saved to My Applications" : "Save application checklist"}</button><a href={scheme.applicationUrl} target="_blank" rel="noreferrer" className="btn-primary mt-3 w-full">Open official portal <ExternalLink size={15}/></a></div>
      </div>
    </div>
  </>;
}
