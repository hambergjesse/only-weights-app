"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collection = exports.db = exports.app = void 0;
// installed packages
const express_1 = __importDefault(require("express"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Db, MongoClient, Collection } = require("mongodb");
const body_parser_1 = __importDefault(require("body-parser"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
// define .env stuff
const port = process.env.PORT;
const uri = process.env.MONGODB_URI;
const jwtToken = process.env.JWT_SECRET;
// specify who can access
exports.app.use((0, cors_1.default)({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// make app use parser
exports.app.use(body_parser_1.default.json());
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
    exports.db = client.db("only-weights-app");
    exports.collection = exports.db.collection("users");
});
exports.app.post("/register", async (req, res) => {
    // get variables from front
    const { name, email, password } = req.body;
    // hash password
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    // find user in database using their email
    exports.collection.findOne({ email: email }, (err, result) => {
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
        exports.collection.insertOne({ email: email, password: hashedPassword, name: name, workouts: [] }, (insertErr) => {
            if (insertErr) {
                console.error(insertErr);
                res.status(500).json({ message: "Error registering user" });
                return;
            }
            res.json({ message: "User registered successfully" });
        });
    });
});
exports.app.post("/login", async (req, res) => {
    // get variables from front
    const { email, password } = req.body;
    // get user from database
    const user = await exports.collection.findOne({ email });
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
exports.app.get("/api/user-data", (req, res) => {
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
        exports.collection.findOne({ email: decoded.email }, (err, user) => {
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
exports.app.get("/api/verify-token", (req, res) => {
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
        exports.collection.findOne({ email: decoded.email }, (err) => {
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
exports.app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    client.close();
});
