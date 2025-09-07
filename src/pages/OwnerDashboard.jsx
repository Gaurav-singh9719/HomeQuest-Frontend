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

  // ✅ Wrap in useCallback
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

  return (
    <div className="owner-dashboard">
      <h2>Welcome, {user?.email} 🏡</h2>
      {/* Add Property Form */}
      <div className="add-property-form">
        <input type="text" name="title" placeholder="Title" value={newProperty.title} onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" value={newProperty.description} onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" value={newProperty.address} onChange={handleChange} />
        <input type="number" name="price" placeholder="Rent" value={newProperty.price} onChange={handleChange} />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {newProperty.imagePreview && <img src={newProperty.imagePreview} alt="Preview" style={{ width: "100px", marginTop: "10px" }} />}
        <button onClick={addProperty}>Add Property</button>
      </div>

      {/* Properties */}
      <div className="my-properties">
        <h3>My Properties</h3>
        {properties.length > 0 ? (
          properties.map((p) => (
            <div key={p._id} className="property-card">
              {p.images?.[0] && <img src={p.images[0]} alt={p.title} />}
              <h4>{p.title}</h4>
              <p>{p.address}</p>
              <p>₹{p.price.toLocaleString()}</p>
              {p.requests?.length > 0 && (
                <div className="tenant-requests">
                  <h5>Tenant Requests</h5>
                  {p.requests.map((req) => (
                    <div key={req._id} className="request-card">
                      <p><strong>{req.tenant?.name}</strong> ({req.tenant?.email})</p>
                      <p>Status: {req.status}</p>
                      {req.status === "pending" && (
                        <div className="request-actions">
                          <button className="accept-btn" onClick={() => handleRequest(req._id, "accepted")}>Accept</button>
                          <button className="reject-btn" onClick={() => handleRequest(req._id, "rejected")}>Reject</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No properties yet.</p>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
