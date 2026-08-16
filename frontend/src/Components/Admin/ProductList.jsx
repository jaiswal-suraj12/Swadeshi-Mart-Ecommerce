import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = `${import.meta.env.VITE_API_URL}/api`;
const BASE_URL = import.meta.env.VITE_API_URL;

const ProductList = ({ refreshKey, onEdit, onDeleted }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/products/all`);
      setProducts(res.data?.products || []);
    } catch (err) {
      console.error(err);
      setProducts([]);
      toast.error(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this product?");
    if (!confirmed) return;

    try {
      setDeletingId(id);
      await axios.delete(`${API_URL}/products/delete-product/${id}`);
      toast.success("Product deleted");
      await fetchProducts();
      if (onDeleted) onDeleted();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete product");
    } finally {
      setDeletingId("");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshKey]);

  return (
    <section className="bg-white p-6 shadow">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Products</h2>
        <button
          type="button"
          onClick={fetchProducts}
          className="rounded bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => {
            const imageSrc =
              product.image?.startsWith("http")
                ? product.image
                : `${BASE_URL}${product.image}`;

            return (
              <article key={product._id} className="border bg-white p-4 shadow-sm">
                <img
                  src={imageSrc}
                  alt={product.title}
                  className="h-40 w-full rounded object-cover"
                />

                <div className="mt-3 space-y-1">
                  <h3 className="font-semibold text-gray-900">{product.title}</h3>
                  <p className="text-sm text-gray-500">{product.category || "No category"}</p>
                  <p className="font-bold text-green-700">₹{product.price}</p>
                  <p className="text-sm text-gray-600">Qty: {product.quantity ?? 0}</p>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => onEdit(product)}
                    className="flex-1 rounded bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(product._id)}
                    disabled={deletingId === product._id}
                    className="flex-1 rounded bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                  >
                    {deletingId === product._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ProductList;
