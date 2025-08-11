import React from "react";

const PhotoCard = ({ imageUrl, title, category, categories, onClick, isSelected }) => {
  // Prefer categories[0] if categories is an array, else fallback to category prop
  const displayCategory = Array.isArray(categories) && categories.length > 0 ? categories[0] : category;
  return (
    <div 
      className={`bg-white rounded-2xl shadow-lg border overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:border-blue-200 max-w-xs w-full mx-auto flex flex-col ${isSelected ? 'border-blue-500' : 'border-gray-200'}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="p-2 flex justify-center bg-gray-50">
        <img
          src={imageUrl}
          alt={title}
          className="h-48 w-48 object-cover object-center rounded-xl shadow-sm"
        />
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <h2 className="text-xl font-bold mb-3 font-sans text-gray-900 truncate tracking-tight">{title}</h2>
        <span className="inline-block bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-xs px-3 py-1 rounded-full self-start font-semibold shadow-sm border border-blue-100">{displayCategory}</span>
      
    
      </div>
    </div>
  );
};

export default PhotoCard;

