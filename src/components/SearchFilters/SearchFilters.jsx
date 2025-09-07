import React, { useState } from "react";
import "./SearchFilters.css";

const SearchFilters = ({ onFilter }) => {
  const [location, setLocation] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ location, maxPrice });
  };

  return (
    <form className="filters" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchFilters;
