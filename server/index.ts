// installed packages
import express, { Express, Request, Response } from "express";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Db, MongoClient, Collection } = require("mongodb");
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser = require("body-parser");

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
let db: typeof Db, collection: typeof Collection;

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

// establish User interface
export interface User {
  _id: string;
  email: string;
  password: string;
}

app.post("/register", async (req: Request, res: Response) => {
  // get variables from front
  const { name, email, password } = req.body;
  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // find user in database using their email
  collection.findOne({ email: email }, (err: Error, result: Response) => {
    // general error check
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error registering user" });
      return;
    }

    // error message for duplicate email in db
    if (result) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    if (name.length > 20) {
      res.status(400).json({ message: "First name is too long" });
      return;
    }

    collection.insertOne(
      { email, password: hashedPassword, name },
      (insertErr: Error) => {
        if (insertErr) {
          console.error(insertErr);
          res.status(500).json({ message: "Error registering user" });
          return;
        }
        res.json({ message: "User registered successfully" });
      }
    );
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

  // send back user's token
  res.json({ token: token });
});

app.get("/api/user-data", (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  interface UserObj {
    _id: string;
    email: string;
    password: string;
    name: string;
  }

  try {
    const decoded = jwt.verify(token, jwtToken) as { email: string };

    collection.findOne(
      { email: decoded.email },
      (err: Error, user: UserObj) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: "Error retrieving user data" });
          return;
        }

        // send userdata as a response obj to front
        res.json({ email: user.email, name: user.name });
      }
    );
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  client.close();
});
