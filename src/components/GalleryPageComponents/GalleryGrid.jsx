import React from "react";

function GalleryGrid({ products, onImageClick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
      {products.map((product, pIdx) => (
        <div
          key={pIdx}
          className="cursor-pointer group"
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
            className="rounded-xl shadow-md w-full object-cover group-hover:opacity-80 transition"
          />
          <h3 className="text-center mt-2 text-lg font-medium">
            {product.name}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default GalleryGrid;
