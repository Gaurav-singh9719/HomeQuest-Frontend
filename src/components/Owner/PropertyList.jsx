import React from "react";

const PropertyList = ({ properties }) => {
  return (
    <div>
      <h3>Your Properties</h3>
      {properties && properties.length > 0 ? (
        <ul>
          {properties.map((p) => (
            <li key={p.id}>{p.title} - ${p.price}</li>
          ))}
        </ul>
      ) : (
        <p>No properties yet.</p>
      )}
    </div>
  );
};

export default PropertyList;
