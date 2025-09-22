import React from "react";

function GalleryGrid({ products, onImageClick, whatsappNumber }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
      {products.map((product, idx) => (
        <div
          key={idx}
          className="relative bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer"
        >
          {/* Product Image */}
          <div
            className="overflow-hidden"
            onClick={() =>
              onImageClick(
                product.images.map((img) => img.url),
                0
              )
            }
          >
            <img
              src={product.images[0]?.url}
              alt={product.name}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Card Info */}
          <div className="p-4">
            <h3 className="text-gray-800 font-semibold truncate">{product.name}</h3>
            {product.price && <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>}

            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                `Hi, I am interested in your product: ${product.name}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block w-full text-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition"
            >
              Enquire
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GalleryGrid;
