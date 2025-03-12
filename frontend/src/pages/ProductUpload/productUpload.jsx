import React, { useState } from 'react';
import './productUpload.css';

const ProductUpload = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null); // For actual file upload
    const [accommodationType, setAccommodationType] = useState('');
    const [year, setYear] = useState('');
    const [condition, setCondition] = useState('');

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file); // Store the file for upload
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
        }
    };

    const handleSubmit = async () => {
        const productData = {
            name,
            category,
            accommodationType,
            year,
            condition,
            price,
            description,
            img: imagePreview // Preview URL
        };
    
        try {
            const response = await fetch("https://marketplace-backend-x2xl.onrender.com/products", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
    
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    alert('Product uploaded successfully!');
                } else {
                    alert('Failed to upload product.');
                }
            } else {
                const errorText = await response.text();
                console.error('API Error:', errorText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='productUpload'>
            <div className="product">
                {/* Product Description */}
                <div className="prd-desc">
                    <div className="prd-sub-descr">
                        <h2>Product Name</h2>
                        <div className="prd-name">
                            <input
                                type="text"
                                placeholder="Type product name.."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <h2>Description</h2>
                        <div className="prd-details">
                            <textarea
                                placeholder="Type product description.."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Product Image */}
                <div className="prd-img">
                    <h2>Upload Product Image</h2>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    {imagePreview && (
                        <div className="prd-sub-img">
                            <img src={imagePreview} alt="Product Preview" />
                        </div>
                    )}
                </div>

                {/* Product Category */}
                <div className="prd-category">
                    <div className="prd-sub-catg">
                        <h2>Product Category</h2>
                        <div className="prd-inp-cat">
                            <input
                                type="text"
                                placeholder="Type product category.."
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Accommodation Type */}
                <div className="prd-accommodation">
                    <h2>Accommodation Type</h2>
                    <div className="prd-sub-accom">
                        <input
                            type="text"
                            placeholder="Enter accommodation type.."
                            value={accommodationType}
                            onChange={(e) => setAccommodationType(e.target.value)}
                        />
                    </div>
                </div>

                {/* Year */}
                <div className="prd-year">
                    <h2>Year</h2>
                    <div className="prd-sub-year">
                        <input
                            type="text"
                            placeholder="Enter product year.."
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                    </div>
                </div>

                {/* Condition */}
                <div className="prd-condition">
                    <h2>Condition</h2>
                    <div className="prd-sub-condition">
                        <input
                            type="text"
                            placeholder="Enter product condition.."
                            value={condition}
                            onChange={(e) => setCondition(e.target.value)}
                        />
                    </div>
                </div>

                {/* Product Price */}
                <div className="prd-price">
                    <div className="prd-sub-price">
                        <h2>Product Price</h2>
                        <div className="prd-inp-price">
                            <input
                                type="number"
                                placeholder="Enter a price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="prd-button">
                <button className="publish" onClick={handleSubmit}>Publish</button>
            </div>
        </div>
    );
};

export default ProductUpload;
