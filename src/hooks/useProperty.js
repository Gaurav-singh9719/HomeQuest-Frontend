import { useState, useEffect } from "react";
import { propertiesData } from "../data/dummyData";

const useProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Load dummy data for now
    setProperties(propertiesData);
  }, []);

  return { properties, setProperties };
};

export default useProperties;
