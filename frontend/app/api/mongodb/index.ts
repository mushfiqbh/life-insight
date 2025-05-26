import { MongoClient } from "mongodb";

const URI =
  "mongodb+srv://mushfiqbh:Lq6AKM1g5tQDGxLb@cluster0.cppebjh.mongodb.net";
const client = new MongoClient(URI);

async function run() {
  try {
    await client.connect();
    const db = client.db("sample_mflix");
    const collection = db.collection("movies");

    // Find the first document in the collection
    const first = await collection.findOne();
    console.log(first);
  } finally {
    // Close the database connection when finished or an error occurs
    await client.close();
  }
}
run().catch(console.error);
