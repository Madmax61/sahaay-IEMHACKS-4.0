import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { ensureSeedData } from './src/lib/seed.js';
import { getDb } from './src/lib/mongodb.js';
import { matchSchemes } from './src/lib/eligibility.js';

const DEMO_USER_ID = "demo-user";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.get('/api/analytics', async (req, res) => {
    try {
      const db = await ensureSeedData();
      const complaints = await db.collection("complaints").find({}).project({status:1,category:1,location:1}).toArray();
      const total = complaints.length;
      const resolved = complaints.filter(c => c.status === "Resolved").length;
      const byCategory = {};
      complaints.forEach(c => { byCategory[c.category] = (byCategory[c.category] || 0) + 1 });
      const byLocation = {};
      complaints.forEach(c => { byLocation[c.location] = (byLocation[c.location] || 0) + 1 });
      const applications = await db.collection("applications").countDocuments();
      res.json({ total, resolved, resolutionRate: total ? Number((resolved / total * 100).toFixed(1)) : 0, applications, byCategory, byLocation });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get('/api/schemes', async (req, res) => {
    try {
      const db = await ensureSeedData();
      const schemes = await db.collection("schemes").find({}).project({_id:0}).toArray();
      res.json({ schemes });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get('/api/applications', async (req, res) => {
    try {
      const db = await getDb();
      const applications = await db.collection("applications").find({userId:DEMO_USER_ID}).sort({createdAt:-1}).project({_id:0}).toArray();
      res.json({ applications });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post('/api/applications', async (req, res) => {
    try {
      const body = req.body;
      const db = await getDb();
      const application = {
        userId: DEMO_USER_ID,
        applicationId: `APP-${Date.now().toString().slice(-7)}`,
        schemeId: body.schemeId,
        scheme: body.scheme,
        status: body.status || "Ready to apply",
        progress: body.progress ?? 75,
        officialUrl: body.officialUrl,
        missingDocuments: body.missingDocuments || [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await db.collection("applications").insertOne(application);
      const { _id, ...safe } = application;
      res.json({ application: safe });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get('/api/complaints', async (req, res) => {
    try {
      const db = await ensureSeedData();
      const complaints = await db.collection("complaints").find({}).sort({createdAt:-1}).project({_id:0}).limit(100).toArray();
      res.json({ complaints });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post('/api/complaints', async (req, res) => {
    try {
      const body = req.body;
      const db = await ensureSeedData();
      const counter = await db.collection("counters").findOneAndUpdate(
        { _id: "complaint" },
        { $inc: { value: 1 } },
        { upsert: true, returnDocument: "after" }
      );
      const n = counter.value?.value || 4822;
      const complaint = {
        id: `WB-KOL-${n}`,
        category: body.category || "Other",
        location: body.location || "Location withheld",
        description: body.description || "",
        status: "Submitted",
        priority: body.priority || "Medium",
        created: "Just now",
        department: body.category === "Road" ? "Roads" : body.category === "Water" ? "Water Supply" : "Municipal Services",
        anonymous: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await db.collection("complaints").insertOne(complaint);
      const { _id, ...safeComplaint } = complaint;
      res.json({ complaint: safeComplaint });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post('/api/match', async (req, res) => {
    try {
      const profile = req.body;
      const db = await ensureSeedData();
      const schemeDocs = await db.collection("schemes").find({}).project({_id:0}).toArray();
      res.json({ matches: matchSchemes(profile, schemeDocs) });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get('/api/profile', async (req, res) => {
    try {
      const db = await getDb();
      const profile = await db.collection("profiles").findOne({userId:DEMO_USER_ID}, {projection:{_id:0}});
      res.json({ profile: profile || null });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post('/api/profile', async (req, res) => {
    try {
      const profile = req.body;
      const db = await getDb();
      const now = new Date();
      await db.collection("profiles").updateOne(
        {userId:DEMO_USER_ID},
        {$set:{...profile,userId:DEMO_USER_ID,updatedAt:now},$setOnInsert:{createdAt:now}},
        {upsert:true}
      );
      res.json({ profile: {...profile,userId:DEMO_USER_ID} });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
