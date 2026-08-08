export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { ensureSeedData } from "@/lib/seed";
export async function GET(){try{const db=await ensureSeedData();const schemes=await db.collection("schemes").find({}).project({_id:0}).toArray();return NextResponse.json({schemes});}catch(e){return NextResponse.json({error:e.message},{status:500});}}
