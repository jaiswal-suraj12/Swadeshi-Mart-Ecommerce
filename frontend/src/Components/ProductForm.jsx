import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:3200/api";

const emptyForm = {
  title: "",
  price: "",
  description: "",
  quantity: "",
  category: "",
};

const ProductForm = ({ editingProduct, onCancelEdit, onSaved }) => {
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(editingProduct?._id);

  useEffect(() => {
    if (!editingProduct) {
      setForm(emptyForm);
      setFile(null);
      setPreview(null);
      return;
    }

    setForm({
      title: editingProduct.title || "",
      price: editingProduct.price ?? "",
      description: editingProduct.description || "",
      quantity: editingProduct.quantity ?? "",
      category: editingProduct.category || "",
    });
    setFile(null);
    setPreview(editingProduct.image || null);
  }, [editingProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const buildFormData = () => {
    const formData = new FormData();
    formData.append("name", form.title);
    formData.append("title", form.title);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("quantity", form.quantity);
    formData.append("category", form.category);
    if (file) formData.append("image", file);
    return formData;
  };

  const validate = () => {
    if (!form.title.trim() || !form.price || !form.category.trim()) {
      toast.error("Title, price, and category are required");
      return false;
    }

    if (!isEditing && !file) {
      toast.error("Product image is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSaving(true);
      const formData = buildFormData();

      if (isEditing) {
        await axios.put(
          `${API_URL}/products/update-product/${editingProduct._id}`,
          formData
        );
        toast.success("Product updated");
      } else {
        await axios.post(`${API_URL}/products/create-product`, formData);
        toast.success("Product created");
      }

      setForm(emptyForm);
      setFile(null);
      setPreview(null);
      if (onSaved) onSaved();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Product save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="bg-white p-6 shadow">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          {isEditing ? "Update Product" : "Create Product"}
        </h2>

        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded border px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          name="title"
          placeholder="Product title"
          value={form.title}
          onChange={handleChange}
          className="w-full rounded border p-3 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          min="0"
          className="w-full rounded border p-3 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          min="0"
          className="w-full rounded border p-3 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full rounded border p-3 outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select category</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
          <option value="furniture">Furniture</option>
          <option value="mobiles">Mobiles</option>
          <option value="wearables">Wearables</option>

        </select>

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows="4"
          className="w-full rounded border p-3 outline-none focus:ring-2 focus:ring-blue-400 md:col-span-2"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full rounded border p-3 md:col-span-2"
        />

        {preview && (
          <div className="md:col-span-2">
            <img
              src={preview}
              alt="Product preview"
              className="h-28 w-28 rounded border object-cover"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="rounded bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-60 md:col-span-2"
        >
          {saving
            ? "Saving..."
            : isEditing
              ? "Update Product"
              : "Create Product"}
        </button>
      </form>
    </section>
  );
};

export default ProductForm;
