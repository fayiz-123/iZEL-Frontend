import React, { useState } from "react";

const ProductForm = ({ onAdd }) => {
  const [form, setForm] = useState({ name: "", price: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    onAdd(form);
    setForm({ name: "", price: "" }); 
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "1rem 0" }}>
      <input
        type="text"
        placeholder="Product Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
