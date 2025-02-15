import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebaseConfig";
import { setDoc, doc } from "firebase/firestore"; // Firestore functions
import "./completeProfile.css";

const CompleteProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    branch: "",
    year: "",
    accommodation: "",
  });
  const [progress, setProgress] = useState(0); // Progress Bar
  const navigate = useNavigate(); // To navigate after saving the profile

  // Redirect to SignIn if the user is not logged in
  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/signin");
    } else {
      setFormData((prevData) => ({
        ...prevData,
        email: auth.currentUser.email, // Pre-fill the email
      }));
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    const filledFields = Object.values({ ...formData, [name]: value }).filter(
      (field) => field.trim() !== ""
    ).length;
    const totalFields = Object.keys(formData).length;
    setProgress((filledFields / totalFields) * 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (progress === 100) {
      try {
        // Save profile details to Firestore under user's UID
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          ...formData,
          profileComplete: true, // Mark profile as complete
        });

        alert("Profile details saved successfully!");
        navigate("/dashboard"); // Redirect after successful profile completion
      } catch (err) {
        console.error("Error saving profile:", err);
        alert("Error saving profile, please try again.");
      }
    } else {
      alert("Please complete all fields before continuing.");
    }
  };

  return (
    <div id="complete-profile-container">
      <div className="profile-main-container">
        <div id="greeting">
          <h2>Hi, {auth.currentUser?.displayName || "User"}!</h2>
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
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email"> Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                disabled // Email is fetched from Firebase and cannot be changed
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact"> Phone Number:</label>
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
            </div>

            <div className="form-group">
              <label htmlFor="branch"> Branch:</label>
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
            </div>

            <div className="form-group">
              <label htmlFor="year">Year of Study:</label>
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
            </div>

            <div className="form-group">
              <label>Accommodation Type:</label>
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
            <div className="button">
              <button type="submit">Save & Continue</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
