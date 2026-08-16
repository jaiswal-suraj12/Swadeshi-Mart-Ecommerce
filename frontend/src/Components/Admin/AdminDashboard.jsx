import React, { useState } from "react";
import ProductList from "./ProductList.jsx";
import ProductForm from "../ProductForm.jsx";

const AdminDashboard = () => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshProducts = () => {
    setRefreshKey((key) => key + 1);
  };

  const handleSaved = () => {
    setEditingProduct(null);
    refreshProducts();
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-600">Manage store products</p>
        </div>

        <ProductForm
          editingProduct={editingProduct}
          onCancelEdit={() => setEditingProduct(null)}
          onSaved={handleSaved}
        />

        <ProductList
          refreshKey={refreshKey}
          onEdit={setEditingProduct}
          onDeleted={refreshProducts}
        />
      </div>
    </main>
  );
};

export default AdminDashboard;
