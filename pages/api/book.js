import { async } from "regenerator-runtime";
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res){
    const {db} =await connectToDatabase();

    const data=req.query;

    const response= await db.collection("bookings").insertOne(data);

    res.json(response);
}