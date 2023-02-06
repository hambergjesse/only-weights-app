"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// installed packages
const express_1 = __importDefault(require("express"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Db, MongoClient, Collection } = require("mongodb");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = require("body-parser");
dotenv_1.default.config();
const app = (0, express_1.default)();
// define .env stuff
const port = process.env.PORT;
const uri = process.env.MONGODB_URI;
const jwtToken = process.env.JWT_SECRET;
// specify who can access
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
}));
// make app use parser
app.use(bodyParser.json());
// MongoDB variables
let db, collection;
// mongodb setup
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
client.connect((err) => {
    if (err) {
        console.error(err);
        return;
    }
    db = client.db("only-weights-app");
    collection = db.collection("users");
});
app.post("/register", async (req, res) => {
    // get variables from front
    const { name, email, password } = req.body;
    // hash password
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    // find user in database using their email
    collection.findOne({ email: email }, (err, result) => {
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
        // check if name is too long
        if (name.length > 20) {
            res.status(400).json({ message: "First name is too long" });
            return;
        }
        // send data to the database
        collection.insertOne({ email: email, password: hashedPassword, name: name, workouts: [] }, (insertErr) => {
            if (insertErr) {
                console.error(insertErr);
                res.status(500).json({ message: "Error registering user" });
                return;
            }
            res.json({ message: "User registered successfully" });
        });
    });
});
app.post("/login", async (req, res) => {
    // get variables from front
    const { email, password } = req.body;
    // get user from database
    const user = await collection.findOne({ email });
    // if user email doesn't exist return error
    if (!user) {
        res.status(401).json({ message: "Email or password is incorrect" });
        return;
    }
    // check if the inputted and pre-existing passwords match
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    // if passwords do not match, return error
    if (!isMatch) {
        res.status(401).json({ message: "Email or password is incorrect" });
        return;
    }
    // create token for succesful login
    const token = jsonwebtoken_1.default.sign({ email }, jwtToken, { expiresIn: "1h" });
    // send back user's token
    res.json({ token: token });
});
// handle userdata connection between the front- and backend
app.get("/api/user-data", (req, res) => {
    var _a;
    // get user token from request
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    // if no token, return error
    if (!token) {
        res.status(401).json({ message: "Invalid token" });
        return;
    }
    try {
        // verify if token is valid
        const decoded = jsonwebtoken_1.default.verify(token, jwtToken);
        // find the data of the specific user
        collection.findOne({ email: decoded.email }, (err, user) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: "Error retrieving user data" });
                return;
            }
            // send userdata as a response obj to front
            res.json({ email: user.email, name: user.name });
        });
    }
    catch (err) {
        res.status(401).json({ message: "Invalid token" });
        return;
    }
});
// verify if token exists and if it is the right one for logged in user
app.get("/api/verify-token", (req, res) => {
    var _a;
    // get user token from request
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    // if no token, return error
    if (!token) {
        res.status(401).json({ isValid: false });
        return;
    }
    try {
        // verify if token is valid
        const decoded = jsonwebtoken_1.default.verify(token, jwtToken);
        // check if user with the token exists
        collection.findOne({ email: decoded.email }, (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ isValid: false });
                return;
            }
            res.json({ isValid: true });
            return;
        });
    }
    catch (err) {
        res.status(401).json({ isValid: false });
        return;
    }
});
// handle adding a new workout to a users data
/*app.post("/api/add-workout", (req: Request, res: Response) => {
  // get user token from request
  const token = req.headers.authorization?.split(" ")[1];

  // if no token, return error
  if (!token) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  try {
    // verify if token is valid
    const decoded = jwt.verify(token, jwtToken) as { email: string };

    // find user with email
    collection.findOne({ email: decoded.email }, (err: Error) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding workout" });
        return;
      }

      // get workout
      const { workout } = req.body;

      // update user's data by adding new workout
      collection.updateOne(
        { email: decoded.email },
        { $push: { workouts: workout } },
        (updateErr: Error) => {
          if (updateErr) {
            console.error(updateErr);
            res.status(500).json({ message: "Error adding workout" });
            return;
          }

          // return success message to front
          res.json({ message: "Workout added successfully" });
        }
      );
    });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
});*/
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    client.close();
});
