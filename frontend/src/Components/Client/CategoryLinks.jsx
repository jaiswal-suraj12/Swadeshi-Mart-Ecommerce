import React from "react";
import { Link, useParams } from "react-router-dom";

const CategoryLinks = () => {
  const categories = [
    "mobiles",
    "laptops",
    "wearables",
    "cameras",
    "electronics",
    "books",
    "furniture",
    "clothing",
  ];

  const { category: currentCategory } = useParams();

  const normalize = (str) =>
    str?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-wrap gap-3 bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-md border border-gray-200">

        {categories.map((cat) => {
          const isActive =
            normalize(cat) === normalize(currentCategory);

          return (
            <Link
              key={cat}
              to={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200 hover:scale-105
              
              ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md"
              }
              
              `}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryLinks;