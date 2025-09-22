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
  const [limit, setLimit] = useState(5); // default for mobile

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
      setTotalPages(response?.data?.pages || 1);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  // Detect screen size once + on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setLimit(12); // large desktop
      } else if (window.innerWidth >= 768) {
        setLimit(8); // tablet / small desktop
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

      <main className="min-h-[calc(100vh-318px)] bg-gray-50 flex flex-col justify-start">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col">
          {loading ? (
            <div className="flex items-center justify-center flex-1">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center gap-4">
              <p className="text-gray-600 text-lg">No Products Found</p>
            </div>
          ) : (
            <>
              <GalleryGrid
                products={products}
                onImageClick={handleImageClick}
                whatsappNumber={919400647077}
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row justify-center items-center mt-6 gap-4">
                  <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 w-full sm:w-auto"
                  >
                    Previous
                  </button>

                  <span className="px-4 py-2 font-medium text-center">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    onClick={() =>
                      setPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 w-full sm:w-auto"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Carousel */}
        {showCarousel && (
          <ImageCarousel
            images={currentProductImages}
            currentIndex={currentIndex}
            onClose={() => setShowCarousel(false)}
          />
        )}
      </main>

      <Footer />
    </>
  );
}

export default GalleryPage;
