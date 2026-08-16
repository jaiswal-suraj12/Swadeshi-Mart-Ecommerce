import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import CategoryLinks from "./CategoryLinks";

const CategoryFilter = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const {
    filteredProducts,
    loading,
    getProductsByCategory,
    addTOCart,
  } = useContext(AppContext);

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (category) {
      getProductsByCategory(category);
    }
  }, [category]); // ✅ ONLY category

  return (
    <div className="container mx-auto px-4 py-8">

      <CategoryLinks />

      <h1 className="text-2xl font-bold mb-6 capitalize">
        Category: <span className="text-blue-600">{category}</span>
      </h1>

      {loading && (
        <p className="text-center text-gray-500 text-lg">
          Loading products...
        </p>
      )}

      {!loading && filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 text-lg">
          No products found in this category
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {filteredProducts.map((product) => {
          const imageSrc = product.image?.startsWith("http")
            ? product.image
            : `${BASE_URL}${product.image}`;

          return (
            <div
              key={product._id}
              className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                onClick={() =>
                  navigate(`/product/details/${product._id}`)
                }
                className="w-full h-64 object-cover cursor-pointer"
                src={imageSrc}
                alt={product.title}
              />

              <div className="p-4">

                <h2 className="text-lg font-semibold">
                  {product.title}
                </h2>

                <p className="text-gray-500 text-sm mt-2">
                  {product.description}
                </p>

                <div className="mt-4">
                  <span className="text-xl font-bold">
                    ₹ {product.price}
                  </span>
                </div>

                <div className="mt-4 flex gap-2">

                  <button
                    onClick={() =>
                      addTOCart(
                        product._id,
                        product.image,
                        product.title,
                        product.description,
                        product.price,
                        1
                      )
                    }
                    className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() =>
                      navigate("/checkout", {
                        state: {
                          product,
                          isBuyNow: true,
                        },
                      })
                    }
                    className="flex-1 border text-gray-700 py-2 rounded hover:bg-gray-100"
                  >
                    Buy Now
                  </button>

                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;