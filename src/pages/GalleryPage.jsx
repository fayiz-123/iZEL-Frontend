import React, { useState, useEffect } from "react";
import GalleryGrid from "../components/GalleryPageComponents/GalleryGrid";
import ImageCarousel from "../components/GalleryPageComponents/ImageCarousels";
import Footer from "../components/Footer";
import { fetchProducts } from "../services/productService";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function GalleryPage() {
  window.scrollTo(0,0)

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentProductImages, setCurrentProductImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

  const handleImageClick = (productImages, idx) => {
    setCurrentProductImages(productImages);
    setCurrentIndex(idx);
    setShowCarousel(true);
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await fetchProducts();
      setProducts(response.data || []);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
    <section className="min-h-screen bg-gray-50">
      {/* 🔹 Sticky Top Bar */}
      <div className="sticky top-0 z-20 bg-white shadow-sm">
        <div className="flex items-center max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <FaArrowLeft className="text-2xl text-gray-800" />
          </button>
          <h2 className="flex-1 text-center text-2xl md:text-3xl font-bold text-gray-800">
            Our Gallery
          </h2>
        </div>
      </div>

      {/* 🔹 Gallery Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <GalleryGrid products={products} onImageClick={handleImageClick} />
        )}
      </div>

      {/* 🔹 Fullscreen Carousel */}
      {showCarousel && (
        <ImageCarousel
          images={currentProductImages}
          currentIndex={currentIndex}
          onClose={() => setShowCarousel(false)}
        />
      )}
    </section>
    <Footer/>
    </>
  );
}

export default GalleryPage;
