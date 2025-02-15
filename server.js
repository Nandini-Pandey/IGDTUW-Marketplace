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
<<<<<<< Updated upstream
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
=======
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// MongoDB Connection Options
const mongoOptions = {
    retryWrites: true,
    w: 'majority',
    ssl: true,
    tls: true,
    tlsAllowInvalidCertificates: true,
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 75000,
    family: 4,
    dbName: 'igdtuw', // Specify the database name explicitly
    useNewUrlParser: true,
    useUnifiedTopology: true
};
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes

// API Routes
app.get('/api/products', async (req, res) => {
    try {
<<<<<<< Updated upstream
        if (!isConnected) {
            await connectDB();
=======
        console.log('Received request for /api/products');
        console.log('MongoDB connection state:', mongoose.connection.readyState);
        console.log('Current database:', mongoose.connection.name);
        
        if (mongoose.connection.readyState !== 1) {
            throw new Error('MongoDB not connected. Current state: ' + mongoose.connection.readyState);
        }
        
        if (!Product) {
            throw new Error('Product model not initialized');
>>>>>>> Stashed changes
        }
        
        const products = await Product.find().lean();
        console.log(`Found ${products.length} products`);
        if (products.length > 0) {
            console.log('Sample product:', JSON.stringify(products[0], null, 2));
        }
        res.json(products);
    } catch (error) {
        console.error('Detailed error in /api/products:', error);
        res.status(500).json({ 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            mongoState: mongoose.connection.readyState,
            database: mongoose.connection.name
        });
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
<<<<<<< Updated upstream
        if (!isConnected) {
            await connectDB();
        }
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        if (!isConnected) {
            await connectDB();
        }
=======
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
=======
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
>>>>>>> Stashed changes

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
