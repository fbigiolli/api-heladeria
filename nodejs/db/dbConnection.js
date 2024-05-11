const api_pw = '';

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://felipebigiolli:${api_pw}@via-apilia.6idqtd9.mongodb.net/?retryWrites=true&w=majority&appName=Via-Apilia"`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function dbConnection() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = { client , dbConnection };