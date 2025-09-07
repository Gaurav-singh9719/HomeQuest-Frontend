import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./TenantDashboard.css";
const API = process.env.REACT_APP_API_URL;
const TenantDashboard = () => {
  const { user, token } = useAuth();
  const [properties, setProperties] = useState([]);
  const [applications, setApplications] = useState([]);

  const fetchProperties = async () => {
    try {
      const res = await fetch(`${API}/api/tenant/explore`);
      const data = await res.json();
      if (res.ok) {
        setProperties(data);
      } else {
        console.error("Fetch properties failed:", data.message);
      }
    } catch (err) {
      console.error("Fetch properties error:", err);
    }
  };


  const fetchApplications = async () => {
    try {
      const res = await fetch(`${API}/api/tenant/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setApplications(data);
      } else {
        console.error("Fetch applications failed:", data.message);
      }
    } catch (err) {
      console.error("Fetch applications error:", err);
    }
  };

  useEffect(() => {
    fetchProperties();
    fetchApplications();
  }, [fetchApplications]);

 
  const applyForProperty = async (propertyId) => {
    try {
      const res = await fetch(`${API}/api/tenant/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ propertyId }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Applied successfully ✅");
        fetchApplications();
      } else {
        alert(data.message || "Failed to apply");
      }
    } catch (err) {
      console.error("Apply error:", err);
    }
  };

  return (
    <div className="tenant-dashboard">
      <div className="dashboard-header">
        <h2>Welcome, {user?.name} 👋</h2>
       
      </div>

      {/* Explore Properties */}
      <section className="properties-section">
        <h3>Available Properties</h3>
        <div className="property-list">
          {properties.length > 0 ? (
            properties.map((p) => (
              <div className="property-card" key={p._id}>
                {p.images?.[0] && (
                  <img src={p.images[0]} alt={p.title} className="property-image" />
                )}
                <h4>{p.title}</h4>
                <p>{p.address}</p>
                <p>
                  <strong>₹{p.price.toLocaleString()}</strong>
                </p>
                <button onClick={() => applyForProperty(p._id)}>Apply</button>
              </div>
            ))
          ) : (
            <p>No properties available right now.</p>
          )}
        </div>
      </section>

      {/* My Applications */}
      <section className="applications-section">
        <h3>My Applications</h3>
        {applications.length === 0 ? (
          <p>No applications yet.</p>
        ) : (
          <ul>
            {applications.map((a) => (
              <li key={a._id}>
                {a.property?.title} - {a.property?.address} - ₹
                {a.property?.price.toLocaleString()} → 
                <strong> {a.status}</strong>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default TenantDashboard;
