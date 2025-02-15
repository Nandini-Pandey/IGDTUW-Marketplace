import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "Preetika Agrawal",
        email: "johndoe@example.com",
        contact: "9876543210",
        branch: "cse",
        year: "2",
        accommodation: "hosteller",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //toggleEdit : save changes, cancel , edit button
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        // Call API to save the updated profile
        console.log("Profile saved:", formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        // Revert changes if necessary (fetch original data from backend)
        setIsEditing(false);
    };

    return (
        <div id="dashboard-profile-container">
            <h1 className="heading"><i className="fa-solid fa-circle-info fa-rotate-by" ></i>Basic Info</h1>
            <form id="view-profile-form" className="dashboard-profile">
                <div className="form-group">
                    <label htmlFor="name"> Full Name:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />
                    ) : (
                        <p>{formData.name}</p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="email"> Email:</label>
                    {isEditing ? (
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    ) : (
                        <p>{formData.email}</p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="contact"> Phone Number:</label>
                    {isEditing ? (
                        <input
                            type="tel"
                            name="contact"
                            id="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            placeholder="Enter your contact number"
                            pattern="[0-9]{10}"
                            required
                        />
                    ) : (
                        <p>{formData.contact}</p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="branch"> Branch:</label>
                    {isEditing ? (
                        <select
                            name="branch"
                            id="branch"
                            value={formData.branch}
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
                            <option value="mae-dmam">MAE/DMAM</option>
                            <option value="architecture">Architecture</option>
                        </select>
                    ) : (
                        <p>{formData.branch}</p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="year">Year of Study:</label>
                    {isEditing ? (
                        <select
                            id="year"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>
                                Select your year
                            </option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                            <option value="5">5th Year</option>
                        </select>
                    ) : (
                        <p>{formData.year} Year</p>
                    )}
                </div>

                <div className="form-group">
                    <label>Accommodation Type:</label>
                    {isEditing ? (
                        <div>
                            <div className="radio-group ">
                                <input
                                    type="radio"
                                    id="hosteller"
                                    name="accommodation"
                                    value="hosteller"
                                    checked={formData.accommodation === "hosteller"}
                                    onChange={handleChange}
                                    required
                                />

                                <label htmlFor="hosteller">Hosteller</label>
                            </div>
                            <div className="radio-group">
                                <input
                                    type="radio"
                                    id="day-scholar"
                                    name="accommodation"
                                    value="day-scholar"
                                    checked={formData.accommodation === "day-scholar"}
                                    onChange={handleChange}
                                    required
                                />

                                <label htmlFor="day-scholar">Day Scholar</label>
                            </div>
                        </div>
                    ) : (
                        <p>{formData.accommodation === "hosteller" ? "Hosteller" : "Day Scholar"}</p>
                    )}
                </div>
            </form>
            {isEditing ? (
                <div className="button-group">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            ) : (
                <div className="button-group">
                    <button onClick={toggleEdit}>Edit Profile</button>
                </div>

            )}
        </div>
    );
};

export default Profile;
