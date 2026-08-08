const fs = require('fs');

let data = fs.readFileSync('src/lib/data.js', 'utf8');

data = data.replace(/authority:'State Education Department'/g, "authority:'Ministry of Education, Govt of India', state:'All India'");
data = data.replace(/authority:'State Livelihood Mission'/g, "authority:'Ministry of MSME, Govt of India', state:'All India'");
data = data.replace(/authority:'Social Welfare Department'/g, "authority:'Ministry of Social Justice & Empowerment, Govt of India', state:'All India'");
data = data.replace(/authority:'Labour Department'/g, "authority:'Ministry of Labour & Employment, Govt of India', state:'All India'");
data = data.replace(/authority:'Housing & Urban Development'/g, "authority:'Ministry of Housing & Urban Affairs, Govt of India', state:'All India'");

// Also change occupations for RVY from ['Retired','Other'] to ['Any']
data = data.replace(/{id:'sch-004',name:'Rashtriya Vayoshri Yojana \(RVY\)',short:'A guided route to social support for older residents.',category:'Social Security',state:'West Bengal',authority:'Social Welfare Department',benefit:'Social-security assistance',age:{min:60,max:120},incomeMax:400000,occupations:\['Retired','Other'\],/, 
"{id:'sch-004',name:'Rashtriya Vayoshri Yojana (RVY)',short:'A guided route to social support for older residents.',category:'Social Security',state:'All India',authority:'Ministry of Social Justice & Empowerment, Govt of India',benefit:'Social-security assistance',age:{min:60,max:120},incomeMax:400000,occupations:['Any'],");

fs.writeFileSync('src/lib/data.js', data);
