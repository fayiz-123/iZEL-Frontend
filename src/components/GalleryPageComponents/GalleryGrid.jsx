import React from "react";

function GalleryGrid({ products, onImageClick, whatsappNumber }) {
  return (
    <div
      className="
        grid 
        grid-cols-1 
        xs:grid-cols-2   /* 👈 custom breakpoint (375px+) */
        sm:grid-cols-2   /* 640px+ */
        md:grid-cols-3   /* 768px+ */
        lg:grid-cols-4   /* 1024px+ */
        gap-4 sm:gap-6 
        px-3 sm:px-6
      "
    >
      {products.map((product, idx) => (
        <div
          key={idx}
          className="relative bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer w-full"
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
