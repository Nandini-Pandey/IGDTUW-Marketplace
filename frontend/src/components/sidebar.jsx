import React, { useState } from "react";
import userImage from "../assets/profile-image.png";
const Sidebar = ({ setCurrentSection }) => {
    const [isOpened, setIsOpened] = useState(false);

    const toggleBackground = () => {
        setIsOpened(!isOpened);
    };

    return (
        <div className="sidebar">
            <div className="about">
                <div className="user-profile-image">
                    <img src={userImage} height="100px" alt="Profile" />
                </div>
            </div>
            <div className="dashboard-links">
                <div>DASHBOARD</div>
                <ul className="sidebar-list">
                    <li
                        className={isOpened ? "dashboard-link-active" : ""}
                        onClick={() => {
                            setCurrentSection("profile");
                            localStorage.setItem("dashboardSection", "profile"); // Store selection
                        }}
                    >
                        <i className="fa-regular fa-user"></i> Profile
                    </li>
                    <li
                        onClick={() => {
                            setCurrentSection("purchase history");
                            localStorage.setItem("dashboardSection", "purchase history");
                        }}
                    >
                        <i className="fa fa-shopping-cart"></i> Purchase History
                    </li>
                    <li
                        onClick={() => {
                            setCurrentSection("sell history");
                            localStorage.setItem("dashboardSection", "sell history");
                        }}
                    >
                        <i className="fa fa-chart-line"></i> Sell History
                    </li>
                    <li
                        onClick={() => {
                            setCurrentSection("wishlist");
                            localStorage.setItem("dashboardSection", "wishlist");
                        }}
                    >
                        <i className="fa-regular fa-heart"></i> WishList
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
