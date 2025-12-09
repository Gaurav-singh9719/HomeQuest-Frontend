import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./TenantDashboard.css";

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const TenantDashboard = () => {
  const { user, token } = useAuth();
  const [properties, setProperties] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
    fetchApplications();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await fetch(`${API}/api/tenant/explore`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setProperties(data);
    } catch (err) {
      console.error("Fetch properties error:", err);
    }
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/tenant/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setApplications(data);
    } catch (err) {
      console.error("Fetch applications error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ ORIGINAL WORKING APPLY FUNCTION - NO CHANGES!
  const applyForProperty = (propertyId) => {
    fetch(`${API}/api/tenant/apply`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ propertyId }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.message === 'Applied successfully') {
        alert('✅ Application sent successfully!');
        fetchApplications(); // Refresh list
      } else {
        alert('❌ ' + (data.message || 'Server error'));
      }
    })
    .catch(err => {
      console.error(err);
      alert('❌ Server error');
    });
  };

  const isApplied = (propertyId) => {
    return applications.some(app => app.property?._id === propertyId);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="tenant-dashboard">
      <div className="container">
        <h1>Welcome, {user?.name}!</h1>
        
        <section className="properties">
          <h2>Available Properties</h2>
          <div className="property-grid">
            {properties.map((p) => (
              <div key={p._id} className="property-card">
                {p.images?.[0] && (
                  <img src={p.images[0]} alt={p.title} className="property-img" />
                )}
                <div className="property-info">
                  <h3>{p.title}</h3>
                  <p>{p.address}</p>
                  <div className="price">₹{p.price.toLocaleString()}/month</div>
                  <p>{p.description}</p>
                  
                  {isApplied(p._id) ? (
                    <div className="applied">✅ Already Applied</div>
                  ) : (
                    <button 
                      className="apply-btn"
                      onClick={() => applyForProperty(p._id)}
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="applications">
          <h2>My Applications ({applications.length})</h2>
          {applications.map((app) => (
            <div key={app._id} className="app-item">
              <h4>{app.property?.title}</h4>
              <p>{app.property?.address}</p>
              <span className={`status ${app.status}`}>{app.status.toUpperCase()}</span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default TenantDashboard;
