import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";  // ← ADD ये import

const RequestForm = ({ propertyId, onSuccess }) => {  // ← propertyId prop receive करो
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();  // ← Auth token लो

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) {
      alert("Please enter a message");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tenant/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          propertyId: propertyId  // ← Backend को propertyId भेजो
        }),
      });

      const data = await res.json();
      
      if (res.ok) {
        alert("✅ Request sent successfully!");
        setMessage("");
        onSuccess?.();  // Parent को refresh signal भेजो
      } else {
        alert(`❌ Error: ${data.message || "Failed to apply"}`);
      }
    } catch (err) {
      console.error("Apply error:", err);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="request-modal-overlay">
      <div className="request-modal">
        <h3>🏠 Apply for this Property</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Write a short message to the owner (optional)..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            maxLength="500"
            disabled={loading}
          />
          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => onSuccess?.()} 
              className="cancel-btn"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading || !propertyId}
              className="apply-btn"
            >
              {loading ? "Applying..." : "✅ Send Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
