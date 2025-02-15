const sellHistory = [
  {
    product_id: "PROD101",
    name: "Eco-Friendly T-Shirt",
    price: 499.99,
    image_url: "https://img.etimg.com/photo/msid-102008460,imgsize-60108/BambalioBL-991MSScientificCalculator.jpg",
    listed_date: "2024-09-15",
    status: "Available", // or "Sold"
    buyer: null, // If sold, set buyer name
    bought_on: "2024-12-01", // If sold, set date
  },
  {
    product_id: "PROD102",
    name: "Reusable Water Bottle",
    price: 799.99,
    image_url: "https://img.etimg.com/photo/msid-102008460,imgsize-60108/BambalioBL-991MSScientificCalculator.jpg",
    listed_date: "2024-08-30",
    status: "Sold",
    buyer: "Aman Sharma", // Name of the buyer
    bought_on: "2024-12-01",
  },
  {
    product_id: "PROD103",
    name: "Bamboo Toothbrush Set",
    price: 299.50,
    image_url: "https://img.etimg.com/photo/msid-102008460,imgsize-60108/BambalioBL-991MSScientificCalculator.jpg",
    listed_date: "2024-09-10",
    status: "Available",
    buyer: null,
    bought_on: "2024-12-01",
  }
];

export default sellHistory;
