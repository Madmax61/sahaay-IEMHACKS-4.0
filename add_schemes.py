import re

with open('src/lib/data.js', 'r') as f:
    data = f.read()

new_schemes = """
,{id:'sch-wb10',name:'Taposili Bandhu',short:'Old age pension for SC citizens of West Bengal.',category:'Social Security',state:'West Bengal',authority:'Department of Backward Classes Welfare, WB',benefit:'Monthly pension of Rs. 1000',age:{min:60,max:120},incomeMax:200000,occupations:['Any'],categories:['SC'],gender:['Any'],disability:'Any',documents:['Aadhaar','Age Proof','Caste Certificate','Bank Account Proof'],applicationUrl:'https://wb.gov.in/'}
,{id:'sch-wb11',name:'Jai Johar',short:'Old age pension for ST citizens of West Bengal.',category:'Social Security',state:'West Bengal',authority:'Department of Backward Classes Welfare, WB',benefit:'Monthly pension of Rs. 1000',age:{min:60,max:120},incomeMax:200000,occupations:['Any'],categories:['ST'],gender:['Any'],disability:'Any',documents:['Aadhaar','Age Proof','Caste Certificate','Bank Account Proof'],applicationUrl:'https://wb.gov.in/'}
,{id:'sch-wb12',name:'IGNOAPS (National Old Age Pension)',short:'National pension scheme for BPL elderly citizens.',category:'Social Security',state:'All India',authority:'Ministry of Rural Development, Govt of India',benefit:'Monthly pension for elderly',age:{min:60,max:120},incomeMax:100000,occupations:['Any'],categories:['Any'],gender:['Any'],disability:'Any',documents:['Aadhaar','Age Proof','BPL Certificate','Bank Account Proof'],applicationUrl:'https://nsap.nic.in/'}
,{id:'sch-wb13',name:'IGNWPS (National Widow Pension)',short:'National pension scheme for BPL widows.',category:'Social Security',state:'All India',authority:'Ministry of Rural Development, Govt of India',benefit:'Monthly pension for widows',age:{min:40,max:120},incomeMax:100000,occupations:['Any'],categories:['Any'],gender:['Female'],disability:'Any',documents:['Aadhaar','Age Proof','BPL Certificate','Husband Death Certificate'],applicationUrl:'https://nsap.nic.in/'}
"""

data = data.replace('];export const complaintsSeed', new_schemes + '];export const complaintsSeed')

with open('src/lib/data.js', 'w') as f:
    f.write(data)
