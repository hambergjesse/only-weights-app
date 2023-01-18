// installed packages
import express, { Express, Request, Response } from "express";
const { MongoClient, Collection } = require("mongodb");
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const uri = process.env.MONGODB_URI;

// MongoDB variables
let db: any, collection: typeof Collection;

// mongodb setup
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err: Error) => {
  if (err) {
    console.error(err);
    return;
  }
  db = client.db("sample_analytics");
  collection = db.collection("customers");
});

app.get("/api", (req: Request, res: Response) => {
  collection.find().toArray((err: Error, data: any[]) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: err });
      return;
    }
    res.status(200).json(data);
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  client.close();
});
