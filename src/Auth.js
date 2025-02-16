import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const allowedDomain = "igdtuw.ac.in"; // Set the allowed domain

const isEmailDomainValid = (email) => {
  const domain = email.split("@")[1];
  return domain === allowedDomain;
};

const registerUser = async (email, password) => {
  if (!isEmailDomainValid(email)) {
    alert("Invalid email domain. Please use your IGDTUW email.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered:", userCredential.user);
  } catch (error) {
    console.error("Error registering:", error.message);
  }
};

// Example usage:
registerUser("student@igdtuw.ac.in", "yourSecurePassword");
