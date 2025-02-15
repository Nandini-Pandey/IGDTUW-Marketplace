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
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
    credentials: true
}));

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

// Initialize models
let User, Product;

// Connect to MongoDB
const connectToMongoDB = async () => {
    try {
        // Connect to User Database
        console.log('Connecting to User Database...');
        const userDB = await mongoose.createConnection(process.env.MONGO_URI_USER, {
            retryWrites: true,
            w: 'majority',
            ssl: true,
            tls: true,
            tlsAllowInvalidCertificates: true
        });
        
        // Connect to Product Database
        console.log('Connecting to Product Database...');
        const productDB = await mongoose.createConnection(process.env.MONGO_URI_PRODUCT, {
            retryWrites: true,
            w: 'majority',
            ssl: true,
            tls: true,
            tlsAllowInvalidCertificates: true
        });

        // Initialize models
        User = userDB.model('User', userSchema);
        Product = productDB.model('Product', productSchema);
        
        console.log('MongoDB connections established successfully');
        return true;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        return false;
    }
};

// API Routes
app.get('/api/products', async (req, res) => {
    try {
        if (!Product) {
            throw new Error('Product model not initialized');
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
        if (!User) {
            throw new Error('User model not initialized');
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
        if (!User) {
            throw new Error('User model not initialized');
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
const startServer = async () => {
    let currentPort = PORT;
    const maxRetries = 10;

    for (let i = 0; i < maxRetries; i++) {
        try {
            // First connect to MongoDB
            const isConnected = await connectToMongoDB();
            if (!isConnected) {
                throw new Error('Failed to connect to MongoDB');
            }

            // Then start the server
            await new Promise((resolve, reject) => {
                const server = app.listen(currentPort, () => {
                    console.log(`Server running on port ${currentPort}`);
                    resolve();
                });

                server.on('error', (error) => {
                    if (error.code === 'EADDRINUSE') {
                        console.log(`Port ${currentPort} is busy, trying ${currentPort + 1}`);
                        currentPort++;
                        server.close();
                        reject(new Error('Port in use'));
                    } else {
                        reject(error);
                    }
                });
            });
            
            // If we get here, server started successfully
            break;
        } catch (error) {
            console.error(`Attempt ${i + 1} failed:`, error.message);
            if (i === maxRetries - 1) {
                console.error('Max retries reached. Exiting...');
                process.exit(1);
            }
            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
};

// Handle process errors
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
    process.exit(1);
});

startServer();
