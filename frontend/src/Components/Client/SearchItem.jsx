import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import AppContext from "../../Context/AppContext";

const SearchItem = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { results, loading, searchProducts, addTOCart } =
    useContext(AppContext);

  const query = new URLSearchParams(location.search).get("q");

  const BASE_URL = "http://localhost:3200";

  // ================= SEARCH =================
  useEffect(() => {
    if (query) {
      searchProducts(query);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-6 flex flex-col items-center gap-6">

      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-4">
        Search Results for:{" "}
        <span className="text-blue-500">{query}</span>
      </h1>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-500 text-lg">
          Loading products...
        </p>
      )}

      {/* NO RESULTS */}
      {!loading && Array.isArray(results) && results.length === 0 && (
        <p className="text-center text-gray-500 text-lg">
          No products found
        </p>
      )}

      {/* RESULTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">

        {Array.isArray(results) &&
          results.map((item) => {
            const imageSrc =
              item.image?.startsWith("http")
                ? item.image
                : `${BASE_URL}${item.image}`;

            return (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col"
              >

                {/* IMAGE */}
                <img
                  src={imageSrc}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-xl"
                />

                {/* TITLE */}
                <h2 className="font-semibold text-lg mt-3">
                  {item.title}
                </h2>

                {/* CATEGORY */}
                <p className="text-gray-500 text-sm">
                  {item.category}
                </p>

                {/* PRICE */}
                <p className="text-xl font-bold mt-2">
                  ₹ {item.price}
                </p>

                {/* ADD TO CART */}
                <button
                  onClick={() =>
                    addTOCart(
                      item._id,
                      item.image,
                      item.title,
                      item.description,
                      item.price,
                      1
                    )
                  }
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                >
                  <FaCartArrowDown />
                  Add to Cart
                </button>

              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SearchItem;