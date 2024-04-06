
import clientPromise from "~~/app/lib/mongodb";
import { HaikuNode } from "~~/types/dbSchema";

import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    let aiu
    // Database Name
    // Use connect method to connect to the server
    const { HaikuArray } = await req.json();
    const ha: HaikuNode[] = HaikuArray;
    try {
        const client = await clientPromise;
        const db = client.db("nerdWorkState");
        const objectIdArray = ha.map(id => id);
        console.log(objectIdArray);
        const haikus = await db
            .collection("nerdHaikus")
            .find({ id: { $in: objectIdArray } })
            .toArray();
        return NextResponse.json(haikus); // Response to MongoClient
    } catch (e: any) {
        console.error(e);
        return NextResponse.json(e.message);
    }
    // Get all players from collection
}


export async function getHaikusByIds(ids: string[]) {
    try {


        return haikus;
    } catch (e: any) {
        console.error(e);
        throw new Error(e.message);
    }
}
