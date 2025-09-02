import React, { useState } from "react";

function ProductManagement() {
  const [products, setProducts] = useState([
    { id: 1, name: "Bridal Lehenga", price: 1200 },
    { id: 2, name: "Silk Saree", price: 800 },
  ]);

  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

  const handleAdd = () => {
    if (!newProduct.name || !newProduct.price) return;
    setProducts([...products, { id: Date.now(), ...newProduct }]);
    setNewProduct({ name: "", price: "" });
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Product Management</h2>

      {/* Add Product */}
      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border px-3 py-2 rounded w-1/3"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="border px-3 py-2 rounded w-1/3"
        />
        <button
          onClick={handleAdd}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Product List */}
      <table className="w-full border-collapse border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="text-center">
              <td className="border px-4 py-2">{p.id}</td>
              <td className="border px-4 py-2">{p.name}</td>
              <td className="border px-4 py-2">${p.price}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductManagement;
