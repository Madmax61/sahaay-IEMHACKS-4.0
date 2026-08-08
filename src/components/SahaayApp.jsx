import { useState } from 'react';
import Sidebar, { MobileNav } from './Sidebar';
import Topbar from './Topbar';
import Dashboard from './Dashboard';
import SchemesPage from './SchemesPage';
import SchemeDetails from './SchemeDetails';
import ApplicationsPage from './ApplicationsPage';
import GrievancesPage from './GrievancesPage';
import AnalyticsPage from './AnalyticsPage';

export default function SahaayApp() {
  const [a, setA] = useState('dashboard'), [sel, setSel] = useState(null);
  const [q, setQ] = useState('');

  function nav(id) {
    setSel(null);
    setA(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleSelectScheme(scheme) {
    setSel({
      scheme: scheme,
      reasons: ["Please evaluate your profile in the Schemes tab to see why you qualify."],
      failures: [],
      score: 0,
      passed: false
    });
    setA('schemes');
    setQ('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleSearch(val) {
    setQ(val);
  }

  let c = a === 'dashboard' ? <Dashboard go={nav}/> :
    a === 'schemes' ? (sel ? <SchemeDetails item={sel} onBack={() => setSel(null)}/> : <SchemesPage onOpen={setSel} q={q} setQ={setQ}/>) :
    a === 'applications' ? <ApplicationsPage/> :
    a === 'grievances' ? <GrievancesPage/> :
    <AnalyticsPage/>;

  return (
    <div className="min-h-screen bg-paper">
      <Sidebar active={a} onChange={nav}/>
      <div className="lg:pl-[245px]">
        <Topbar onMenu={() => {}} globalQuery={q} setGlobalQuery={handleSearch} onSelectScheme={handleSelectScheme} />
        <MobileNav active={a} onChange={nav}/>
        <main className="mx-auto max-w-[1450px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{c}</main>
        <footer className="mx-auto max-w-[1450px] px-6 pb-8 text-xs text-muted lg:px-8">Sahaay prototype • Demo scheme data • Verify official sources before real-world use.</footer>
      </div>
    </div>
  );
}
