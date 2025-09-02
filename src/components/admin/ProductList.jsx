import React, { useState } from "react";

const ProductList = ({ products, onUpdate, onDelete }) => {
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", price: "" });

  const startEdit = (product) => {
    setEditId(product.id);
    setForm(product);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate(editId, { ...form, id: editId });
    setEditId(null);
    setForm({ name: "", price: "" });
  };

  return (
    <div>
      <h2>Products</h2>
      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id} style={{ marginBottom: "0.5rem" }}>
              {editId === product.id ? (
                <form onSubmit={handleUpdate}>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                  />
                  <button type="submit">Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </form>
              ) : (
                <>
                  <span>
                    {product.name} - ₹{product.price}
                  </span>
                  <button onClick={() => startEdit(product)}>Edit</button>
                  <button onClick={() => onDelete(product.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
