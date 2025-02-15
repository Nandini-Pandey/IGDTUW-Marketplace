import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:5174',
        'http://127.0.0.1:5175'
    ],
    credentials: true
}));

// MongoDB Connection Options
const mongoOptions = {
    retryWrites: true,
    w: 'majority',
    ssl: true,
    tls: true,
    tlsAllowInvalidCertificates: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
};

// Schemas
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    accommodationType: { type: String, required: true },
    year: { type: String, required: true },
    condition: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true }
});

let User, Product;
let isConnected = false;

const connectDB = async () => {
    try {
        if (isConnected) {
            console.log('Using existing database connection');
            return;
        }

        console.log('Connecting to User Database...');
        const userDB = await mongoose.createConnection(process.env.MONGO_URI_USER, mongoOptions);
        
        console.log('Connecting to Product Database...');
        const productDB = await mongoose.createConnection(process.env.MONGO_URI_PRODUCT, mongoOptions);
        
        User = userDB.model('User', userSchema);
        Product = productDB.model('Product', productSchema);
        isConnected = true;
        console.log('MongoDB connections established successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        isConnected = false;
        // Try to reconnect after 5 seconds
        setTimeout(connectDB, 5000);
    }
};

// Connect to MongoDB
connectDB();

// API Routes
app.get('/api/products', async (req, res) => {
    try {
        if (!isConnected) {
            await connectDB();
        }
        const products = await Product.find();
        console.log(`Found ${products.length} products`);
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/signup', async (req, res) => {
    try {
        if (!isConnected) {
            await connectDB();
        }
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(400).json({ message: 'Error registering user', error: error.message });
    }
});

app.post('/signin', async (req, res) => {
    try {
        if (!isConnected) {
            await connectDB();
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your-secret-key');
        res.json({ token });
    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ message: 'Error signing in', error: error.message });
    }
});

// Test route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Handle process errors
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
    process.exit(1);
});
