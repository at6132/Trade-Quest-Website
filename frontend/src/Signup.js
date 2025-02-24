import { useState } from "react";
import axios from "axios";
import "./Signup.css";
import background from "./assets/background.jpg"; // ✅ Import background image

const Signup = () => {
  const [formData, setFormData] = useState({ full_name: "", email: "", age: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://tradequestbackend.up.railway.app/signup",  // ✅ Updated API URL
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.detail || "Signup failed.");
    }
  };

  return (
    <div className="signup-container" style={{ backgroundImage: `url(${background})` }}>
      <div className="signup-content">
        <h2>Exclusive Launch Competition</h2>
        <p>Be part of an exclusive trading competition on launch day!  
           Only the first 1,000 signups will qualify.</p>
        <form onSubmit={handleSubmit} className="signup-form">
          <input type="text" name="full_name" placeholder="Full Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
          <button type="submit" className="yellow-button">Sign Up</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Signup;
