# Sahaay — IEMHACKS 4.0 Social Issues

Next.js + JavaScript + Tailwind prototype for IEMH4-SI-01.

## Run
npm install
npm run dev

Open http://localhost:3000

## Included
- Rule-based welfare eligibility engine
- Explainable scheme matching
- Scheme details + document checklist
- Official portal routing (demo URLs)
- Application workspace
- Anonymous grievance submission + IDs
- Complaint status workflow
- Regional analytics + escalation logic
- Responsive citizen/admin-style UI

## Important
The scheme data in this prototype is demo data, not verified current government eligibility data. Replace it with official, verified records before any real-world use.

The product intentionally does not fake government submission. It prepares the citizen and routes them to an official portal. Production can integrate official status APIs where available.

## MongoDB setup

1. Create a MongoDB Atlas cluster.
2. Create a database user and allow your development IP in Network Access.
3. Copy `.env.example` to `.env.local`.
4. Set:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=sahaay
```

5. Run `npm install` and `npm run dev`.
6. Visit `/api/health` to verify the connection.

### Collections used

- `schemes` — welfare scheme rules and metadata. Seeded automatically from `lib/data.js` on first database access.
- `profiles` — citizen profile data.
- `applications` — application preparation records.
- `complaints` — anonymous grievance records.
- `counters` — complaint ID sequence.

### Important

Do not commit `.env.local`. The MongoDB URI is never hard-coded into the application.
