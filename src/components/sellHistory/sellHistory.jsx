import React from 'react';
import sellHistory from '../../data/sellHistory';
import './sellHistory.css';
// import sellHistory from '../sellHistory.js';

const SellHistory = () => (
    <div id="sell-history-container">
        {sellHistory.length === 0 ? (
            <div className="sell-history">
                <p className="heading"><i className="fa-solid fa-cart-shopping"></i>You have not made any purchases yet.</p>
                <img src="" alt="" />
                {/* <img className="empty-order" src={emptyWishlist} alt="Empty wishlist" /> */}
            </div>
        ) : (
            <div className="sell-history">
                <p className="heading"><i className="fa-solid fa-cart-shopping"></i>You have listed {sellHistory.length} item{sellHistory.length > 1 ? 's' : ''} till now.</p>
                <div id="sell-list">

                    {sellHistory.map((item) => (
                        <div key={item.product_id} className="sell-item-card">

                            {/* Product Image */}
                            <img src={item.image_url} alt={item.name} className="product-image" />

                            {/* Product Details */}
                            <div className="product-info">
                                <h3>{item.name}</h3>
                                <p><b>Price:</b> ₹{item.price}</p>
                                <p className="listed-date"><b>Listed on:</b> {item.listed_date}</p>
                            </div>

                            {/* SOLD OUT Stamp with Buyer Info */}
                            {item.status === "Sold" && (
                                <div className="stamp">
                                    <div className="sold-out-stamp">
                                        SOLD OUT
                                        {/* {item.buyer && <span className="buyer-info">🛍️ {item.buyer}</span>} */}
                                    </div>
                                </div>
                            )}
                            {item.status === "Sold" && (
                                <div className="buyer-info-hover">
                                    <h3> ✅ BUYER INFORMATION:</h3>
                                    {<span className="buyer-info"><b>Name: </b>{item.buyer}</span>}
                                    {<span className="buyer-info"><b>Bought on: </b>{item.bought_on}</span>}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        )
        }
    </div>

);

export default SellHistory;
