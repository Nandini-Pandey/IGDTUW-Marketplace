import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NewNavbar from "../../components/newNavbar/newNavbar";
import "./ProductDetail.css";

const names = ["Aadya", "Siya", "Ishita", "Kavya", "Ananya", "Meera", "Sanya"];
const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const API_URL = import.meta.env.DEV ? 'https://marketplace-backend-x2xl.onrender.com' : '';
        const response = await fetch(`${API_URL}/products/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div>
        <NewNavbar />
        <div className="loading-container">
          <h2>Loading product details...</h2>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div>
        <NewNavbar />
        <div className="error-container">
          <h2>{error || 'Product not found!'}</h2>
          <button onClick={() => navigate(-1)} className="back-button">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Generate random seller info
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomYear = years[Math.floor(Math.random() * years.length)];

  return (
    <div className="product-details-section">
      <NewNavbar />
      <div className="product-detail__container">
        <div className="product-detail__image">
          <img src={product.img} alt={product.name} />
        </div>

        <div className="product-detail__info">
          <h1>{product.name}</h1>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Accommodation Type:</strong> {product.accommodationType}</p>
          <p><strong>Year:</strong> {product.year}</p>
          <p><strong>Condition:</strong> {product.condition}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p className="product-detail__price">
            <strong>Price:</strong> ₹{product.price.toLocaleString("en-IN")}
          </p>

          <div className="product-detail__seller">
            <h3>Seller Information</h3>
            <p><strong>Name:</strong> {randomName}</p>
            <p><strong>Year:</strong> {randomYear}</p>
          </div>

          <div className="product-detail__actions">
            <button className="product-detail__contact">Contact Seller</button>
            <button className="product-detail__wishlist">Add to Wishlist</button>
            <button onClick={() => navigate(-1)} className="product-detail__back">
              Back to Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;