import MongoClient, { MongoClient } from "mongodb/lib/mongo_client";
import { async } from "regenerator-runtime";

const {MONGO_URI, MONGO_DB}= precess.env


if(!MONGO_URI){
    throw new Error(
        'Plese define the MONGO_URI env variable inside env.local'
    )
}

if(!MONGO_DB){
    throw new Error(
        'Please define the MONGO_DB env variable inside env.local'
    )
}

let cached= global.mongo

if(!cached){
    cached=global.mongo={conn=null, promise:null}
}

export async function connectToDatabase(){
    if(cashed.conn){
        return cashed.conn
    }

    if(!cashed.promise){
        const apts= {
            useNewUrlParser:true,
            useUnifiedTopology: true,
        }
        cashed.promise = MongoClient.connect(MONGO_URI, opts).then((client) =>  {
            return {
                client,
                db: client.db(MONGO_DB),
            }
        })
    }
    
    cashed.conn= await cashed.promise
    return cashed.conn
}


