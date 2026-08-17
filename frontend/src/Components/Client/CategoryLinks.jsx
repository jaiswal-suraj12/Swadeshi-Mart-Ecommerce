import React from "react";
import { Link, useParams } from "react-router-dom";

const categories = [
  "mobiles",
  "laptops",
  "wearables",
  "cameras",
  "electronics",
  "books",
  "furniture",
  "clothing",
  "shoes",
  "healthcares",
  "beauty",
  "groceries",
  "home-kitchen",
  "toys",
  "sports",
  "automotive",
  "accessories",
  "bags",
  "jewellery",
];

const categoryNames = {
  mobiles: "Mobiles",
  laptops: "Laptops",
  wearables: "Wearables",
  cameras: "Cameras",
  electronics: "Electronics",
  books: "Books",
  furniture: "Furniture",
  clothing: "Clothing",
  shoes: "Shoes",
  healthcares: "HealthCare",
  beauty: "Beauty",
  groceries: "Groceries",
  "home-kitchen": "Home & Kitchen",
  toys: "Toys",
  sports: "Sports",
  automotive: "Automotive",
  accessories: "Accessories",
  bags: "Bags",
  jewellery: "Jewellery",
};

const CategoryLinks = () => {
  const { category: currentCategory } = useParams();

  return (
    <div className="w-full mb-8">
      <div
        className="
          flex
          gap-3
          overflow-x-auto
          whitespace-nowrap
          p-4
          rounded-2xl
          bg-white/80
          dark:bg-gray-900/80
          backdrop-blur-md
          shadow-md
          border
          border-gray-200
          dark:border-gray-700
          scrollbar-thin
        "
      >
        {categories.map((cat) => {
          const isActive = cat === currentCategory;

          return (
            <Link
              key={cat}
              to={`/category/${cat}`}
              className={`
                shrink-0
                px-5
                py-2.5
                text-sm
                font-semibold
                rounded-full
                transition-all
                duration-200
                hover:scale-105

                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md"
                }
              `}
            >
              {categoryNames[cat]}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryLinks;