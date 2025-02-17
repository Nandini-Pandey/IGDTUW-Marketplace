require('dotenv').config(); // Load .env file;

//user database
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const express= require('express');
const app= express();
const mongoose= require('mongoose');
const jwt= require('jsonwebtoken');
//multer?

const path= require('path')
// const cors= require('cors')

app.use(express.json());
const cors = require('cors');
app.use(cors());


app.use(express.urlencoded({extended: true}))
console.log("khfkh:", MONGO_URI);
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

app.get("/", (req,res)=>{
    res.send("Is running")
})
app.listen(PORT, (error)=>{
    if(!error){
        console.log("no error wooooooooo");
    }
})

//schema: user 
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

app.post('/userinfo', async (req, res) => {
      console.log("Received user details:", req.body); 
      const user = new User({
          userId: req.body.userId,
          name: req.body.name,
          phoneNo: req.body.phoneNo,
          graduationYear: req.body.graduationYear,
          branch: req.body.branch,
          accommodation: req.body.accommodation,
      });

      await user.save();
      console.log("User saved:", user);

      res.json({
          success: true,
          name: req.body.name,
      });
    
});

app.get('/userinfo', async (req, res) => {
  try {
      const { userId } = req.query; // Get userId from query parameters
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
