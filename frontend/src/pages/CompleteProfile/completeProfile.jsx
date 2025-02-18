import React from "react";
import { useState } from "react";
import "./completeProfile.css";
import { Link, useNavigate } from "react-router-dom";

const CompleteProfile = () => {
    const [userDetails, setUserDetails] = useState({
        userId: "",
        name: "",
        phoneNo: "",
        branch: "",
        graduationYear: "",
        accommodation: "",
    });
    // Progress Bar
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate(); // Redirect after success

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        const filledFields = Object.values({ ...userDetails, [name]: value }).filter(
            (field) => field.trim() !== ""
        ).length;
        const totalFields = Object.keys(userDetails).length;
        setProgress((filledFields / totalFields) * 100);
    };

    // submitting the form data
    const handleSubmit = async(e) => {
        e.preventDefault();
        await AddUser();
        // setUserDetails({...userDetails, [e.target.name]:e.target.value})
        // if (progress === 100) {
        //     alert("Profile details saved successfully!");
        //     // Redirect user or perform other actions
        // } else {
        //     alert("Please complete all fields before continuing.");
        // }
    };

    const AddUser = async () => {
        console.log(userDetails)
        const response = await fetch("https://marketplace-backend-x2xl.onrender.com/userinfo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDetails),
          });
        const data = await response.json();

        if (response.ok) {
            console.log(data.message); // Success message
            alert("Details logged successfully");
        } else {
            console.log("Failed to save profile: " + data.error);
            // alert("sdflkn")
        }
        navigate("/"); // Redirect 
    };
    

    return (
        <div id="complete-profile-container">
            <div className="profile-main-container">
                <div id="greeting">
                    <h2>Hi, Username!</h2>
                    <p>
                        To access all features, please complete your profile. You'll be able
                        to buy or list your items only when your profile is complete.
                    </p>
                </div>
                <div id="profile-container">
                    <div className="heading">Complete Profile</div>
                    <div className="progress-bar">
                        <div className="progress" style={{ width: `${progress}%` }}></div>
                    </div>

                    <form id="complete-profile-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name"> Full Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={userDetails.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email"> Email:</label>
                            <input
                                type="email"
                                name="userId"
                                id="userId"
                                value={userDetails.userId}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNo"> Phone Number:</label>
                            <input
                                type="tel"
                                name="phoneNo"
                                id="phoneNo"
                                value={userDetails.phoneNo}
                                onChange={handleChange}
                                placeholder="Enter your contact number"
                                pattern="[0-9]{10}"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="branch"> Branch:</label>
                            <select
                                name="branch"
                                id="branch"
                                value={userDetails.branch}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>
                                    Select your Branch
                                </option>
                                <option value="cse">CSE</option>
                                <option value="cse-ai">CSE-AI</option>
                                <option value="ece">ECE</option>
                                <option value="ece-ai">ECE-AI</option>
                                <option value="it">IT</option>
                                <option value="ai-ml">AI-ML</option>
                                <option value="mae">MAE/DMAM</option>
                                <option value="bba">BBA</option>
                                <option value="bca">BCA</option>
                                <option value="mca">MCA</option>
                                <option value="barch">Architecture</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="year">Graduation Year:</label>
                            <select
                                id="graduationYear"
                                name="graduationYear"
                                value={userDetails.graduationYear}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>
                                    Select your graduation year
                                </option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Accommodation Type:</label>
                            <div className="radio-group ">
                                <input
                                    type="radio"
                                    id="hostel"
                                    name="accommodation"
                                    value="hostel"
                                    checked={userDetails.accommodation === "hostel"}
                                    onChange={handleChange}
                                    required
                                />

                                <label htmlFor="hostel">Hosteller</label>
                            </div>
                            <div className="radio-group">
                                <input
                                    type="radio"
                                    id="day-scholar"
                                    name="accommodation"
                                    value="day-scholar"
                                    checked={userDetails.accommodation === "day-scholar"}
                                    onChange={handleChange}
                                    required
                                />

                                <label htmlFor="day-scholar">Day Scholar</label>
                            </div>
                            <div className="radio-group">
                                <input
                                    type="radio"
                                    id="pg"
                                    name="accommodation"
                                    value="pg"
                                    checked={userDetails.accommodation === "pg"}
                                    onChange={handleChange}
                                    required
                                />

                                <label htmlFor="pg">PG</label>
                            </div>
                        </div>
                        <div className="button">
                            <button type="submit" onClick={handleSubmit}>Save & Continue</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default CompleteProfile;