import React from "react";
import { useNavigate } from "react-router-dom";

const GalleryPreview = () => {
    const navigate = useNavigate
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
        <img
          src="/images/image1.jpeg"
          alt="Bridal Dress 1"
          className="w-full h-[450px] object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
        />
        <img
          src="/images/image2.jpeg"
          alt="Bridal Dress 2"
          className="w-full h-[450px] object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
        />
        <img
          src="/images/image3.png"
          alt="Bridal Dress 3"
          className="w-full h-[450px] object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* View All Button */}
      <div className="mt-8">
        <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md shadow-md transition" onClick={() => navigate('/gallery')}>
          Explore More
        </button>
      </div>
    </section>
  );
};

export default GalleryPreview;
