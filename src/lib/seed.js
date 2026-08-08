import { getDb } from "./mongodb";
import { schemes, complaintsSeed } from "./data.js";

export async function ensureSeedData() {
  const db = await getDb();
    const existing = await db.collection("schemes").find({}, { projection: { id: 1 } }).toArray();
  const existingIds = new Set(existing.map((e) => e.id));
  const missing = schemes.filter((s) => !existingIds.has(s.id));
  if (missing.length > 0) {
    await db.collection("schemes").insertMany(
      missing.map((s) => ({ ...s, createdAt: new Date(), updatedAt: new Date() }))
    );
  }
  
  const complaintCount = await db.collection("complaints").countDocuments();
  if (complaintCount === 0) {
    await db.collection("complaints").insertMany(
      complaintsSeed.map((c) => ({ ...c, createdAt: new Date(), updatedAt: new Date() }))
    );
  }

  await Promise.all([
    db.collection("schemes").createIndex({ id: 1 }, { unique: true }),
    db.collection("schemes").createIndex({ state: 1, category: 1 }),
    db.collection("profiles").createIndex({ userId: 1 }, { unique: true }),
    db.collection("applications").createIndex({ userId: 1, createdAt: -1 }),
    db.collection("complaints").createIndex({ id: 1 }, { unique: true }),
    db.collection("complaints").createIndex({ status: 1, category: 1 }),
    db.collection("complaints").createIndex({ createdAt: -1 })
  ]);
  return db;
}
