import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration - Allow all origins in development
app.use(cors());

// MongoDB Connection Options
const mongoOptions = {
    retryWrites: true,
    w: 'majority',
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 75000,
    family: 4,
    dbName: 'igdtuw',
    useNewUrlParser: true,
    useUnifiedTopology: true
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

// Connect to MongoDB
const connectDB = async () => {
    try {
        console.log('Connecting to Databases...');
        console.log('Using MongoDB URI:', process.env.MONGO_URI_PRODUCT);

        await mongoose.connect(process.env.MONGO_URI_PRODUCT, mongoOptions);
        console.log('MongoDB connection state:', mongoose.connection.readyState);
        console.log('Connected to database:', mongoose.connection.name);

        // Initialize models
        User = mongoose.model('User', userSchema);
        Product = mongoose.model('Product', productSchema);

        // Verify Product model
        const productCount = await Product.countDocuments();
        console.log(`Found ${productCount} products in database`);

        return true;
    } catch (error) {
        console.error('Detailed MongoDB connection error:', error);
        return false;
    }
};

// Handle MongoDB connection events
mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected. Attempting to reconnect...');
    setTimeout(connectDB, 5000);
});

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
});

// Serve static files from the dist directory
app.use(express.static('dist'));

// API Routes
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Get single product by ID
app.get('/api/products/:id', async (req, res) => {
    try {
        console.log('Fetching product with ID:', req.params.id);

        if (mongoose.connection.readyState !== 1) {
            throw new Error('MongoDB not connected. Current state: ' + mongoose.connection.readyState);
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        console.log('Found product:', product);
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/signup', async (req, res) => {
    try {
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

// Catch-all route for the React app
app.get('*', (req, res) => {
    res.sendFile('dist/index.html', { root: '.' });
});

// Connect to MongoDB and start server only after successful connection
const startServer = async () => {
    const isConnected = await connectDB();
    if (isConnected) {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } else {
        console.log('Failed to connect to MongoDB. Server not started.');
    }
};

startServer();

// Handle process errors
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
    process.exit(1);
});
