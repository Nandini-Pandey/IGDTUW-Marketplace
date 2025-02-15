import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NewNavbar from '../../components/newNavbar/newNavbar';
import './ProductPage.css';

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(`/api/products/${id}`);
                
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

    if (error) {
        return (
            <div>
                <NewNavbar />
                <div className="error-container">
                    <h2>Error: {error}</h2>
                    <button onClick={() => navigate(-1)}>Go Back</button>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div>
                <NewNavbar />
                <div className="not-found-container">
                    <h2>Product not found</h2>
                    <button onClick={() => navigate(-1)}>Go Back</button>
                </div>
            </div>
        );
    }

    return (
        <div className="product-page">
            <NewNavbar />
            <div className="product-container">
                <div className="product-image-section">
                    <img src={product.img} alt={product.name} className="product-main-image" />
                </div>
                <div className="product-details-section">
                    <h1 className="product-name">{product.name}</h1>
                    <div className="product-meta">
                        <p className="product-category">Category: {product.category}</p>
                        <p className="product-accommodation">For: {product.accommodationType}</p>
                        <p className="product-year">Year: {product.year}</p>
                        <p className="product-condition">Condition: {product.condition}</p>
                    </div>
                    <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
                    <p className="product-description">{product.description}</p>
                    <div className="action-buttons">
                        <button className="purchase-button" onClick={() => alert('Purchase functionality coming soon!')}>
                            Purchase Now
                        </button>
                        <button className="contact-seller-button" onClick={() => alert('Contact functionality coming soon!')}>
                            Contact Seller
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
