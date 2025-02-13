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
app.use(cors());

// Connect to both databases
const userDB = mongoose.createConnection(process.env.MONGO_URI_USER, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const productDB = mongoose.createConnection(process.env.MONGO_URI_PRODUCT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

userDB.on('open', () => console.log('Connected to User Database'));
userDB.on('error', (err) => console.error('User DB Connection Error:', err));

productDB.on('open', () => console.log('Connected to Product Database'));
productDB.on('error', (err) => console.error('Product DB Connection Error:', err));

// User Schema and Model
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});
const User = userDB.model('User', userSchema);

// Product Schema and Model
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
const Product = productDB.model('Product', productSchema);

// Products API endpoint
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Signup route
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Login route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Root route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
