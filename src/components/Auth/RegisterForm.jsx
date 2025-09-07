import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./RegisterForm.css";

const RegisterForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("tenant");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await register({ name, email, password, role });

    if (!result.success) {
      setError(result.message);
      return;
    }

    // ✅ Show success message
    alert("🎉 Registration successful! Please login to continue.");

    // ✅ Redirect to login page
    navigate("/auth");
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Register</h2>

      {error && <p className="error">{error}</p>}

      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <label>Role:</label>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="tenant">Tenant</option>
        <option value="owner">Owner</option>
      </select>

      <button type="submit" className="btn">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
