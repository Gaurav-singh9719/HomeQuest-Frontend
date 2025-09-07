import React, { useState } from "react";
import "./AddPropertyForm.css";

const AddPropertyForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      setFormData({ ...formData, image: imageUrl });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.location || !formData.price) return;
    onAdd({ ...formData, id: Date.now(), applications: 0 });
    setFormData({ title: "", location: "", price: "", image: "" });
  };

  return (
    <form className="add-property-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Rent"
        value={formData.price}
        onChange={handleChange}
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
      />
      {formData.image && (
        <img src={formData.image} alt="preview" className="preview-img" />
      )}
      <button type="submit">Add Property</button>
    </form>
  );
};

export default AddPropertyForm;
