import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
const DEMO_USER_ID="demo-user";
export async function GET(){try{const db=await getDb();const profile=await db.collection("profiles").findOne({userId:DEMO_USER_ID},{projection:{_id:0}});return NextResponse.json({profile:profile||null});}catch(e){return NextResponse.json({error:e.message},{status:500});}}
export async function POST(request){try{const profile=await request.json();const db=await getDb();const now=new Date();await db.collection("profiles").updateOne({userId:DEMO_USER_ID},{$set:{...profile,userId:DEMO_USER_ID,updatedAt:now},$setOnInsert:{createdAt:now}},{upsert:true});return NextResponse.json({profile:{...profile,userId:DEMO_USER_ID}});}catch(e){return NextResponse.json({error:e.message},{status:500});}}
