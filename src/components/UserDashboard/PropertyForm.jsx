import React, { useState } from "react";

const PropertyForm = () => {
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
    setForm({ title: "", description: "", price: "", location: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Property</h3>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      ></textarea>
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default PropertyForm;
