const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const uri = "mongodb://root:password@localhost:27017/";
const client = new MongoClient(uri);
const cors = require("cors");
const allowedOrigins = ["http://localhost:8080", "http://localhost:4200"];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.use(express.json());

const database = client.db("ccDb");
const cards = database.collection("cards");
const account = database.collection("account");
const transaction = database.collection("transaction");

async function insertCards() {
  //console.log("Database connected ", database);
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
  //console.log(`Document/s inserted: ${result}`);

  //const query = { name: "Visa" };
  //const card = await cards.findOne(query);
  //console.log("Card is ", card);
}

async function deleteTransactions() {
  const result = await transaction.deleteMany();
}

async function insertAccounts() {
  await account.deleteMany();
  const mockAccount = {
    account: [
      {
        name: "John Doe",
        email_addresses: ["john.doe@example.com"],
        addresses: ["123 Main St, Anytown, USA"],
        phone_numbers: ["1234567890"],
        income: {
          annual_income: 50000,
          monthly_income: 4166.67,
        },
        cards: [
          {
            name: "Visa Card",
            number: "1234567890123456",
            image: "assets/visa.jpg",
            balance_overview: {
              current_balance: 1000,
              minimum_balance: 500,
              remaining_statement_balance: 100,
              payment_required: 100,
              credit_limit: 20000,
            },
            transactions: [
              {
                date: "2025-01-02",
                values: [
                  {
                    id: "1",
                    description: "Apple",
                    amount: 2.99,
                    type: "debit",
                  },
                  {
                    id: "2",
                    description: "Walmart",
                    amount: 12.0,
                    type: "debit",
                  },
                  {
                    id: "3",
                    description: "Amazon Web Service",
                    amount: 3.99,
                    type: "debit",
                  },
                ],
              },
              {
                date: "2025-01-01",
                values: [
                  {
                    id: "1",
                    description: "Patreon",
                    amount: 5.99,
                    type: "debit",
                  },
                  {
                    id: "2",
                    description: "Publix",
                    amount: 56.2,
                    type: "debit",
                  },
                ],
              },
              {
                date: "2024-12-31",
                values: [
                  {
                    id: "1",
                    description: "Amazon",
                    amount: 52.0,
                    type: "debit",
                  },
                  {
                    id: "2",
                    description: "Toll",
                    amount: 0.24,
                    type: "debit",
                  },
                  {
                    id: "3",
                    description: "AMC Movie Theatre",
                    amount: 7.99,
                    type: "debit",
                  },
                ],
              },
            ],
            status: "active",
          },
        ],
        active_card: "0",
        user_name: "John Doe",
        password: "password123",
      },
    ],
    cards: [
      {
        name: "Visa Card",
        number: "1234567890123456",
        expiry_date: "12/2025",
        image: "https://example.com/images/visa-card.png",
        features: [
          {
            feature: "Debit Card",
            description: "Can be used for purchases and withdrawals.",
          },
          {
            feature: "Credit Card",
            description: "Can be used for loans and payments.",
          },
        ],
        rules: {
          minimum_balance: 500,
          remaining_statement_balance: 100,
          payment_required: 100,
          credit_limit: 20000,
        },
      },
      {
        name: "Mastercard",
        number: "5123456789012345",
        expiry_date: "12/2025",
        image: "https://example.com/images/visa-card.png",
        features: [
          {
            feature: "Debit Card",
            description: "Can be used for purchases and withdrawals.",
          },
          {
            feature: "Credit Card",
            description: "Can be used for loans and payments.",
          },
        ],
        rules: {
          minimum_balance: 500,
          remaining_statement_balance: 100,
          payment_required: 100,
          credit_limit: 20000,
        },
      },
    ],
    transactions: [
      {
        account_id: "1",
        description: "Purchase of a product from a store.",
        card_id: "1",
        amount: 500,
        type: "debit",
        date: "2023-04-01",
      },
      {
        account_id: "2",
        description: "Payment of a loan to the bank.",
        card_id: "2",
        amount: 100,
        type: "credit",
        date: "2023-04-02",
      },
      {
        account_id: "1",
        description: "Withdrawal of funds from the account.",
        card_id: "1",
        amount: 500,
        type: "credit",
        date: "2023-04-03",
      },
    ],
  };

  const result = await account.insertOne(mockAccount);
}

async function initRun() {
  try {
    await insertCards();
    await insertAccounts();
    await deleteTransactions();
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
    console.log("InitRun done");
  }
}

initRun().catch((error) => {
  console.log("Error ", error);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/transaction", async (req, res) => {
  console.log("Transaction received: ", req.body);
  try {
    const result = await transaction.insertOne(req.body);
    res.status(200).send(result);
  } catch (error) {
    console.log("Error in inserting to transaction ", error);
    res.status(500).send("Error " + error);
  }
  //console.log("Database connected ", database);
  //await cards.deleteMany();
});
/**
 * get transactions by card id,
 * only return the latest 3 days, and
 * group them by date
 */

app.get("/transaction/:card_id", async (req, res) => {
  const card_id = req.params.card_id;
  try {
    const result = await transaction
      .aggregate([
        { $match: {} },
        {
          $group: {
            _id: "$date_group",
            values: { $push: "$$ROOT" },
          },
        },
        {
          $sort: { _id: -1 },
        },
        { $limit: 3 },
        error,
      ])
      .toArray();
    res.status(200).send(result);
  } catch (error) {
    console.log("Error in getting card id ", card_id, error);
    res.status(500).send(error);
  }
});

app.get("/transaction/summary/:card_id", async (req, res) => {
  const card_id = req.params.card_id;
  try {
    const result = transaction.aggregate;
  } catch (error) {
    console.log("Error in transaction/summary ", error);
  }
});

app.get("/account", async (req, res) => {
  const result = await account.findOne();
  //console.log("test ", req.query.id, result);
  res.status(200).send(result);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
