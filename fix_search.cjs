const fs = require('fs');

// 1. Update Topbar.jsx
let topbar = fs.readFileSync('src/components/Topbar.jsx', 'utf8');
topbar = topbar.replace(
  /export default function Topbar\(\{onMenu\}\)\{return/,
  'export default function Topbar({onMenu, globalQuery, setGlobalQuery}){return'
);
topbar = topbar.replace(
  /<div className="hidden items-center gap-2 text-sm text-muted sm:flex"><Search size={16}\/>Search schemes, complaints, documents...<\/div>/,
  '<div className="hidden items-center gap-2 text-sm text-muted sm:flex"><div className="relative"><Search className="absolute left-3 top-2.5 text-slate-400" size={16}/><input className="w-64 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 pl-9 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-lime focus:border-leaf transition-all" placeholder="Search schemes..." value={globalQuery} onChange={(e) => setGlobalQuery(e.target.value)} /></div></div>'
);
fs.writeFileSync('src/components/Topbar.jsx', topbar);

// 2. Update SahaayApp.jsx
let app = fs.readFileSync('src/components/SahaayApp.jsx', 'utf8');
app = app.replace(
  "const [a, setA] = useState('dashboard'), [sel, setSel] = useState(null);",
  "const [a, setA] = useState('dashboard'), [sel, setSel] = useState(null); const [q, setQ] = useState('');"
);
app = app.replace(
  "function nav(id) {",
  "function handleSearch(val) { setQ(val); if (val && a !== 'schemes') { nav('schemes'); } }\n  function nav(id) {"
);
app = app.replace(
  "<SchemesPage onOpen={setSel}/>",
  "<SchemesPage onOpen={setSel} q={q} setQ={setQ}/>"
);
app = app.replace(
  "<Topbar/>",
  "<Topbar onMenu={() => {}} globalQuery={q} setGlobalQuery={handleSearch} />"
);
fs.writeFileSync('src/components/SahaayApp.jsx', app);

// 3. Update SchemesPage.jsx
let schemesPage = fs.readFileSync('src/components/SchemesPage.jsx', 'utf8');
schemesPage = schemesPage.replace(
  "export default function SchemesPage({onOpen}){const[p,setP]=useState(profileDefaults),[matches,setMatches]=useState([]),[loading,setLoading]=useState(false),[q,setQ]=useState(''),[only,setOnly]=useState(true);",
  "export default function SchemesPage({onOpen, q = '', setQ = () => {}}){const[p,setP]=useState(profileDefaults),[matches,setMatches]=useState([]),[loading,setLoading]=useState(false),[only,setOnly]=useState(true);"
);
fs.writeFileSync('src/components/SchemesPage.jsx', schemesPage);

console.log("Search fixed");
