import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import "./TenantDashboard.css";

const API = process.env.REACT_APP_API_URL;

const TenantDashboard = () => {
  const { user, token } = useAuth();
  const [properties, setProperties] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProperties: 0,
    pendingApps: 0,
    approvedApps: 0
  });

  const fetchProperties = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/tenant/explore`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setProperties(data);
        setStats(prev => ({ ...prev, totalProperties: data.length }));
      }
    } catch (err) {
      console.error("Fetch properties error:", err);
    }
  }, [token]);

  const fetchApplications = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/tenant/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setApplications(data);
        setStats({
          totalProperties: properties.length,
          pendingApps: data.filter(app => app.status === 'pending').length,
          approvedApps: data.filter(app => app.status === 'accepted').length
        });
      }
    } catch (err) {
      console.error("Fetch applications error:", err);
    } finally {
      setLoading(false);
    }
  }, [token, properties.length]);

  useEffect(() => {
    fetchProperties();
    fetchApplications();
  }, [fetchProperties, fetchApplications]);

  const applyForProperty = async (propertyId) => {
    try {
      const res = await fetch(`${API}/api/tenant/apply`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ propertyId }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Application sent successfully!");
        fetchApplications();
      } else {
        alert(`❌ ${data.message || "Failed to apply"}`);
      }
    } catch (err) {
      console.error("Apply error:", err);
      alert("Server error. Please try again.");
    }
  };

  // Check if already applied
  const isApplied = (propertyId) => {
    return applications.some(app => app.property?._id === propertyId);
  };

  if (loading) {
    return (
      <div className="tenant-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tenant-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Welcome, {user?.name} 👋</h1>
          <p className="dashboard-subtitle">Find your dream home and track applications</p>
        </div>
      </div>

     
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🏠</div>
          <div className="stat-number">{stats.totalProperties}</div>
          <div className="stat-label">Available Properties</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-number">{stats.pendingApps}</div>
          <div className="stat-label">Pending Applications</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-number">{stats.approvedApps}</div>
          <div className="stat-label">Approved Rentals</div>
        </div>
      </div>

      <section className="properties-section">
        <h2 className="section-title">
          🏘️ Available Properties 
          <span className="section-count">({properties.length})</span>
        </h2>
        <div className="property-list">
          {properties.length > 0 ? (
            properties.map((p) => (
              <div className="property-card" key={p._id}>
                {p.images?.[0] && (
                  <div className="property-image">
                    <img src={p.images[0]} alt={p.title} />
                  </div>
                )}
                <div className="property-content">
                  <h4 className="property-title">{p.title}</h4>
                  <p className="property-address">{p.address}</p>
                  <div className="property-price">₹{p.price.toLocaleString()}/month</div>
                  <p className="property-desc">{p.description}</p>
                  
                  {isApplied(p._id) ? (
                    <div className="applied-badge">
                      ✅ Already Applied
                    </div>
                  ) : (
                    <button 
                      className="apply-button"
                      onClick={() => applyForProperty(p._id)}
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🏠</div>
              <p>No properties available right now.</p>
            </div>
          )}
        </div>
      </section>

      <section className="applications-section">
        <h2 className="section-title">
          📋 My Applications
          <span className="section-count">({applications.length})</span>
        </h2>
        {applications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📄</div>
            <p>No applications yet. Apply for properties above!</p>
          </div>
        ) : (
          <div className="applications-list">
            {applications.map((a) => (
              <div key={a._id} className={`application-item status-${a.status}`}>
                <div className="app-property">
                  <h4>{a.property?.title}</h4>
                  <p>{a.property?.address}</p>
                </div>
                <div className="app-status">
                  <span className={`status-badge status-${a.status}`}>
                    {a.status.toUpperCase()}
                  </span>
                  <div className="app-price">
                    ₹{a.property?.price.toLocaleString()}/month
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default TenantDashboard;
