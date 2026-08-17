import React, { useContext, useEffect ,useMemo,useState } from "react";
import AppContext from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import CategoryLinks from "./CategoryLinks";

const Product = () => {
  const {
    Allproducts,
    allProducts,
    addTOCart,
    addToWishlist,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_URL;
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    Allproducts();
  }, []);
const sortedProducts = useMemo(() => {
  const products = [...allProducts];

  switch (sortBy) {
    case "price-low":
      return products.sort(
        (a, b) => Number(a.price) - Number(b.price)
      );

    case "price-high":
      return products.sort(
        (a, b) => Number(b.price) - Number(a.price)
      );

    case "name-az":
      return products.sort((a, b) =>
        a.title.localeCompare(b.title)
      );

    case "name-za":
      return products.sort((a, b) =>
        b.title.localeCompare(a.title)
      );

    default:
      return products;
  }
}, [allProducts, sortBy]);
  return (
    <div
      className="
        min-h-screen
        bg-gray-50 dark:bg-gray-950
        text-gray-900 dark:text-white
        transition-colors duration-300
      "
    >
      <div className="container mx-auto px-4 py-8">

        {/* CATEGORY LINKS */}
        <CategoryLinks />

        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

  <div>
    <h2 className="text-xl font-bold">
      All Products
    </h2>

    <p className="text-sm text-gray-500 dark:text-gray-400">
      {allProducts.length} products found
    </p>
  </div>

  <div className="flex items-center gap-2">
    <label
      htmlFor="sort"
      className="font-medium text-gray-700 dark:text-gray-300"
    >
      Sort by:
    </label>

    <select
      id="sort"
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="
        rounded-lg
        border border-gray-300
        dark:border-gray-600
        bg-white dark:bg-gray-800
        text-gray-800 dark:text-white
        px-4 py-2
        outline-none
        focus:ring-2
        focus:ring-blue-500
      "
    >
      <option value="default">Featured</option>
      <option value="price-low">Price: Low to High</option>
      <option value="price-high">Price: High to Low</option>
      <option value="name-az">Name: A to Z</option>
      <option value="name-za">Name: Z to A</option>
    </select>
  </div>

</div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {sortedProducts.map((product) => {

            const imageSrc =
              product.image?.startsWith("http")
                ? product.image
                : `${BASE_URL}${product.image}`;

            return (
              <div
                key={product._id}
                className="
                  bg-white dark:bg-gray-900
                  border border-gray-200 dark:border-gray-700
                  rounded-lg
                  shadow-md dark:shadow-black/30
                  overflow-hidden
                  hover:shadow-lg dark:hover:shadow-black/50
                  transition-all duration-300
                "
              >

                {/* IMAGE */}
                <img
                  onClick={() =>
                    navigate(`/product/details/${product._id}`)
                  }
                  className="
                    w-full h-64
                    object-cover
                    cursor-pointer
                  "
                  src={imageSrc}
                  alt={product.title}
                />

                <div className="p-4">

                  {/* PRODUCT TITLE */}
                  <h2
                    className="
                      text-lg
                      font-semibold
                      text-gray-800 dark:text-white
                      hover:text-blue-600
                      dark:hover:text-blue-400
                      cursor-pointer
                      transition
                    "
                    onClick={() =>
                      navigate(`/product/details/${product._id}`)
                    }
                  >
                    {product.title}
                  </h2>

                  {/* DESCRIPTION */}
                  <p
                    className="
                      text-gray-500 dark:text-gray-400
                      text-sm
                      mt-2
                    "
                  >
                    {product.description}
                  </p>

                  {/* PRICE */}
                  <div className="mt-4 flex justify-between">
                    <span
                      className="
                        text-xl
                        font-bold
                        text-gray-900 dark:text-white
                      "
                    >
                      ₹ {product.price}
                    </span>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="mt-4 flex gap-2">

                    {/* ADD TO CART */}
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
                      className="
                        flex-1
                        bg-blue-600
                        text-white
                        py-2
                        rounded
                        hover:bg-blue-700
                        transition
                      "
                    >
                      Add to Cart
                    </button>

                    {/* WISHLIST */}
                    <button
                      onClick={() =>
                        addToWishlist({
                          _id: product._id,
                          image: product.image,
                          title: product.title,
                          description: product.description,
                          price: product.price,
                        })
                      }
                      className="
                        flex-1
                        border border-pink-500
                        text-pink-500
                        dark:text-pink-400
                        py-2
                        rounded
                        hover:bg-pink-50
                        dark:hover:bg-pink-950
                        transition
                      "
                    >
                      ❤️Wishlist
                    </button>

                    {/* BUY NOW */}
                    <button
                      onClick={() =>
                        navigate("/checkout", {
                          state: {
                            product,
                            isBuyNow: true,
                          },
                        })
                      }
                      className="
                        flex-1
                        border
                        border-gray-300 dark:border-gray-600
                        text-gray-700 dark:text-gray-200
                        py-2
                        rounded
                        hover:bg-gray-100
                        dark:hover:bg-gray-800
                        transition
                      "
                    >
                      Buy
                    </button>

                  </div>

                </div>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default Product;