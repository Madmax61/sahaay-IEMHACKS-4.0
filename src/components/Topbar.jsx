
import { Bell, Globe2, Menu, Search, FileText } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { schemes } from '../lib/data';

export default function Topbar({ onMenu, globalQuery, setGlobalQuery, onSelectScheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchResults = globalQuery
    ? schemes.filter(s => s.name.toLowerCase().includes(globalQuery.toLowerCase()) || s.short.toLowerCase().includes(globalQuery.toLowerCase())).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur lg:pl-7 lg:pr-8">
      <button className="lg:hidden" onClick={onMenu}>
        <Menu />
      </button>
      <div className="hidden items-center gap-2 text-sm text-muted sm:flex w-full max-w-md" ref={searchRef}>
        <div className="relative w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input 
            type="text" 
            placeholder="Search schemes, complaints, documents..." 
            className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm focus:border-leaf focus:outline-none focus:ring-1 focus:ring-leaf transition-colors"
            value={globalQuery}
            onChange={(e) => {
              setGlobalQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
          />
          
          {isOpen && globalQuery && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-slate-200 bg-white shadow-soft overflow-hidden z-50">
              {searchResults.length > 0 ? (
                <div className="flex flex-col">
                  {searchResults.map(scheme => (
                    <button
                      key={scheme.id}
                      className="flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                      onClick={() => {
                        onSelectScheme(scheme);
                        setIsOpen(false);
                      }}
                    >
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-sage/50 text-leaf">
                        <FileText size={16} />
                      </div>
                      <div className="overflow-hidden">
                        <div className="truncate text-sm font-semibold text-ink">{scheme.name}</div>
                        <div className="truncate text-xs text-muted">{scheme.short}</div>
                      </div>
                    </button>
                  ))}
                  <button 
                    className="px-4 py-2.5 text-center text-xs font-semibold text-leaf hover:bg-sage/30 transition-colors"
                    onClick={() => {
                      setIsOpen(false);
                      // Let it remain on schemes page showing all results
                      document.querySelector('input[placeholder="Search schemes, complaints, documents..."]')?.blur();
                    }}
                  >
                    View all results
                  </button>
                </div>
              ) : (
                <div className="px-4 py-6 text-center text-sm text-muted">
                  No schemes found matching "{globalQuery}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <button className="btn-secondary px-3 py-2">
          <Globe2 size={16} />
          <span className="ml-1 hidden sm:inline">EN</span>
        </button>
        <button className="rounded-xl border border-slate-200 p-2.5 text-slate-600">
          <Bell size={17} />
        </button>
        <div className="ml-2 grid h-9 w-9 place-items-center rounded-full bg-sage text-sm font-bold text-leafDark">
          S
        </div>
      </div>
    </header>
  );
}
