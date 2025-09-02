import React, { useState } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

function ImageCarousel({ images, currentIndex, onClose }) {
  const [index, setIndex] = useState(currentIndex);

  const prev = () => setIndex((index - 1 + images.length) % images.length);
  const next = () => setIndex((index + 1) % images.length);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      {/* 🔹 Close Button */}
      <button
        className="absolute top-6 right-6 text-white hover:text-gray-300 transition"
        onClick={onClose}
      >
        <FaTimes size={28} />
      </button>

      {/* 🔹 Left Arrow */}
      <button
        onClick={prev}
        className="absolute left-6 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition"
      >
        <FaChevronLeft size={24} />
      </button>

      {/* 🔹 Image */}
      <img
        src={images[index]}
        alt="carousel"
        className="max-h-[85vh] max-w-[90vw] rounded-lg shadow-lg object-contain"
      />

      {/* 🔹 Right Arrow */}
      <button
        onClick={next}
        className="absolute right-6 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition"
      >
        <FaChevronRight size={24} />
      </button>
    </div>
  );
}

export default ImageCarousel;
