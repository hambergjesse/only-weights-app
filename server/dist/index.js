"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// installed packages
const express_1 = __importDefault(require("express"));
const { MongoClient, Collection } = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const uri = process.env.MONGODB_URI;
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
    db = client.db("sample_analytics");
    collection = db.collection("customers");
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
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    client.close();
});
