import React, { useState } from "react";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import SearchFilters from "../../components/SearchFilters/SearchFilters";
import { propertiesData } from "../../data/dummyData";
import "./Properties.css";

const Properties = () => {
  const [filtered, setFiltered] = useState(propertiesData);

  const handleFilter = ({ location, maxPrice }) => {
    let result = propertiesData;
    if (location) {
      result = result.filter((p) =>
        p.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    if (maxPrice) {
      result = result.filter((p) => p.price <= Number(maxPrice));
    }
    setFiltered(result);
  };

  return (
    <div className="properties">
      <h2>Available Properties</h2>
      <SearchFilters onFilter={handleFilter} />
      <div className="properties-grid">
        {filtered.length > 0 ? (
          filtered.map((p) => <PropertyCard key={p.id} property={p} />)
        ) : (
          <p>No properties match your filters.</p>
        )}
      </div>
    </div>
  );
};

export default Properties;
