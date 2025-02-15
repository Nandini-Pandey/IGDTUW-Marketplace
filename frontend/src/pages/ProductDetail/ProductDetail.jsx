import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../../data/products";
import NewNavbar from "../../components/newNavbar/newNavbar";
import "./ProductDetail.css";

const names = ["Aadya", "Siya", "Ishita", "Kavya", "Ananya", "Meera", "Sanya"];
const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return <h2>Product not found!</h2>;
  }

  // Generate random seller info
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomYear = years[Math.floor(Math.random() * years.length)];

  return (
    <div>
      <NewNavbar />

      <div className="product-detail__container">
        <div className="product-detail__image">
          <img src={product.img} alt={product.name} />
        </div>

        <div className="product-detail__info">
          <h1>{product.name}</h1>
          <p><strong>Condition:</strong> {product.condition}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> ₹{product.price.toLocaleString("en-IN")}</p>

          <div className="product-detail__seller">
            <h3>Seller Information</h3>
            <p><strong>Name:</strong> {randomName}</p>
            <p><strong>Year:</strong> {randomYear}</p>
          </div>

          <div className="product-detail__actions">
            <button className="product-detail__contact">Contact Seller</button>
            <button className="product-detail__wishlist">Add to Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
