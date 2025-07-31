import React from "react";

const PhotoModal = ({ open, onClose, photo }) => {
  if (!open || !photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="flex flex-col items-center">
          <img
            src={photo.url_medium_size || photo.imageUrl}
            alt={photo.title}
            className="object-contain rounded-xl mb-4 shadow max-w-full max-h-[80vh]"
          />
          <h2 className="text-2xl font-bold mb-2 text-gray-900">{photo.title}</h2>
          <span className="inline-block bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold shadow-sm border border-blue-100 mb-2">
            {photo.category}
          </span>
          {photo.description && (
            <p className="text-gray-700 mt-2 text-center">{photo.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;
