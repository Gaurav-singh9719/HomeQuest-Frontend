import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import "./TenantDashboard.css";

const API = process.env.REACT_APP_API_URL;

const TenantDashboard = () => {
  const { user, token } = useAuth();
  const [properties, setProperties] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(null);
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
    setIsApplying(propertyId);
    
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
        showNotification("✅ Application sent successfully!", "success");
        fetchApplications();
      } else {
        showNotification(`❌ ${data.message || "Failed to apply"}`, "error");
      }
    } catch (err) {
      showNotification("❌ Network error. Please try again.", "error");
    } finally {
      setIsApplying(null);
    }
  };

  const isApplied = (propertyId) => {
    return applications.some(app => app.property?._id === propertyId);
  };

  const showNotification = (message, type) => {
    const toast = document.createElement('div');
    toast.className = `notification notification-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="tenant-dashboard">
        <div className="dashboard-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tenant-dashboard">
      <div className="dashboard-container">
        {/* Hero Header */}
        <div className="dashboard-header">
          <div className="header-content">
            <h1 className="dashboard-title">Welcome, {user?.name} 👋</h1>
            <p className="dashboard-subtitle">Find your dream home and track applications</p>
          </div>
        </div>

        {/* Stats Cards */}
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

        {/* Properties Section */}
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
                        className={`apply-button ${isApplying === p._id ? 'loading' : ''}`}
                        onClick={() => applyForProperty(p._id)}
                        disabled={isApplying === p._id}
                      >
                        {isApplying === p._id ? 'Applying...' : 'Apply Now'}
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

        {/* Applications Section */}
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
    </div>
  );
};

export default TenantDashboard;
