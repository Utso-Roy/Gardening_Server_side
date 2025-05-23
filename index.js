const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@gardaning.wynr3ow.mongodb.net/?retryWrites=true&w=majority&appName=gardaning`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const userFromData = client.db("userFromData").collection("user");
    const gardenersData = client
      .db("gardenersData")
      .collection("activeGardener");
    const shareTipData = client.db("shareTipData").collection("shareTip");

    app.post("/user", async (req, res) => {
      const data = req.body;
      const result = await userFromData.insertOne(data);
      res.send(result);
    });

    app.post("/activeGardener", async (req, res) => {
      const data = req.body;
      const result = await gardenersData.insertMany(data);
      res.send({ message: "Gardeners added successfully", result });
    });

    app.post("/shareTip", async (req, res) => {
      const data = req.body;
      const result = await shareTipData.insertOne(data);
      res.send({ message: "share data successfully ", result });
    });

    app.get("/shareTip", async (req, res) => {
      const result = await shareTipData.find().toArray();
      res.send(result);
    });

    app.get("/activeGardener", async (req, res) => {
      try {
        const limit = parseInt(req.query.limit) || 6;
        const result = await gardenersData
          .find({ status: "active" })
          .limit(limit)
          .toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching gardeners:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    app.get("/user", async (req, res) => {
      try {
        const result = await userFromData.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(` Server running on port ${port}`);
});
