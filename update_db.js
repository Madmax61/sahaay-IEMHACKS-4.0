import { getDb } from "./src/lib/mongodb.js";
import { schemes } from "./src/lib/data.js";

async function run() {
  const db = await getDb();
  await db.collection("schemes").deleteMany({});
  await db.collection("schemes").insertMany(schemes.map((s) => ({ ...s, createdAt: new Date(), updatedAt: new Date() })));
  console.log("DB refreshed");
  process.exit(0);
}
run();
