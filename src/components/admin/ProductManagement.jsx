import React, { useEffect, useState } from "react";
import {
  addProducts,
  DeleteProducts,
  fetchProducts,
  UpdateProducts,
} from "../../services/productService";
import toast from "react-hot-toast";
import { confirmToast } from "../../utils/ConfirmToast";

function ProductManagement() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [addLoading, setAddLoading] = useState(false);
  const [deletedImages, setDeletedImages] = useState([]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await fetchProducts();
      setProducts(response.data);
    } catch (error) {
      console.log("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    images: [],
  });

  const [editId, setEditId] = useState(null);

  // Add or Update Product
  const handleSave = async () => {
    if (!newProduct.name){
      toast.error('Name is Required')
      return;
    } 
    if(!newProduct.description) {
      toast.error('Description is Required')
      return;
    }
    setAddLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("description", newProduct.description);

      // append images if any
      newProduct.images.forEach((img) => {
        if (img.file) {
          formData.append("images", img.file); // file from input
        } else if (img.url) {
          formData.append("imagesUrl[]", img.url); // fallback for existing url
        }
      });

      if (editId) {
        formData.append("id", editId);

        // pass deleted images
        deletedImages.forEach((url) => {
          formData.append("deletedImages[]", url);
        });

        const response = await UpdateProducts(editId, formData);
        if (response.success) {
          await loadProducts();
          setEditId(null);
          setDeletedImages([]); // reset after update
        }
      } else {
        // add new product
        const response = await addProducts(formData);
        if (response.success) {
          await loadProducts(); // refresh after add
        }
      }

      // reset form
      setNewProduct({ name: "", description: "", images: [] });
    } catch (error) {
      console.error("Failed to save product:", error);
    }
    setAddLoading(false);
  };

  // Delete Product
  const handleDelete = async (id) => {
    try {
      const response = await DeleteProducts(id);
      if (response.success) {
        toast.success("Product Deleted Successfully");
      }
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
    setNewProduct(product);
    setEditId(product._id);
  };

  // Handle Image Add (local preview)
  const handleAddImages = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name, // optional: for avoiding duplicates
    }));

    setNewProduct((prev) => {
      // avoid duplicates by checking name
      const existingNames = prev.images.map((img) => img.name);
      const filtered = newImages.filter(
        (img) => !existingNames.includes(img.name)
      );

      return {
        ...prev,
        images: [...prev.images, ...filtered],
      };
    });

    // reset input value so same file can be selected again
    e.target.value = null;
  };

  const handleRemoveImage = (index) => {
    setNewProduct((prev) => {
      const removed = prev.images[index];

      // If it's an old image (with url), mark it for backend deletion
      if (removed.url) {
        setDeletedImages((prevDeleted) => [...prevDeleted, removed.url]);
      }

      // revoke preview only if it's a new file
      if (removed.preview) {
        URL.revokeObjectURL(removed.preview);
      }

      return {
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      };
    });
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

        <div className="flex flex-col gap-2 md:col-span-3">
  <label className="font-medium">Upload Product Images</label>

  {/* Hidden native input */}
  <input
    type="file"
    id="fileUpload"
    accept="image/*"
    multiple
    onChange={handleAddImages}
    className="hidden"
  />

  {/* Custom upload button */}
  <label
    htmlFor="fileUpload"
    className="cursor-pointer inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-sm transition"
  >
    📁 Choose Files
  </label>

  {/* File info */}
  {newProduct.images.length > 0 ? (
    <p className="text-sm text-gray-600">
      {newProduct.images.length} file{newProduct.images.length > 1 ? "s" : ""} selected
    </p>
  ) : (
    <p className="text-sm text-gray-400 italic">No files chosen</p>
  )}

  {/* Image previews */}
  <div className="flex flex-wrap gap-3 mt-3">
    {newProduct.images.map((img, i) => (
      <div key={i} className="relative w-20 h-20">
        <img
          src={img.preview || img.url}
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


        <button
          onClick={handleSave}
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
        <table className="w-full border-collapse border text-sm sm:text-base">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Images</th>
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
              products.map((p) => (
                <tr key={p._id} className="text-center">
                  <td className="border px-4 py-2">{p._id}</td>
                  <td className="border px-4 py-2">{p.name}</td>
                  <td className="border px-4 py-2">{p.description}</td>
                  <td className="border px-4 py-2">
                    <div className="flex flex-wrap justify-center gap-2">
                      {p.images.map((img, i) => (
                        <img
                          key={i}
                          src={img.preview || img.url}
                          alt="product"
                          className="w-12 h-12 object-cover rounded"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(p._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductManagement;
