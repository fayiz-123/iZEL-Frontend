import React, { useEffect, useState } from "react";
import {
  addProducts,
  DeleteProducts,
  fetchProducts,
  UpdateProducts,
} from "../../services/productService";
import toast from "react-hot-toast";
import { confirmToast } from "../../utils/ConfirmToast";
import { FiDownload } from "react-icons/fi";

function ProductManagement() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [addLoading, setAddLoading] = useState(false);
  const [deletedImages, setDeletedImages] = useState([]);

  const limit = 5;

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await fetchProducts(page, limit);
      setProducts(response.data?.products || []);
      setTotalPages(response.data?.pages);
    } catch (error) {
      console.log("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [page]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    images: [], // new uploads
  });

  const [existingImages, setExistingImages] = useState([]); // old images
  const [editId, setEditId] = useState(null);

  // Add or Update Product
  const handleSave = async () => {
    if (!newProduct.name) {
      toast.error("Name is Required");
      return;
    }
    if (!newProduct.description) {
      toast.error("Description is Required");
      return;
    }
    setAddLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("description", newProduct.description);

      // append new images
      newProduct.images.forEach((img) => {
        if (img.file) formData.append("images", img.file);
      });

      // append remaining old images
      existingImages.forEach((img) => {
        formData.append("imagesUrl[]", img.url);
      });

      // append deleted old images
      deletedImages.forEach((url) => {
        formData.append("deletedImages[]", url);
      });

      if (editId) {
        formData.append("id", editId);
        const response = await UpdateProducts(editId, formData);
        if (response.success) {
          await loadProducts();
          setEditId(null);
          setDeletedImages([]);
        }
      } else {
        const response = await addProducts(formData);
        if (response.success) {
          await loadProducts();
        }
      }

      setNewProduct({ name: "", description: "", images: [] });
      setExistingImages([]);
    } catch (error) {
      console.error("Failed to save product:", error);
    }
    setAddLoading(false);
  };

  // Delete Product
  const handleDelete = async (id) => {
    try {
      const response = await DeleteProducts(id);
      if (response.success) toast.success("Product Deleted Successfully");
      loadProducts();
    } catch (error) {
      console.log("Failed to Delete Product: ", error);
    }
  };

  const confirmDelete = (id) => {
    confirmToast("Are you sure you want to Delete?", () => handleDelete(id));
  };

  // Edit Product
  const handleEdit = (product) => {
    setNewProduct({
      name: product.name,
      description: product.description,
      images: [],
    });
    setExistingImages(product.images || []);
    setEditId(product._id);
  };

  // Handle new image uploads
  const handleAddImages = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));

    setNewProduct((prev) => {
      const existingNames = prev.images.map((img) => img.name);
      const filtered = newImages.filter(
        (img) => !existingNames.includes(img.name)
      );
      return { ...prev, images: [...prev.images, ...filtered] };
    });

    e.target.value = null;
  };

  const handleRemoveImage = (index) => {
    setNewProduct((prev) => {
      const removed = prev.images[index];
      if (removed.preview) URL.revokeObjectURL(removed.preview);
      return { ...prev, images: prev.images.filter((_, i) => i !== index) };
    });
  };

  const downloadImage = async (url, filename) => {
    try {
      const response = await fetch(url, { mode: "cors" }); // fetch as blob
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob); // create blob URL
      link.download = filename; // file name for download
      document.body.appendChild(link);
      link.click(); // trigger download
      link.remove(); // cleanup
      window.URL.revokeObjectURL(link.href); // free memory
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  return (
    <div className="pl-6 pb-6 pr-6 pt-12 sm:p-10">
      <h2 className="text-2xl font-semibold mb-4">Product Management</h2>

      {/* Product Form */}
      <div className="grid gap-4 mb-6 md:grid-cols-3">
        <input
          type="text"
          placeholder="Product Name"
          required
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="border px-3 py-2 rounded"
        />

        <textarea
          placeholder="Description"
          value={newProduct.description}
          required
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          className="border px-3 py-2 rounded md:col-span-2"
        />

        {/* warning for images edit */}
        {editId && existingImages.length > 0 && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 rounded mb-2 text-sm">
            ⚠️ Warning: Adding new images will replace existing images for this
            product. Please ensure you have backups if needed.
          </div>
        )}
        {/* New Images */}
        <div className="flex flex-col gap-2 md:col-span-3">
          <label className="font-medium">Upload Product Images</label>
          <input
            type="file"
            id="fileUpload"
            accept="image/*"
            multiple
            onChange={handleAddImages}
            className="hidden"
          />
          <label
            htmlFor="fileUpload"
            className="cursor-pointer inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-sm transition"
          >
            📁 Choose Files
          </label>
          {newProduct.images.length > 0 ? (
            <p className="text-sm text-gray-600">
              {newProduct.images.length} file
              {newProduct.images.length > 1 ? "s" : ""} selected
            </p>
          ) : (
            <p className="text-sm text-gray-400 italic">No files chosen</p>
          )}
          <div className="flex flex-wrap gap-3 mt-3">
            {newProduct.images.map((img, i) => (
              <div key={i} className="relative w-20 h-20">
                <img
                  src={img.preview}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs hover:bg-red-700"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Existing Images */}
        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div className="md:col-span-3">
            <label className="font-medium mb-2 block">Existing Images</label>
            <div className="flex flex-wrap gap-3">
              {existingImages.map((img, i) => (
                <div key={i} className="relative w-20 h-20 group">
                  <img
                    src={img.url}
                    alt="existing"
                    className="w-20 h-20 object-cover rounded border"
                  />
                  {/* Download icon overlay */}
                  <button
                    onClick={() =>
                      downloadImage(
                        img.url,
                        `${newProduct.name || "product"}-${i + 1}.jpg`
                      )
                    }
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 rounded transition"
                  >
                    <FiDownload className="text-white h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={addLoading}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded md:col-span-3"
        >
          {addLoading
            ? editId
              ? "Updating..."
              : "Adding..."
            : editId
            ? "Update Product"
            : "Add Product"}
        </button>
      </div>

      {/* Product List */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border text-sm sm:text-base table-auto">

          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              {/* <th className="border px-4 py-2">Description</th> */}
              {/* <th className="border px-4 py-2">Images</th> */}
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : (
              products.map((p, i) => (
                <tr key={i} className="text-center">
                  <td className="border px-4 py-2">{(page - 1) * limit + (i + 1)}</td>
                  <td className="border px-4 py-2 max-w-[150px] break-words whitespace-normal">
                    {p.name}
                  </td>
                  {/* <td className="border px-4 py-2 max-w-[100px] break-words whitespace-normal">
                    {p.description}
                  </td> */}

                  {/* <td className="border px-4 py-2">
                    <div className="flex flex-wrap justify-center gap-2">
                      {p.images.map((img, i) => (
                        <img
                          key={i}
                          src={img.url}
                          alt="product"
                          className="w-12 h-12 object-cover rounded"
                        />
                      ))}
                    </div>
                  </td> */}
                  <td className="border px-4 py-2">
                    <div className="flex flex-col sm:flex-row sm:space-x-2 gap-2 sm:gap-0">
                      {/* Edit button becomes Cancel if this product is being edited */}
                      <button
                        onClick={() => {
                          if (editId === p._id) {
                            // Cancel editing
                            setEditId(null);
                            setNewProduct({
                              name: "",
                              description: "",
                              images: [],
                            });
                            setExistingImages([]);
                            setDeletedImages([]);
                          } else {
                            // Start editing
                            handleEdit(p);
                          }
                        }}
                        className={`px-3 py-1 rounded text-white ${
                          editId === p._id
                            ? "bg-gray-500 hover:bg-gray-600"
                            : "bg-yellow-500 hover:bg-yellow-600"
                        }`}
                      >
                        {editId === p._id ? "Cancel" : "Edit"}
                      </button>

                      <button
                        onClick={() => confirmDelete(p._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="px-4 py-2 font-medium">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductManagement;
