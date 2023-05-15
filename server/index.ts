// installed packages
import express, { Express, Request, Response } from "express";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Db, MongoClient, Collection } = require("mongodb");
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

export const app: Express = express();

// define .env stuff
const port = process.env.PORT;
const uri = process.env.MONGODB_URI;
const jwtToken: string = process.env.JWT_SECRET as string;

// specify who can access
app.use(
	cors({
		origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

// make app use parser
app.use(bodyParser.json());

// MongoDB variables
export let db: typeof Db, collection: typeof Collection;

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

		// check if name is too long
		if (name.length > 20) {
			res.status(400).json({ message: "First name is too long" });
			return;
		}

		// send data to the database
		collection.insertOne(
			{ email: email, password: hashedPassword, name: name, workouts: [] },
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
	const isMatch = await bcrypt.compare(password, user.password);

	// if passwords do not match, return error
	if (!isMatch) {
		res.status(401).json({ message: "Email or password is incorrect" });
		return;
	}

	// create token for succesful login
	const token = jwt.sign({ email }, jwtToken, { expiresIn: "1h" });

	// send back user's token
	res.json({ token: token });
});

// handle userdata connection between the front- and backend
app.get("/api/user-data", (req: Request, res: Response) => {
	// get user token from request
	const token = req.headers.authorization?.split(" ")[1];

	// if no token, return error
	if (!token) {
		res.status(401).json({ message: "Invalid token" });
		return;
	}

	// define the value types for a user object
	interface UserObj {
		_id: string;
		email: string;
		password: string;
		name: string;
		workouts: [];
	}

	try {
		// verify if token is valid
		const decoded = jwt.verify(token, jwtToken) as { email: string };

		// find the data of the specific user
		collection.findOne(
			{ email: decoded.email },
			(err: Error, user: UserObj) => {
				if (err) {
					console.error(err);
					res.status(500).json({ message: "Error retrieving user data" });
					return;
				}

				// send userdata as a response obj to front
				res.json({
					email: user.email,
					name: user.name,
					workouts: user.workouts,
				});
			}
		);
	} catch (err) {
		res.status(401).json({ message: "Invalid token" });
		return;
	}
});

// verify if token exists and if it is the right one for logged in user
app.get("/api/verify-token", (req: Request, res: Response) => {
	// get user token from request
	const token = req.headers.authorization?.split(" ")[1];

	// if no token, return error
	if (!token) {
		res.status(401).json({ isValid: false });
		return;
	}

	try {
		// verify if token is valid
		const decoded = jwt.verify(token, jwtToken) as { email: string };

		// check if user with the token exists
		collection.findOne({ email: decoded.email }, (err: Error) => {
			if (err) {
				console.error(err);
				res.status(500).json({ isValid: false });
				return;
			}

			res.json({ isValid: true });
			return;
		});
	} catch (err) {
		res.status(401).json({ isValid: false });
		return;
	}
});

// handle adding a new workout to a users data
app.post("/api/add-workout", async (req, res) => {
	try {
		// Get user token from request
		const token = req.headers.authorization?.split(" ")[1];

		// If no token, return error
		if (!token) {
			res.status(401).json({ message: "Invalid token" });
			return;
		}

		// Verify if token is valid
		const decoded = jwt.verify(token, jwtToken) as { email: string };

		// Find user with email
		const user = await collection.findOne({ email: decoded.email });

		// If user not found, return error
		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		// Get workout data from request body
		const { workout } = req.body;
		console.log({ workout });

		// Update user's data by adding new workout
		const result = await collection.updateOne(
			{ email: decoded.email },
			{ $push: { workouts: workout } }
		);

		// If update was not successful, return error
		if (!result.modifiedCount) {
			res.status(500).json({ message: "Error adding workout" });
			return;
		}

		// Return success message to client
		res.json({ message: "Workout added successfully" });
	} catch (err) {
		res.status(401).json({ message: "Invalid token" });
		return;
	}
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
	client.close();
});
