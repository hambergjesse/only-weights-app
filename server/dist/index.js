"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// installed packages
const express_1 = __importDefault(require("express"));
const { MongoClient, Collection } = require("mongodb");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = require("body-parser");
dotenv_1.default.config();
const app = (0, express_1.default)();
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
app.get("/api", (req, res) => {
    collection.find().toArray((err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ err: err });
            return;
        }
        res.status(200).json(data);
    });
});
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    collection.insertOne({ email, password: hashedPassword }, (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Error registering user" });
            return;
        }
        //const token = jwt.sign({ email }, jwtToken, { expiresIn: "1h" });
        //res.json({ token });
    });
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield collection.findOne({ email });
    if (!user) {
        res.status(401).json({ message: "Email or password is incorrect" });
        return;
    }
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        res.status(401).json({ message: "Email or password is incorrect" });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ email }, jwtToken, { expiresIn: "1h" });
    res.json({ token });
}));
app.get("/api/user-data", (req, res) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Invalid token" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwtToken);
        collection.findOne({ email: decoded.email }, (err, user) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: "Error retrieving user data" });
                return;
            }
            res.json(user);
        });
    }
    catch (err) {
        res.status(401).json({ message: "Invalid token" });
        return;
    }
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    client.close();
});
