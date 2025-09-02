import React, { useState } from "react";
import ProductList from "../../components/admin/ProductList";
import ProductForm from "../../components/admin/ProductForm";


const AdminPage = () => {
  const [products, setProducts] = useState([]);

  // Add product
  const addProduct = (product) => {
    setProducts([...products, { id: Date.now(), ...product }]);
  };

  // Update product
  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map((p) => (p.id === id ? updatedProduct : p)));
  };

  // Delete product
  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin Dashboard</h1>

      {/* Add Product Form */}
      <ProductForm onAdd={addProduct} />

      {/* Product List with update + delete */}
      <ProductList
        products={products}
        onUpdate={updateProduct}
        onDelete={deleteProduct}
      />
    </div>
  );
};

export default AdminPage;
