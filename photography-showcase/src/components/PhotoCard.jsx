import React from "react";

const PhotoCard = React.memo(({ imageUrl, title, categories, onClick, isSelected, isFavourite, onFavouriteToggle, index = 0, shouldAnimate = true }) => {
  // Get the first category or show "Uncategorized" if none available
  const displayCategory = Array.isArray(categories) && categories.length > 0 ? categories[0] : "Uncategorized";
  
  console.log('PhotoCard render:', { title, shouldAnimate, index }); // Debug log
  
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg border overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:border-blue-200 max-w-xs w-full mx-auto flex flex-col ${shouldAnimate ? 'animate-fade-in-up' : ''} ${isSelected ? 'border-blue-500' : 'border-gray-200'}`}
      onClick={onClick}
      style={{ 
        cursor: onClick ? 'pointer' : 'default',
        ...(shouldAnimate ? {
          animationDelay: `${index * 100}ms`,
          animationFillMode: 'both'
        } : {})
      }}
    >
      <div className="p-2 flex justify-center bg-gray-50 relative">
        <img
          src={imageUrl}
          alt={title}
          className="h-48 w-48 object-cover object-center rounded-xl shadow-sm transition-transform duration-300 hover:scale-105"
        />
        <button
          className="absolute top-2 right-2 text-2xl focus:outline-none z-10 transition-all duration-200 hover:scale-110"
          onClick={e => { e.stopPropagation(); onFavouriteToggle(); }}
          aria-label={isFavourite ? "Unfavourite" : "Favourite"}
        >
          {isFavourite ? (
            <span className="text-red-500">&#10084;&#65039;</span>
          ) : (
            <span className="text-gray-400">&#9825;</span>
          )}
        </button>
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <h2 className="text-xl font-bold mb-3 font-sans text-gray-900 truncate tracking-tight">{title}</h2>
        <span className="inline-block bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-xs px-3 py-1 rounded-full self-start font-semibold shadow-sm border border-blue-100">{displayCategory}</span>
      </div>
    </div>
  );
});

export default PhotoCard;

