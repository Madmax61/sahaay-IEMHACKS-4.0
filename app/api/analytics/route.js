import { NextResponse } from "next/server";
import { ensureSeedData } from "@/lib/seed";

export async function GET(){
  try{
    const db=await ensureSeedData();
    const complaints=await db.collection("complaints").find({}).project({status:1,category:1,location:1}).toArray();
    const total=complaints.length;
    const resolved=complaints.filter(c=>c.status==="Resolved").length;
    const byCategory={};
    complaints.forEach(c=>{byCategory[c.category]=(byCategory[c.category]||0)+1});
    const byLocation={};
    complaints.forEach(c=>{byLocation[c.location]=(byLocation[c.location]||0)+1});
    const applications=await db.collection("applications").countDocuments();
    return NextResponse.json({total,resolved,resolutionRate:total?Number((resolved/total*100).toFixed(1)):0,applications,byCategory,byLocation});
  }catch(e){return NextResponse.json({error:e.message},{status:500});}
}
