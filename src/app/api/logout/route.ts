//@ts-nocheck
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export  async function POST(req:NextRequest){

    const cookie= cookies()

   cookie.set("user","",{maxAge:0})
    return NextResponse.json({
        success:true
    })
}