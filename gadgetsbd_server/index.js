import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
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
		const productCollection = client.db("gadgetsbd").collection("products");

		//verify jwt toke

		const verifyToken = async (req, res, next) => {
			const data = req.headers.authorization;

			const token = data?.split(" ")[1];

			if (token) {
				jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
					if (err) res.status(403).json("token is not valid");
					req.user = user;
					next();
				});
			} else {
				return res.status(401).json("You are not authenticated");
			}
		};
		const verifySeller = async (req, res, next) => {
			const data = req.headers.authorization;

			const token = data?.split(" ")[1];

			if (token) {
				jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
					if (err) res.status(403).json("token is not valid");
					const result = await userCollection.findOne({ email: user.email });
					if (!result) res.status(404).json({ message: "user not found" });
					if (result.email === "Seller") {
						next();
					} else {
						res.status(401).json({ message: "unAuthorized user" });
					}
				});
			} else {
				return res.status(401).json("You are not authenticated");
			}
		};

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

		// create a new user

		app.post("/create-user", async (req, res) => {
			const { user } = req.body;

			const existedUser = await userCollection.findOne({ email: user.email });

			if (existedUser) return res.json({ message: "User already exist" });

			const result = await userCollection.insertOne(user);

			res.json({ message: "user created successfully", result });
		});

		//get single user

		app.get("/get-user", async (req, res) => {
			const email = req.query.email;

			const result = await userCollection.findOne({ email });
			if (!result) return res.json({ message: "User not found" });

			res.json({ message: "User fetched successfully", result });
		});

		// products endpoints

		// insert a new products

		app.post("/add-product", async (req, res) => {
			const { product } = req.body;

			const existedProduct = await productCollection.findOne({
				title: product.title,
			});

			if (existedProduct) return res.json({ message: "Product already exist" });

			const result = await productCollection.insertOne({
				...product,
				price: parseFloat(product.price),
			});

			res.json({ message: "Product successfully added", result });
		});

		// get single product

		app.get("/single-product/:title", async (req, res) => {
			const title = req.params.title;

			const result = await productCollection.findOne({ title });

			if (!result) return res.json({ message: "Product not found" });

			res.json({ message: "product fetched successfully", result });
		});

		app.get("/all-product", async (req, res) => {
			const { title, category, brand, sort, page = 1, limit = 9 } = req.query;

			const query = {};
			let sortOption = 1;

			if (title) {
				query.title = { $regex: title, $options: "i" };
			}
			if (category) {
				query.category = { $regex: category, $options: "i" };
			}
			if (brand) {
				query.brand = { $regex: brand, $options: "i" };
			}
			if (sort === "dec") {
				sortOption = -1;
				console.log(sortOption);
			} else {
				sortOption = 1;
			}

			const pageInNumber = Number(page);
			const limitInNumber = Number(limit);

			console.log(pageInNumber, limitInNumber);

			const result = await productCollection
				.find(query)
				.skip((pageInNumber - 1) * limitInNumber)
				.limit(limitInNumber)
				.sort({ price: sortOption })
				.toArray();

			if (!result)
				res.status(404).json({ message: "Product not found", result: null });

			const product = await productCollection
				.find({}, { brand: 1, category: 1 })
				.toArray();

			const productBrand = [...new Set(product.map((item) => item.brand))];
			const productCategory = [
				...new Set(product.map((item) => item.category)),
			];
			const totalProduct = await productCollection.countDocuments(query);

			res.json({
				message: "successfully fetched products",
				result,
				productBrand,
				productCategory,
				totalProduct,
			});
		});

		// wishlist endpoints

		app.patch("/add-to-wishlist", async (req, res) => {
			const { email, productId } = req.body;

			const result = await userCollection.updateOne(
				{ email },
				{
					$addToSet: {
						wishlist: new ObjectId(String(productId)),
					},
				}
			);

			res.json({ message: "Item added successful", result });
		});

		app.get("/wishlist/:email", async (req, res) => {
			const email = req.params.email;

			const user = await userCollection.findOne({ email });

			if (!user) return res.status(404).json({ message: "user not found" });

			const product = await productCollection
				.find({ _id: { $in: user.wishlist } })
				.toArray();

			if (!product)
				return res.status(404).json({ message: "product not found" });

			res
				.status(200)
				.json({ message: "Wishlist product fetched successfully", result: product });
		});

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
