import React from "react";

export default function ImageGrid({ images = [], selected = [], toggleSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {images.length === 0 ? (
        <p className="text-gray-500 col-span-4 text-center">
          No images found. Try searching for something!
        </p>
      ) : (
        images.map((img) => (
          <div
            key={img.id}
            className="relative rounded overflow-hidden bg-white shadow"
          >
            <img
              src={img.urls?.small}
              alt={img.alt_description || img.description || "Image"}
              className="w-full h-48 object-cover"
            />
            <label className="absolute top-2 left-2 bg-white/80 p-1 rounded">
              <input
                type="checkbox"
                checked={selected.includes(img.id)}
                onChange={() => toggleSelect(img.id)}
              />
            </label>
          </div>
        ))
      )}
    </div>
  );
}
