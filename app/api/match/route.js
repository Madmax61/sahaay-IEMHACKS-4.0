export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { matchSchemes } from "@/lib/eligibility";
import { ensureSeedData } from "@/lib/seed";
export async function POST(request){
  try{
    const profile=await request.json();
    const db=await ensureSeedData();
    const schemeDocs=await db.collection("schemes").find({}).project({_id:0}).toArray();
    return NextResponse.json({matches:matchSchemes(profile,schemeDocs)});
  }catch(e){
    console.error(e);
    return NextResponse.json({error:e.message},{status:500});
  }
}
