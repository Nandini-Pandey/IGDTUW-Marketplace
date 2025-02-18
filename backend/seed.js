// require('dotenv').config(); // Load .env file
// const mongoose = require('mongoose');

// const mongoOptions = {
//     retryWrites: true,
//     w: 'majority',
//     ssl: true,
//     tls: true,
//     tlsAllowInvalidCertificates: true,
//     dbName: 'UserDetails'
// };

// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     category: { type: String, required: true },
//     accommodationType: { type: String, required: true },
//     year: { type: String, required: true },
//     condition: { type: String, required: true },
//     price: { type: Number, required: true },
//     description: { type: String, required: true },
//     img: { type: String, required: true }
// });

// const products = [
//     {
//         name: "Data Structures Book",
//         category: "Books",
//         accommodationType: "Hosteller",
//         year: "2024",
//         condition: "Second Hand",
//         price: 299,
//         description: "Comprehensive guide to Data Structures and Algorithms",
//         img: "https://m.media-amazon.com/ima    s/I/81ZnMSwkQwL._UF1000,1000_QL80_.jpg"
//     },
//     {
//         name: "Digital Multimeter",
//         category: "Lab Equipment",
//         accommodationType: "Day Scholar",
//         year: "2023",
//         condition: "New",
//         price: 1499,
//         description: "Professional grade digital multimeter for electronics lab",
//         img: "https://m.media-amazon.com/images/I/81ma9HatWsL.jpg"
//     },
//     {
//         name: "Arduino Kit",
//         category: "Electronics",
//         accommodationType: "Hosteller",
//         year: "2024",
//         condition: "New",
//         price: 2499,
//         description: "Complete Arduino starter kit with components",
//         img: "https://m.media-amazon.com/images/I/81uKTWZI4IL._AC_UF1000,1000_QL80_.jpg"
//     },
//     {
//         name: "Machine Learning Notes",
//         category: "Notes",
//         accommodationType: "Day Scholar",
//         year: "2025",
//         condition: "New",
//         price: 199,
//         description: "Detailed notes for Machine Learning course",
//         img: "https://bigblue.academy/images/image/blog/what-is-machine-learning-2023-beginners-guide/1-3cxboknql4qs-lryht3pqw.jpg"
//     },
//     {
//         name: "Cooler",
//         category: "Hostel Supplies",
//         accommodationType: "Hosteller",
//         year: "2024",
//         condition: "New",
//         price: 3999,
//         description: "Cooler for hostel room",
//         img: "https://rukminim2.flixcart.com/image/850/1000/k6pd7680/air-cooler/d/h/y/siesta-xl-symphony-original-imafp3wfhh2fg5jf.jpeg?q=90&crop=false"
//     },
//     {
//         name: "IoT Project Kit",
//         category: "Projects",
//         accommodationType: "Day Scholar",
//         year: "2025",
//         condition: "New",
//         price: 3499,
//         description: "IoT project kit with sensors and modules",
//         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmdJdZDLZpR2izyTy2Va-YABbEJDSvmCssJQ&s"
//     },
//     {
//         name: "Study Table Lamp",
//         category: "Hostel Supplies",
//         accommodationType: "Hosteller",
//         year: "2025",
//         condition: "New",
//         price: 700,
//         description: "Study table lamp with adjustable light",
//         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa2JfxzNf0Nckq2FjqCQZmIvUXzE2sVBUIpg&s"
//     },
//     {
//         name: "Graphic Calculator",
//         category: "Electronics",
//         accommodationType: "Day Scholar",
//         year: "2024",
//         condition: "Second Hand",
//         price: 1800,
//         description: "Advanced graphic calculator for engineering students",
//         img: "https://m.media-amazon.com/images/I/71v7Qk3EDsL._AC_UF1000,1000_QL80_.jpg"
//     },
//     {
//         name: "Bullet Journal",
//         category: "Stationery",
//         accommodationType: "Hosteller",
//         year: "2025",
//         condition: "New",
//         price: 300,
//         description: "Dotted bullet journal for organizing notes and tasks",
//         img: "https://images.ctfassets.net/lzny33ho1g45/2spaZ0iJ3O8Ug80ZRnBwJE/bc30f59456d8cd74cf9ae2767f8beb31/bullet-journal-ideas-image6.png?w=1400"
//     },
//     {
//         name: "Wireless Mouse",
//         category: "Electronics",
//         accommodationType: "Day Scholar",
//         year: "2024",
//         condition: "New",
//         price: 900,
//         description: "Ergonomic wireless mouse with long battery life",
//         img: "https://m.media-amazon.com/images/I/61OwbbvdJqL.jpg"
//     },
//     {
//         name: "Floor Mat",
//         category: "Hostel Supplies",
//         accommodationType: "Hosteller",
//         year: "2023",
//         condition: "Second Hand",
//         price: 500,
//         description: "Soft, durable floor mat for hostel rooms",
//         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnM89mGqDY8kaEuLcn7yo2Lw4Kb2kYNa1CBQ&s"
//     },
//     {
//         name: "Physics Textbook",
//         category: "Books",
//         accommodationType: "Day Scholar",
//         year: "2025",
//         condition: "New",
//         price: 650,
//         description: "Comprehensive physics textbook for engineering courses",
//         img: "https://m.media-amazon.com/images/I/71zIDc0j0OL.jpg"
//     },
//     {
//         name: "Noise-Cancelling Headphones",
//         category: "Electronics",
//         accommodationType: "Hosteller",
//         year: "2024",
//         condition: "New",
//         price: 3200,
//         description: "Over-ear noise-cancelling headphones for focused study sessions",
//         img: "https://m.media-amazon.com/images/I/51EXj4BRQaL.jpg"
//     },
//     {
//         name: "Whiteboard & Markers",
//         category: "Stationery",
//         accommodationType: "Day Scholar",
//         year: "2025",
//         condition: "New",
//         price: 750,
//         description: "Portable whiteboard with markers for study sessions",
//         img: "https://5.imimg.com/data5/IL/WB/MY-25864817/whiteboard-with-duster-and-marker-500x500.jpg"
//     },
//     {
//         name: "Portable Hard Drive",
//         category: "Electronics",
//         accommodationType: "Day Scholar",
//         year: "2023",
//         condition: "Second Hand",
//         price: 2500,
//         description: "1TB portable hard drive for data storage",
//         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYQMIWYiZLd7E1_Vzpwf6UC_juEGiZ0y27eg&s"
//     },
//     {
//         name: "Desk Organizer",
//         category: "Stationery",
//         accommodationType: "Hosteller",
//         year: "2024",
//         condition: "New",
//         price: 450,
//         description: "Multi-compartment desk organizer for stationery and supplies",
//         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNRH9BmrFslYa0urN5yabt0Rfe8cI09cGT-w&s"
//     },
//     {
//         name: "Electric Kettle",
//         category: "Hostel Supplies",
//         accommodationType: "Hosteller",
//         year: "2025",
//         condition: "New",
//         price: 1100,
//         description: "1.5L electric kettle for hostel use",
//         img: "https://m.media-amazon.com/images/I/51Q11RNy8dL._AC_UF894,1000_QL80_.jpg"
//     },
//     {
//         name: "Laptop Backpack",
//         category: "Accessories",
//         accommodationType: "Day Scholar",
//         year: "2024",
//         condition: "New",
//         price: 1300,
//         description: "Water-resistant laptop backpack with multiple compartments",
//         img: "https://safaribags.com/cdn/shop/files/3_cc1902b1-49f1-4e2f-b70b-e6666a480dff.jpg?v=1688114256"
//     },
//     {
//         name: "Scientific Calculator",
//         category: "Electronics",
//         accommodationType: "Day Scholar",
//         year: "2023",
//         condition: "Second Hand",
//         price: 950,
//         description: "Advanced scientific calculator with programmable functions",
//         img: "https://m.media-amazon.com/images/I/61ql7EF+icL.jpg"
//     },
//     {
//         name: "Portable Fan",
//         category: "Hostel Supplies",
//         accommodationType: "Hosteller",
//         year: "2025",
//         condition: "New",
//         price: 1600,
//         description: "Rechargeable portable fan for hostel rooms",
//         img: "https://m.media-amazon.com/images/I/71y12jnPrDL.jpg"
//     },
//     {
//         name: "Engineering Drawing Kit",
//         category: "Lab Equipment",
//         accommodationType: "Day Scholar",
//         year: "2024",
//         condition: "New",
//         price: 850,
//         description: "Complete engineering drawing kit with tools",
//         img: "https://isomarsshop.in/cdn/shop/products/414zQF71b6L_600x.jpg?v=1539771341"
//     },
//     {
//         name: "Portable Power Bank",
//         category: "Electronics",
//         accommodationType: "Day Scholar",
//         year: "2023",
//         condition: "New",
//         price: 1200,
//         description: "10,000mAh portable power bank with fast charging",
//         img: "https://rukminim2.flixcart.com/image/850/1000/johi3680/power-bank/6/h/n/battery-pack-eb-p1100bpngin-samsung-original-imafawtybtc9zhvf.jpeg?q=90&crop=false"
//     },
//     {
//         name: "Mechanical Keyboard",
//         category: "Electronics",
//         accommodationType: "Day Scholar",
//         year: "2024",
//         condition: "New",
//         price: 2700,
//         description: "RGB mechanical keyboard with tactile feedback",
//         img: "https://m.media-amazon.com/images/I/71LBvbVa95L._AC_UF1000,1000_QL80_.jpg"
//     },
//     {
//         name: "Stainless Steel Water Bottle",
//         category: "Accessories",
//         accommodationType: "Hosteller",
//         year: "2025",
//         condition: "New",
//         price: 550,
//         description: "Insulated stainless steel water bottle, 1L capacity",
//         img: "https://m.media-amazon.com/images/I/71wFyZlg58L.jpg"
//     },
//     {
//         name: "Laptop Cooling Pad",
//         category: "Electronics",
//         accommodationType: "Day Scholar",
//         year: "2023",
//         condition: "New",
//         price: 1400,
//         description: "Laptop cooling pad with adjustable fan speeds",
//         img: "https://m.media-amazon.com/images/I/71Twp6t8SvL.jpg"
//     },
//     {
//         name: "Table Clock with Alarm",
//         category: "Hostel Supplies",
//         accommodationType: "Hosteller",
//         year: "2024",
//         condition: "New",
//         price: 350,
//         description: "Compact table clock with alarm and backlight",
//         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZs67ciWe6VJAVFKm_Z81S0IJKNZLofeJmmg&s"
//     },
//     {
//         name: "Electronics Lab Kit",
//         category: "Lab Equipment",
//         accommodationType: "Day Scholar",
//         year: "2025",
//         condition: "New",
//         price: 3200,
//         description: "Comprehensive electronics lab kit with components",
//         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgC7jgw20G2SJtVR0D_2bEWqiQP1EXbcAGfw&s"
//     }
// ];

// const seedDatabase = async () => {
//     let connection;
//     try {
//         console.log('Starting database seeding');
        
//         connection = await mongoose.connect(process.env.MONGO_URI, mongoOptions);
//         // console.log('Connected to MongoDB:', connection.connection.name);
//         console.log('Connection state:', mongoose.connection.readyState);

//         const Product = mongoose.model('Product', productSchema);

//         // Clear existing products
//         const deleteResult = await Product.deleteMany({});

//         // Insert new products
//         const insertResult = await Product.insertMany(products);

//         // Verify the insertion
//         const count = await Product.countDocuments();
//         console.log('Total products in database:', count);
        
//         // Log a sample product
//         const sampleProduct = await Product.findOne();

//         console.log('Database seeded successfully!');
//     } catch (error) {
//         console.error('Error seeding database:', error);
//         console.error('Error details:', {
//             name: error.name,
//             message: error.message,
//             stack: error.stack,
//             mongoState: mongoose.connection ? mongoose.connection.readyState : 'No connection'
//         });
//     } finally {
//         // if (connection) {
//             await connection.disconnect();
//             console.log('Disconnected from MongoDB');
//         }
//         process.exit(0);
//     }
// };

// console.log('Starting database seeding...');
// seedDatabase();