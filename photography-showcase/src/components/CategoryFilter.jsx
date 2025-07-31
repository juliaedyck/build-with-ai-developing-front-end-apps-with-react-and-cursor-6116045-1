import React from "react";

const CategoryFilter = ({ categories, onCategorySelect, selectedCategory }) => {
  return (
    <div className="flex flex-wrap gap-2 py-4 justify-center">
      {categories.map((category) => (
        <button
          key={category}
          className={
            `px-4 py-2 rounded-full font-semibold shadow-sm border transition ` +
            (selectedCategory === category
              ? "bg-blue-600 text-white border-blue-700 hover:bg-blue-700"
              : "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200")
          }
          onClick={() => onCategorySelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
