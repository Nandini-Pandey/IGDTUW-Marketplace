import React from "react";
import "./newNavbar.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import marketplaceLogo2 from "../../assets/retailer.png";

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

    const [isActiveOpen, setIsActiveOpen] = useState(false);

    const toggleHamburger = () => {
        setIsActiveOpen(!isActiveOpen);
    };

    //Close navbar on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (isActiveOpen) {
                setIsActiveOpen(false); // Close the navbar when scrolling
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isActiveOpen]);



    return (
        <header  >
            <nav className="navbar">
                <div className="logo">
                    <img src={marketplaceLogo2} alt="Marketplace logo" />
                    <h1>IGDTUW MARKETPLACE</h1>
                </div>
                <ul id="navbar" className={`${isActiveOpen ? "active" : ""}`} onClick={toggleHamburger}>
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
                        <Link className="a" to="/product-upload" >
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
                    <li><button className="logout" onClick={handleLogout} >Logout</button></li>
                </ul>
                
                <div className={`hamburger ${isActiveOpen ? "active" : ""}`} onClick={toggleHamburger}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </nav>
        </header >
    );
};

export default NewNavbar;
