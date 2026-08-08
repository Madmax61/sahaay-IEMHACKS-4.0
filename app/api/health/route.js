import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
export async function GET(){try{const db=await getDb();await db.command({ping:1});return NextResponse.json({ok:true,database:process.env.MONGODB_DB||"sahaay"});}catch(e){return NextResponse.json({ok:false,error:e.message},{status:500});}}
