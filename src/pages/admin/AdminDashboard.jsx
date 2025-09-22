import React, { useState } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import ProductManagement from "../../components/admin/ProductManagement";
import UserManagement from "../../components/admin/UserManagement";

function AdminDashboard() {
  // State to track which section is active
  const [activeSection, setActiveSection] = useState("products"); // default to products

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="max-w-6xl mx-auto py-6 pt-20"> {/* pt-20 to avoid fixed navbar overlap */}
        {activeSection === "products" && <ProductManagement />}
        {activeSection === "users" && <UserManagement />}
      </main>
    </div>
  );
}

export default AdminDashboard;
