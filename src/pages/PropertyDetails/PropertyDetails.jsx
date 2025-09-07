import React from "react";
import { useParams } from "react-router-dom";
import { propertiesData } from "../../data/dummyData";
import "./PropertyDetails.css";

const PropertyDetails = () => {
  const { id } = useParams();
  const property = propertiesData.find((p) => p.id === parseInt(id));

  if (!property) {
    return <p>Property not found</p>;
  }

  return (
    <div className="property-details">
      <img src={property.image} alt={property.title} />
      <h2>{property.title}</h2>
      <p>{property.description}</p>
      <p><strong>Location:</strong> {property.location}</p>
      <p><strong>Price:</strong> ${property.price}</p>
    </div>
  );
};

export default PropertyDetails;
