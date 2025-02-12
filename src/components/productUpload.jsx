import React from 'react'
import './productUpload.css'

const ProductUpload = ({ product }) => {
    return (
        <div className='productUpload'>

            <div className="product">
                <div className="prd-desc">
                    <h2>Description</h2>

                    <div className="prd-sub-descr">
                        <h2>Product Name</h2>
                        <div className="prd-name">
                            <input type="text" placeholder='Type product name..' />
                        </div>
                        <h2>Description</h2>
                        <div className="prd-details">
                            <textarea placeholder='Type product description..'></textarea>
                        </div>
                    </div>

                </div>

                <div className="prd-img">

                    <h2>Product Image</h2>
                    <div className="prd-sub-img">
                        <img src={product.image} alt="" />
                    </div>

                </div>

                <div className="prd-category">
                    <h2>Category</h2>
                    <div className="prd-sub-catg">
                        <h2>Product Category</h2>
                        <div className="prd-inp-cat">
                            <input type="text" placeholder='Type product category..' />
                        </div>
                    </div>

                </div>

                <div className="prd-price">
                    <h2>Price</h2>

                    <div className="prd-sub-price">
                        <h2>Product Price</h2>
                        <div className="prd-inp-price">
                            <input type="number" placeholder="Enter a number" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="prd-button">
                <button className="publish">Publish</button>
                <button className="update">Update Info</button>
                <button className="list">View Listing</button>
            </div>
        </div>
    )
}

export default ProductUpload
