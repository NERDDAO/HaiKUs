

import clientPromise from "~~/app/lib/mongodb";

import { NextResponse } from "next/server";



export async function GET(req: Request) {
    let aiu
    // Database Name
    // Use connect method to connect to the server
    const { searchParams } = new URL(req.url);
    let param: string | number | null = searchParams.get("id");

    let myType = searchParams.get("type");
    if (myType !== "hash") myType = "address";
    if (myType === "hash") myType = "id";
    if (myType === "address") param = Number(param);
    const query = { [myType]: param };
    console.log(query);
    try {
        const client = await clientPromise;

        const db = client.db("nerdWorkState"); // Connect to the Database

        aiu = await db
            .collection("nerdHaikus")
            .find(query)//.find({ haiku:{type: param }})
            .limit(50)
            .toArray();

        return NextResponse.json(aiu); // Response to MongoClient
    } catch (e: any) {
        console.error(e);
        return NextResponse.json(e.message);
    }
    // Get all players from collection
}



