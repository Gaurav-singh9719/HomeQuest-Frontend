import React, { useState } from "react";

const AddPropertyForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Property added successfully (dummy)!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Property</h3>
      <input name="title" placeholder="Title" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} />
      <input name="location" placeholder="Location" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddPropertyForm;
