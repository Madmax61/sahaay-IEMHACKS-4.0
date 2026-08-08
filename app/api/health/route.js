export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
export async function GET(){return NextResponse.json({ok:true,database:"sahaay"});}
