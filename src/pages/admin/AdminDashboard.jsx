import React from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import ProductManagement from "../../components/admin/ProductManagement";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main className="max-w-6xl mx-auto py-6">
        <ProductManagement />
      </main>
    </div>
  );
}

export default AdminDashboard;
