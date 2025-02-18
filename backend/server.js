require('dotenv').config(); // Load .env file

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// MongoDB Connection:
mongoose.connect(MONGO_URI, {
    retryWrites: true,
    w: 'majority',
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 75000,
    family: 4,
    dbName: 'UserDetails' //db name 
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB User Connection Error:", err));

app.get("/", (req, res) => {
    res.send("Server is running"); 
});

// Product Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    accommodationType: { type: String },
    year: { type: String },
    condition: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true }
});

const Product = mongoose.model('Products', productSchema);

//Upload Product 
app.post('/products', async (req, res) => {
    try {
        const { name, category, accommodationType, year, condition, price, description, img } = req.body;
        console.log("Received user details:", req.body);

        if (!name || !category || !condition || !price || !description || !img) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newProduct = new Product(req.body);

        await newProduct.save();

        res.status(201).json({ success: true, message: 'Product uploaded successfully', product: newProduct });
    } catch (error) {
        console.error('Error uploading product:', error);
        res.status(500).json({ error: 'Failed to upload product' });
    }
});

// Fetch All Product
app.get('/products', async (req, res) => {
   try {
       const products = await Product.find();
    // console.log('Fetched products:', products);  More verbose logging
       res.json(products);
   } catch (error) {
       console.error('Error fetching products:', error);
       res.status(500).json({ error: 'Failed to fetch products' });
   }
});

//Fetch filtered products
app.get('/products/:id', async (req, res) => {
    try {
        // console.log('Fetching product with ID:', req.params.id);
        if (mongoose.connection.readyState !== 1) throw new Error('MongoDB not connected');

        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: error.message });
    }
});

// Global Uncaught Exception Handling
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
    process.exit(1);
});

app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Server running on port ${PORT}`);
    } else {
        console.error("Server error:", error);
    }
});

// User Schema
const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    },
    name: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
        match: /^\d{10}$/,
    },
    graduationYear: {
        type: Number,
        enum: [2025, 2026, 2027, 2028, 2029],
        required: true,
    },
    branch: {
        type: String,
        enum: ['cse', 'cse-ai', 'ece', 'ece-ai', 'mae', 'barch', 'it', 'ai-ml', 'bba', 'bca', 'mca'],
        required: true,
    },
    accommodation: {
        type: String,
        enum: ['hostel', 'day-scholar', 'pg'],
        required: true,
    },
});

const User = mongoose.model('User', userSchema);

// User Registration Endpoint
app.post('/userinfo', async (req, res) => {
    try {
        console.log("Received user details:", req.body);
        const user = new User(req.body);
        await user.save();
        console.log("User saved:", user);
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ success: false, message: "Error saving user" });
    }
}); 

// Fetch on Dashboard
app.get('/userinfo', async (req, res) => {
    try {
        const { userId } = req.query;
        console.log("Received Request with Query:", req.query);
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user info:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// Update user information
app.put('/userinfo', async (req, res) => {
    try { 
        const { userId, name, phoneNo, branch, graduationYear, accommodation } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const updatedUser = await User.findOneAndUpdate(
            { userId },
            { name, phoneNo, branch, graduationYear, accommodation },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "Profile updated", user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

