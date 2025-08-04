import React from "react";

const PhotoModal = ({ open, onClose, photo, imageUrl, loading, error }) => {
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
          {loading ? (
            <div className="py-10 text-lg">Loading details...</div>
          ) : error ? (
            <div className="py-10 text-red-500">{error}</div>
          ) : (
            <>
              <div className="relative w-full flex justify-center mb-2">
                <img
                  src={imageUrl}
                  alt={photo.title}
                  className="object-contain rounded-xl mb-4 shadow max-w-full max-h-[80vh]"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900">{photo.title}</h2>
              {/* Show description if available */}
              {photo.description && (
                <p className="text-gray-700 mt-2 text-center">{photo.description}</p>
              )}
              {/* Show keywords if available */}
              {photo.keywords && Array.isArray(photo.keywords) && photo.keywords.length > 0 && (
                <div className="mt-2 text-xs text-gray-500 text-center">
                  <span className="font-semibold">Keywords:</span> {photo.keywords.join(", ")}
                </div>
              )}
              {/* Show categories if available */}
              {photo.categories && Array.isArray(photo.categories) && photo.categories.length > 0 && (
                <div className="mt-2 text-xs text-gray-500 text-center">
                  <span className="font-semibold">Categories:</span> {photo.categories.join(", ")}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;
