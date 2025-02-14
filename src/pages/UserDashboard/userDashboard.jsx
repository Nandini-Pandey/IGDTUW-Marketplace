import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import "./userDashboard.css";
import Profile from "../../components/Profile/Profile";
import WishList from "../../components/Wishlist/Wishlist";
import PurchaseHistory from "../../components/purchaseHistory/purchaseHistory";
import SellHistory from "../../components/sellHistory/sellHistory";

const UserDashboard = () => {
    // Load the section from localStorage or default to "profile"
    const [currentSection, setCurrentSection] = useState(
        localStorage.getItem("dashboardSection") || "profile"
    );
    const [isOpened, setIsOpen] = useState(false);

    const toggleDashboardNav = () => {
        setIsOpen(!isOpened);
    };

    // When currentSection changes, update localStorage
    useEffect(() => {
        localStorage.setItem("dashboardSection", currentSection);
    }, [currentSection]);


    //DashboardContent is a component that will render the content of the dashboard based on the currentSection state.
    const DashboardContent = () => {
        switch (currentSection) {
            case "profile":
                return <Profile />;
            case "purchase history":
                return <PurchaseHistory />;
            case "sell history":
                return <SellHistory />;
            case "wishlist":
                return <WishList />;
            default:
                return <Profile />;
        }
    };

    //function to capitalize the first letter of a string ie the current section heading
    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    return (
        <div id="dashboard">
            <div className="dashboard-container">
                <div id="sidebar-section" className={`${isOpened ? "opened" : ""}`} onClick={toggleDashboardNav}><Sidebar setCurrentSection={setCurrentSection} /></div>
                <div className="dashboard-section">
                    <h1 className="section-heading">{capitalize(currentSection)}</h1>
                    {DashboardContent()}

                </div>
            </div>
            {/* <div className={`account-hamburger ${isOpened ? "opened" : ""}`} onClick={toggleDashboardNav}>
                <div className="hamburger-container">
                    <div className="bars"></div>
                    <div className="bars"></div>
                    <div className="bars"></div>
                </div>
                <div className="account-dashboard">Account Settings</div>
            </div> */}
            <div className="account-hamburger" onClick={toggleDashboardNav}>
                <div className="hamburger-container">
                    <div className="bars"></div>
                    <div className="bars"></div>
                    <div className="bars"></div>
                </div>
                <div className="account-dashboard">Account Settings</div>
            </div>
        </div>
    );

}

export default UserDashboard;
