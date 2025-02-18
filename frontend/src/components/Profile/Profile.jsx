import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        userId: "",
        name: "",
        phoneNo: "",
        branch: "",
        graduationYear: "",
        accommodation: "",
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) {
                    console.error("User not logged in");
                    return;
                }

                const response = await fetch(`https://marketplace-backend-x2xl.onrender.com/userinfo?userId=${userId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        window.location.reload(); // Reload to reset changes
    };

    const handleSave = async () => {
        try {
            const response = await fetch("https://marketplace-backend-x2xl.onrender.com/userinfo", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Error updating profile: ${response.status}`);
            }

            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    };

    return (
        <div id="dashboard-profile-container">
            <h1 className="heading"><i className="fa-solid fa-circle-info"></i> Basic Info</h1>
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
                    <label htmlFor="userId"> Email:</label>
                    <p>{formData.userId}</p> {/* Email is not editable */}
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNo"> Phone Number:</label>
                    {isEditing ? (
                        <input
                            type="tel"
                            name="phoneNo"
                            id="phoneNo"
                            value={formData.phoneNo}
                            onChange={handleChange}
                            placeholder="Enter your contact number"
                            pattern="[0-9]{10}"
                            required
                        />
                    ) : (
                        <p>{formData.phoneNo}</p>
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
                            <option value="" disabled>Select your Branch</option>
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
                    ) : (
                        <p>{formData.branch.toUpperCase()}</p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="graduationYear">Graduation Year:</label>
                    {isEditing ? (
                        <select
                            id="graduationYear"
                            name="graduationYear"
                            value={formData.graduationYear}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select your graduation year</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                        </select>
                    ) : (
                        <p>{formData.graduationYear}</p>
                    )}
                </div>

                <div className="form-group">
                    <label>Accommodation Type:</label>
                    {isEditing ? (
                        <div>
                            <div className="radio-group">
                                <input
                                    type="radio"
                                    id="hostel"
                                    name="accommodation"
                                    value="hostel"
                                    checked={formData.accommodation === "hostel"}
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
                                    checked={formData.accommodation === "day-scholar"}
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
                                    checked={formData.accommodation === "pg"}
                                    onChange={handleChange}
                                    required
                                />

                                <label htmlFor="pg">PG</label>
                            </div>
                        </div>
                    ) : (
                        <p>{formData.accommodation === "hostel" ? "Hosteller" : "Day Scholar"}</p>
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
                    <button onClick={handleEdit}>Edit Profile</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
