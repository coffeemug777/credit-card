const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const uri = "mongodb://root:password@localhost:27017/";
const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("ccDb");
    console.log("Database connected ", database);
    const cards = database.collection("cards");
    await cards.deleteMany();

    const visaCard = {
      name: "Visa",
      image: "assets/visa.jpg",
      features: ["3% cash return", "Milage points"],
      rules: ["$90 annual fee"],
    };

    const amexCard = {
      name: "American Express",
      image: "assets/amex.jpg",
      features: ["2% cash back", "Free rental insurance"],
      rules: [],
    };

    const result = await cards.insertMany([visaCard, amexCard]);
    console.log(`Document/s inserted: ${result}`);

    const query = { name: "Visa" };
    const card = await cards.findOne(query);
    console.log("Card is ", card);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch((error) => {
  console.log("Error ", error);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
