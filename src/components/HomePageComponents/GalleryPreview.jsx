import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../services/productService";

const GalleryPreview = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

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

 
  return (
    <section className="py-12 bg-white text-center">
      {/* Section Heading */}
      <h3 className="text-xl sm:text-2xl font-semibold italic text-yellow-900">
        Where Elegance Meets Exceptional Quality
      </h3>
      <h2 className="text-3xl sm:text-4xl font-bold text-black mt-2 mb-8">
        New Arrivals
      </h2>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 md:px-16">
        {products.map((product) => (
          loading ? (
             <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          ) :
          <div
            key={product._id}
            className="w-full aspect-w-4 aspect-h-3 overflow-hidden rounded-lg shadow-md group"
          >
            <img
              src={product?.images[0].url || "/images/image1.jpeg"}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 
                   group-hover:scale-105 group-active:scale-105"
            />
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-8">
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md shadow-md transition"
          onClick={() => navigate("/gallery")}
        >
          Explore More
        </button>
      </div>
    </section>
  );
};

export default GalleryPreview;
