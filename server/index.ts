// installed packages
import express, { Express, Request, Response } from "express";
const { MongoClient, Collection } = require("mongodb");
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
const bodyParser = require("body-parser");

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const uri = process.env.MONGODB_URI;
const jwtToken: string = process.env.JWT_SECRET as string;

// specify who can access
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// make app use parser
app.use(bodyParser.json());

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
  db = client.db("only-weights-app");
  collection = db.collection("users");
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

app.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  collection.insertOne({ email, password: hashedPassword }, (err: Error) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error registering user" });
      return;
    }

    //const token = jwt.sign({ email }, jwtToken, { expiresIn: "1h" });

    //res.json({ token });
  });
});

app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await collection.findOne({ email });

  if (!user) {
    res.status(401).json({ message: "Email or password is incorrect" });
    return;
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(401).json({ message: "Email or password is incorrect" });
    return;
  }

  const token = jwt.sign({ email }, jwtToken, { expiresIn: "1h" });

  res.json({ token });
});

app.get("/api/user-data", (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
  try {
    const decoded = jwt.verify(token, jwtToken) as { email: string };

    collection.findOne({ email: decoded.email }, (err: any, user: any) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving user data" });
        return;
      }

      res.json(user);
    });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  client.close();
});
