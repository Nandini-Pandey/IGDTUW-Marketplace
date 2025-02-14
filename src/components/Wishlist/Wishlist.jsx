// src/components/Wishlist.js

import React, { useState } from 'react';
import wishlistData from '../../data/wishlistData';
import './Wishlist.css';
import emptyWishlist from "../../assets/Empty-bro.png";



function Wishlist() {
    const [wishlist, setWishlist] = useState(wishlistData);

    const removeFromWishlist = (itemId) => {
        setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== itemId));
    };

    return (
        <div id="wishlist-container">
            {wishlist.length === 0 ? (
                <div className="wishlist">
                    <p className="heading"><i className="fa-regular fa-heart"></i>Your wishlist is empty.</p>
                    <img className="empty-cart" src={emptyWishlist} alt="Empty wishlist" />
                </div>
            ) : (
                <div className="wishlist">
                    <p className="heading"><i className="fa-regular fa-heart"></i>You have {wishlist.length} item{wishlist.length > 1 ? 's' : ''} in your wishlist.</p>
                    <div id="wishlist-list">
                        {wishlist.map((item) => (
                            <div className="wishlist-item" key={item.id} >
                                <img src={item.image} alt={item.name} />

                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p>Price: ${item.price.toFixed(2)}</p>
                                    <p>{item.description}</p>
                                    <button onClick={() => removeFromWishlist(item.id)}>Remove</button>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            )
            }
        </div >
    );
}

export default Wishlist;
