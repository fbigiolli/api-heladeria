const dotenv = require('dotenv').config();

const api_user = process.env.DB_USR;
const api_pw = process.env.DB_PW;
console.log(api_pw);
console.log(api_user);

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${api_user}:${api_pw}@via-apilia.6idqtd9.mongodb.net/?retryWrites=true&w=majority&appName=Via-Apilia"`;

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
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

async function dbDisconnect() {
  try {
    await client.close();
    console.log("Disconnected from MongoDB!");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
    throw error;
  }
}

module.exports = { client, dbConnection, dbDisconnect };