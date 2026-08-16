
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppContext from "../../Context/AppContext";

const RelatedProduct = ({ category }) => {
  const [products, setProducts] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const { addTOCart } = useContext(AppContext);

  useEffect(() => {
    const fetchRelated = async () => {
      if (!category) return;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/category`,
          {
            params: { category },
          }
        );

        const data = res.data?.products || res.data || [];
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error.message);
        setProducts([]);
      }
    };

    fetchRelated();
  }, [category]);

  return (
    <div
      className="
        my-8
        px-4
        text-gray-900 dark:text-white
        transition-colors duration-300
      "
    >
      {/* ================= TITLE ================= */}
      <h2
        className="
          text-2xl
          font-semibold
          mb-4
          text-gray-900 dark:text-white
        "
      >
        Related Products
      </h2>

      {/* ================= PRODUCTS ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {products.map((product) => {
          const imageSrc = product.image?.startsWith("http")
            ? product.image
            : `${BASE_URL}${product.image}`;

          return (
            <div
              key={product._id}
              className="
                border
                border-gray-200 dark:border-gray-700

                bg-white dark:bg-gray-900

                text-gray-900 dark:text-white

                rounded-lg
                p-4

                shadow-sm
                dark:shadow-black/30

                hover:shadow-lg
                dark:hover:shadow-black/50

                transition-all duration-300

                flex flex-col
              "
            >
              {/* ================= IMAGE ================= */}
              <img
                src={imageSrc}
                alt={product.title}
                className="
                  w-full
                  h-32
                  object-cover
                  mb-2
                  rounded
                  cursor-pointer
                "
                onClick={() =>
                  navigate(`/product/details/${product._id}`)
                }
              />

              {/* ================= TITLE ================= */}
              <h3
                className="
                  font-medium
                  text-gray-900 dark:text-white
                "
              >
                {product.title}
              </h3>

              {/* ================= PRICE ================= */}
              <p
                className="
                  text-gray-600
                  dark:text-gray-400
                  mb-2
                "
              >
                ₹ {product.price}
              </p>

              {/* ================= BUTTONS ================= */}
              <div className="mt-auto flex gap-2">

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
                    bg-green-500
                    text-white
                    py-1
                    rounded

                    hover:bg-green-600

                    cursor-pointer
                    transition
                  "
                >
                  Buy Now
                </button>

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
                    bg-blue-500
                    text-white
                    py-1
                    rounded

                    hover:bg-blue-600

                    cursor-pointer
                    transition
                  "
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProduct;