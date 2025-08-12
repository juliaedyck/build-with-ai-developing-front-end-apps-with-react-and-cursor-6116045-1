import React from "react";

const PhotoCard = ({ imageUrl, title, keywords }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-100">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover object-center transition-transform duration-300 hover:scale-110"
        />
      </div>
      
      {/* Content Container */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
          {title}
        </h3>
        
        {/* Keywords */}
        {keywords && keywords.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoCard; 