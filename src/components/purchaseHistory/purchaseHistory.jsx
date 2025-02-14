import React from 'react';
import purchaseHistory from '../../data/purchaseHistory';
import './purchaseHistory.css';
import emptyPurchase from "../../assets/Shopping-bag.gif";

const PurchaseHistory = () => (
    <div id="purchase-history-container">
        {purchaseHistory.length === 0 ? (
            <div className="purchase-history">
                <p className="heading"><i className="fa-solid fa-cart-shopping"></i>You have not made any purchases yet.</p>
                <img className="no-buy" src={emptyPurchase} alt="Loading" />
                {/* <img className="empty-order" src={emptyWishlist} alt="Empty wishlist" /> */}
            </div>
        ) : (
            <div className="purchase-history">
                <p className="heading"><i className="fa-solid fa-cart-shopping"></i>You have ordered {purchaseHistory.length} item{purchaseHistory.length > 1 ? 's' : ''} till now.</p>
                <div id="purchase-list">
                    {purchaseHistory.map((item) => (
                        <div key={item.item_id} className="purchase-item-card">

                            <div className="order-details">
                                <div className="orderInfo">
                                    <p className="order-info-heading">Order ID</p>
                                    <p className="order-info-details">{item.order_id}</p>
                                </div>
                                <div className="orderInfo">
                                    <p className="order-info-heading">Order Date</p>
                                    <p className="order-info-details">{item.order_date}</p>
                                </div>
                                <div className="orderInfo">
                                    <p className="order-info-heading">Amount</p>
                                    <p className="order-info-details">{item.price}</p>
                                </div>
                                <div className="orderInfo">
                                    <p className="order-info-heading">Seller</p>
                                    <p className="order-info-details">{item.seller_name}</p>
                                </div>
                            </div>
                            <div className="order-item-details">
                                <img src={item.image_url} alt={item.name} width="80" />
                                <div className="order-description">
                                    <div className="item-name">{item.name}</div>
                                    <div className="item-description">{item.description}</div>
                                    <div className="payment-status"><i className="fa-solid fa-circle-check"></i>{item.payment_status}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
        }
    </div>

);

export default PurchaseHistory;
