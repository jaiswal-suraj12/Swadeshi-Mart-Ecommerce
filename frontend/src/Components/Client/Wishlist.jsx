import React, { useContext } from "react";
import AppContext from "../../Context/AppContext";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addTOCart } =
    useContext(AppContext);

  // Empty wishlist
  if (!wishlist.length) {
    return (
      <div
        className="
          min-h-screen
          flex items-center justify-center
          bg-gray-50 dark:bg-gray-950
          text-gray-900 dark:text-white
          transition-colors duration-300
        "
      >
        <p className="text-center text-gray-500 dark:text-gray-400">
          Your wishlist is empty ❤️
        </p>
      </div>
    );
  }

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

        {/* TITLE */}
        <h1
          className="
            text-2xl
            font-bold
            mb-6
            text-gray-900 dark:text-white
          "
        >
          My Wishlist
        </h1>

        {/* PRODUCTS */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-6
          "
        >
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="
                relative

                bg-white dark:bg-gray-900

                border
                border-gray-200 dark:border-gray-700

                rounded-lg

                shadow-md
                dark:shadow-black/30

                p-4

                transition-all duration-300

                hover:shadow-lg
                dark:hover:shadow-black/50
              "
            >
              {/* IMAGE */}
              <img
                src={product.image}
                alt={product.title}
                className="
                  w-full
                  h-48
                  object-cover
                  rounded
                  cursor-pointer
                "
              />

              {/* TITLE */}
              <h2
                className="
                  text-lg
                  font-semibold
                  mt-2
                  text-gray-900 dark:text-white
                "
              >
                {product.title}
              </h2>

              {/* DESCRIPTION */}
              <p
                className="
                  text-gray-500
                  dark:text-gray-400
                  text-sm
                  mt-1
                "
              >
                {product.description}
              </p>

              {/* PRICE */}
              <p
                className="
                  text-green-600
                  dark:text-green-400
                  font-bold
                  mt-1
                "
              >
                ₹ {product.price}
              </p>

              {/* ACTION BUTTONS */}
              <div className="mt-3 flex gap-2">

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

                    flex
                    items-center
                    justify-center
                    gap-2

                    transition
                  "
                >
                  <FaShoppingCart />
                  Add to Cart
                </button>

                {/* REMOVE */}
                <button
                  onClick={() =>
                    removeFromWishlist(product._id)
                  }
                  className="
                    flex-1

                    border
                    border-pink-500

                    text-pink-500
                    dark:text-pink-400

                    py-2
                    rounded

                    hover:bg-pink-50
                    dark:hover:bg-pink-950

                    flex
                    items-center
                    justify-center
                    gap-2

                    transition
                  "
                >
                  <FaHeart />
                  Remove
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;