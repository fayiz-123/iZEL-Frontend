import React, { useState, useEffect } from "react";
import GalleryGrid from "../components/GalleryPageComponents/GalleryGrid";
import ImageCarousel from "../components/GalleryPageComponents/ImageCarousels";
import Footer from "../components/Footer";
import { fetchProducts } from "../services/productService";
import Navbar from "../components/Navbar";

function GalleryPage() {
  window.scrollTo(0, 0);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentProductImages, setCurrentProductImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [limit, setLimit] = useState(5); // default mobile

  const handleImageClick = (productImages, idx) => {
    setCurrentProductImages(productImages);
    setCurrentIndex(idx);
    setShowCarousel(true);
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await fetchProducts(page, limit);
      setProducts(response.data?.products || []);
      setTotalPages(response?.data?.pages);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  // 👇 detect screen size once + on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setLimit(8); // desktop
      } else {
        setLimit(5); // mobile
      }
    };

    handleResize(); // run initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    loadProducts();
  }, [page, limit]);

  return (
    <>
      <Navbar title={"Our Gallery"} />
      <section className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <GalleryGrid
              products={products}
              onImageClick={handleImageClick}
              whatsappNumber={919400647077}
            />
          )}
        </div>

        {showCarousel && (
          <ImageCarousel
            images={currentProductImages}
            currentIndex={currentIndex}
            onClose={() => setShowCarousel(false)}
          />
        )}

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
      </section>

      <Footer />
    </>
  );
}

export default GalleryPage;
