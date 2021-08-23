import Head from 'next/head'
import { connectToDatabase } from '../lib/mongodb'

export default function Home({ properties }) {
console.log(properties);
  return (
    <div>
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"></link>
      </Head>
    </div>

    <div class="container mx-auto">
      <div class="flex">
        <div class="row w-full text-center my-4">
          <h1 class="text-4xl font-bold mb-5">NEXT-BNB</h1>
        </div>
      </div>
    </div>
    <div class="flex flex-row flex-wrap">
      {properties && properties.map(property=>(
        <div class="flex-auto w-1/4 rounded owerflow-hidden shadow-lg m-2">
          <img class="w-full" src={property.image}/>  
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{property.name} (Up to {property.guest} guest)</div> 
            <p>{property.address.street}</p>
            <p class="text-gray-700 text-base"> {property.summary}</p>            
          </div>
          <div class="text-center py-2 my-2 font-bold">
            <span class="text-green-500">${property.price}</span>/night
          </div>
          <div class="text-center py-2 my-2">
            <button class="bg-blue-500 hover:bg=blue-700 text-white font-bold py-2 px-4 mr-5 rounded">BOOK</button>
          </div>
          
    </div>
        
      ))}
    </div>
</div>


    
  )
}

export async function getServerSideProps(context) {
  const { db  } = await connectToDatabase()

  const data= await db.collection("listingsAndReviews").find({}).limit(20).toArray();
  const properties= JSON.parse(JSON.stringify(data));

  const filtered=properties.map(property => {
  const price=JSON.parse(JSON.stringify(property.price));
    return{
      _id: property._id,
      name: property.name,
      image: property.images.picture_url,
      address: property.address,
      summary: property.summary,
      price: price.$numberDecimal
    }
  });

  return {
    props: { properties: filtered  },
  }
}
