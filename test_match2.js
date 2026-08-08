import { matchSchemes } from './src/lib/eligibility.js';
import { schemes } from './src/lib/data.js';

const p = {
  age: 65,
  state: 'West Bengal',
  income: 10000,
  occupation: 'Unemployed',
  category: 'General',
  gender: 'Female',
  disability: 'Yes'
};

const matches = matchSchemes(p, schemes).filter(x => x.scheme.name.includes('IGNOAPS'));
console.log(matches[0].failures);
