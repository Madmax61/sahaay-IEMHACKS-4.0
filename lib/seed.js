import { getDb } from "./mongodb";
import { schemes, complaintsSeed } from "./data";

export async function ensureSeedData() {
  const db = await getDb();
  const schemeCount = await db.collection("schemes").countDocuments();
  if (schemeCount === 0) {
    await db.collection("schemes").insertMany(
      schemes.map((s) => ({ ...s, createdAt: new Date(), updatedAt: new Date() }))
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
