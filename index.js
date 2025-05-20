const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://garden:nvLqu5PYscrn9AXU@gardaning.wynr3ow.mongodb.net/?retryWrites=true&w=majority&appName=gardaning";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
   
      
      
      
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  
      
  }
}
run().catch(console.dir);


// Simple Route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
