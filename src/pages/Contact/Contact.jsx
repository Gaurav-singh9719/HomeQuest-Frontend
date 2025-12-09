import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Contact.css";

const API = process.env.REACT_APP_API_URL;

const Contact = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (status) setStatus("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message.trim()) {
      setStatus("Please fill required fields");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (res.ok) {
        setStatus("✅ Message sent successfully! We'll get back to you soon.");
        setFormData({
          name: user?.name || "",
          email: user?.email || "",
          phone: "",
          subject: "",
          message: ""
        });
      } else {
        setStatus(`❌ ${data.message || "Failed to send message"}`);
      }
    } catch (err) {
      console.error("Contact error:", err);
      setStatus("❌ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1 className="contact-title">📞 Get In Touch</h1>
          <p className="contact-subtitle">Have questions? Need help? Send us a message!</p>
        </div>

        <div className="contact-form-section">
          <form onSubmit={handleSubmit} className="modern-contact-form">
            <div className="form-row">
              <div className="form-group">
                <label>Name <span className="required">*</span></label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="modern-input"
                  required
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label>Email <span className="required">*</span></label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="modern-input"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone</label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="modern-input"
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className="modern-input"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Message <span className="required">*</span></label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more about your query..."
                rows="6"
                className="modern-textarea"
                required
                disabled={loading}
              />
            </div>

            {status && (
              <div className={`status-message ${status.includes('✅') ? 'success' : 'error'}`}>
                {status}
              </div>
            )}

            <div className="form-actions">
              <button 
                type="submit" 
                disabled={loading || !formData.message.trim()}
                className="contact-submit-btn"
              >
                {loading ? "Sending..." : "🚀 Send Message"}
              </button>
            </div>
          </form>
        </div>

        <div className="contact-info-section">
          <h2 className="section-title">📍 Contact Information</h2>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">📧</div>
              <div className="info-content">
                <h4>Email Us</h4>
                <p>support@rentals.com</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">📞</div>
              <div className="info-content">
                <h4>Call Us</h4>
                <p>+91 98765 43210</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">🕒</div>
              <div className="info-content">
                <h4>Working Hours</h4>
                <p>Mon - Sat: 9AM - 7PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
