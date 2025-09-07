import React from "react";
import { useNavigate } from "react-router-dom";
import "./PropertyCard.css"; // ✅ sahi file import ki hai (same folder me hogi)

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/property/${property.id}`, { state: { property } });
  };

  return (
    <div className="property-card">
      <img src={property.image} alt={property.title} />
      <h2>{property.title}</h2>
      <p>{property.description}</p>
      <p className="price">₹{property.price} / month</p>
      <p className="location">{property.location}</p>
      <button className="view-details" onClick={handleViewDetails}>
        View Details
      </button>
    </div>
  );
};

export default PropertyCard;
