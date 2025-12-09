import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import "./OwnerDashboard.css";

const API = process.env.REACT_APP_API_URL;

const OwnerDashboard = () => {
  const { token, user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    title: "",
    description: "",
    address: "",
    price: "",
    imageFile: null,
    imagePreview: "", 
  });
  const [loading, setLoading] = useState(false);

  const fetchProperties = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/owner/properties`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setProperties(data);
    } catch (err) {
      console.error("Fetch properties error:", err);
    }
  }, [token]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProperty({ ...newProperty, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProperty({
        ...newProperty,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const addProperty = async () => {
    const { title, description, address, price, imageFile } = newProperty;
    if (!title || !description || !address || !price) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("address", address);
      formData.append("price", price);
      if (imageFile) formData.append("image", imageFile);

      const res = await fetch(`${API}/api/owner/add-property`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Property added successfully");
        setNewProperty({
          title: "",
          description: "",
          address: "",
          price: "",
          imageFile: null,
          imagePreview: "",
        });
        fetchProperties();
      } else alert(data.message);
    } catch (err) {
      console.error("Add property error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (requestId, action) => {
    try {
      const res = await fetch(`${API}/api/owner/handle-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ requestId, action }),
      });
      const data = await res.json();
      if (res.ok) fetchProperties();
      else alert(data.message);
    } catch (err) {
      console.error("Handle request error:", err);
    }
  };

  // ✅ FIXED: Only PENDING requests count
  const getPendingRequestsCount = () => {
    return properties.reduce((sum, p) => {
      const pendingRequests = p.requests?.filter(req => req.status === 'pending') || [];
      return sum + pendingRequests.length;
    }, 0);
  };

  // ✅ FIXED: Only properties with PENDING requests
  const getActiveTenantsCount = () => {
    return properties.filter(p => 
      p.requests?.some(req => req.status === 'accepted')
    ).length;
  };

  return (
    <div className="owner-dashboard">
      {/* Hero Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome Back, {user?.name}</h1>
        <p className="dashboard-subtitle">Manage your properties & tenant requests</p>
      </div>

      {/* FIXED Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🏠</div>
          <div className="stat-number">{properties.length}</div>
          <div className="stat-label">Total Properties</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-number">{getPendingRequestsCount()}</div> {/* ✅ FIXED */}
          <div className="stat-label">Pending Requests</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-number">{getActiveTenantsCount()}</div> {/* ✅ FIXED */}
          <div className="stat-label">Active Tenants</div>
        </div>
      </div>

      {/* Modern Add Property Form */}
      <div className="add-property-section">
        <h2 className="section-title">
          ➕ Add New Property
        </h2>
        <div className="modern-form-grid">
          <div className="form-group">
            <label>Property Title</label>
            <input 
              type="text" 
              name="title" 
              placeholder="Enter property title" 
              value={newProperty.title} 
              onChange={handleChange}
              className="modern-input"
            />
          </div>
          <div className="form-group">
            <label>Rent Price</label>
            <input 
              type="number" 
              name="price" 
              placeholder="₹5000" 
              value={newProperty.price} 
              onChange={handleChange}
              className="modern-input"
            />
          </div>
          <div className="form-group full-width">
            <label>Address</label>
            <input 
              type="text" 
              name="address" 
              placeholder="Full address with location" 
              value={newProperty.address} 
              onChange={handleChange}
              className="modern-input"
            />
          </div>
          <div className="form-group full-width">
            <label>Description</label>
            <textarea 
              name="description" 
              placeholder="Describe your property..." 
              value={newProperty.description} 
              onChange={handleChange}
              rows="4"
              className="modern-textarea"
            />
          </div>
          <div className="form-group">
            <label>Property Image</label>
            <div className="file-upload-wrapper">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload}
                id="image-upload"
                className="file-input"
              />
              <label htmlFor="image-upload" className="file-label">
                📷 Choose Image
              </label>
              {newProperty.imagePreview && (
                <div className="image-preview">
                  <img src={newProperty.imagePreview} alt="Preview" />
                </div>
              )}
            </div>
          </div>
          <div className="form-actions">
            <button 
              onClick={addProperty} 
              disabled={loading}
              className="add-property-btn"
            >
              {loading ? "Adding..." : "🚀 Add Property"}
            </button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="properties-section">
        <h2 className="section-title">
          📋 Your Properties ({properties.length})
        </h2>
        {properties.length > 0 ? (
          <div className="properties-grid">
            {properties.map((p) => {
              // ✅ Only show PENDING requests
              const pendingRequests = p.requests?.filter(req => req.status === 'pending') || [];
              
              return (
                <div key={p._id} className="modern-property-card">
                  {p.images?.[0] && (
                    <div className="property-image">
                      <img src={p.images[0]} alt={p.title} />
                    </div>
                  )}
                  <div className="property-content">
                    <div className="property-header">
                      <h3 className="property-title">{p.title}</h3>
                      <div className="property-price">
                        ₹{parseInt(p.price).toLocaleString()}/month
                      </div>
                    </div>
                    <p className="property-address">{p.address}</p>
                    <p className="property-desc">{p.description}</p>
                    
                    {pendingRequests.length > 0 && (  // ✅ Only PENDING show
                      <div className="requests-section">
                        <h4>📩 Pending Requests ({pendingRequests.length})</h4>
                        <div className="requests-list">
                          {pendingRequests.map((req) => (  // ✅ Only PENDING map
                            <div key={req._id} className="request-item">
                              <div className="request-info">
                                <strong>{req.tenant?.name}</strong>
                                <span>{req.tenant?.email}</span>
                                <span className={`status-badge status-${req.status}`}>
                                  {req.status}
                                </span>
                              </div>
                              <div className="request-actions">
                                <button 
                                  className="accept-btn" 
                                  onClick={() => handleRequest(req._id, "accepted")}
                                >
                                  ✅ Accept
                                </button>
                                <button 
                                  className="reject-btn" 
                                  onClick={() => handleRequest(req._id, "rejected")}
                                >
                                  ❌ Reject
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🏠</div>
            <h3>No Properties Yet</h3>
            <p>Add your first property to start earning!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
