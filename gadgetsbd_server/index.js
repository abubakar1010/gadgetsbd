import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import { MongoClient, ServerApiVersion } from "mongodb";
import jwt from "jsonwebtoken";

const app = express();
const port = process.env.Port || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a2ulpwj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function connectDD() {
	try {
		// Connect the client to the server	(optional starting in v4.7)
		await client.connect();
		console.log(
			"Pinged your deployment. You successfully connected to MongoDB!"
		);

		const userCollection = client.db("gadgetsbd").collection("users");

		// custom middleware

		// jwt endpoints
		app.post("/authentication", (req, res) => {
			const userEmail = req.body;

			const token = jwt.sign(userEmail, process.env.ACCESS_TOKEN_SECRET, {
				expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
			});

			res.send({ token });
		});


        // user endpoints 

        app.post("/user", async(req, res) => {
            const {user} = req.body;

            console.log(req.body, user);
            

            const existedUser = await userCollection.findOne({ email: user.email })

            if(existedUser) return res.json({message: "User already exist"})

                const result = await userCollection.insertOne(user)

                res.send(result)
        })








        app.get("/", (_req, res) => {
            res.send("server connected");
        });
        
        app.listen(port, () => {
            console.log(`server connected on port ${port}`);
        });

	} catch (error) {
		console.log("Mongodb connection failed", error);
	}
}

connectDD();


