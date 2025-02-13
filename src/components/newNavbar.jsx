import React from "react";
import "./newNavbar.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import marketplaceLogo2 from "../assets/retailer.png";

const NewNavbar = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);  // ✅ Sign out from Firebase
            setIsAuthenticated(false);  // ✅ Reset authentication state
            navigate("/");  // ✅ Redirect to home page
        } catch (err) {
            console.error("Logout failed:", err.message);
        }
    };

    const [isActive, setIsActive] = useState(false);

    const toggleHamburger = () => {
        setIsActive(!isActive);
    };

    // Close navbar on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (isActive) {
                setIsActive(false); // Close the navbar when scrolling
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isActive]);

    return (
        <header  >
            <nav className="navbar">
                <div className="logo">
                    <img src={marketplaceLogo2} alt="Marketplace logo" />
                    <h1>IGDTUW MARKETPLACE</h1>
                </div>
                <ul id="navbar" className={`${isActive ? "active" : ""}`} onClick={toggleHamburger}>
                    <li>
                        <Link className="a" to="/" >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="a" to="/category" >
                            Buy
                        </Link>
                    </li>
                    <li>
                        <Link className="a" to="/" >
                            Sell
                        </Link>
                    </li>
                    <li>
                        <Link className="a" to="/" >
                            Chat
                        </Link>
                    </li>
                    <li>
                        <Link className="a" to="/dashboard" >
                            Dashboard
                        </Link>
                    </li>
                </ul>
                <button className="logout" onClick={handleLogout} >Logout</button>
                <div className={`hamburger ${isActive ? "active" : ""}`} onClick={toggleHamburger}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </nav>
        </header >
    );
};

export default NewNavbar;
