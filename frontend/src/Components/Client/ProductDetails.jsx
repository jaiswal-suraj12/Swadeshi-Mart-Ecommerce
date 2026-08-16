import React, { useContext, useEffect, useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { useParams } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import RelatedProduct from "./RelatedProduct";

const ProductDetails = () => {
  const { productId } = useParams();

  const {
    getProductDetailsSingle,
    productsingleDetails,
    addTOCart,
  } = useContext(AppContext);

  const BASE_URL = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        if (productId) {
          await getProductDetailsSingle(productId);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // ================= LOADING =================
  if (loading || !productsingleDetails) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-gray-50 dark:bg-gray-950
          text-gray-900 dark:text-white
          transition-colors duration-300
        "
      >
        <p className="text-lg font-semibold">
          Loading product...
        </p>
      </div>
    );
  }

  const imageSrc =
    productsingleDetails.image?.startsWith("http")
      ? productsingleDetails.image
      : `${BASE_URL}${productsingleDetails.image}`;

  return (
    <>
      {/* ================= PRODUCT DETAILS ================= */}
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-gray-100 dark:bg-gray-950
          p-4
          transition-colors duration-300
        "
      >
        {/* PRODUCT CARD */}
        <div
          className="
            bg-white dark:bg-gray-900
            text-gray-900 dark:text-white

            border
            border-gray-200 dark:border-gray-700

            rounded-2xl
            shadow-lg
            dark:shadow-black/40

            max-w-md
            w-full
            p-6

            transition-colors duration-300
          "
        >
          {/* ================= IMAGE ================= */}
          <img
            src={imageSrc}
            alt={productsingleDetails.title}
            className="
              w-full
              h-64
              object-cover
              rounded-xl
            "
          />

          {/* ================= TITLE ================= */}
          <h2
            className="
              text-2xl
              font-semibold
              mt-4
              text-gray-900 dark:text-white
            "
          >
            {productsingleDetails.title}
          </h2>

          {/* ================= PRICE ================= */}
          <p
            className="
              text-green-600
              dark:text-green-400
              text-xl
              font-bold
              mt-2
            "
          >
            ₹ {productsingleDetails.price}
          </p>

          {/* ================= DESCRIPTION ================= */}
          <p
            className="
              text-gray-600
              dark:text-gray-400
              mt-2
              text-sm
            "
          >
            {productsingleDetails.description}
          </p>

          {/* ================= ADD TO CART ================= */}
          <button
            onClick={() =>
              addTOCart(
                productsingleDetails._id,
                productsingleDetails.image,
                productsingleDetails.title,
                productsingleDetails.description,
                productsingleDetails.price,
                1
              )
            }
            className="
              mt-5
              w-full
              flex
              items-center
              justify-center
              gap-2

              bg-blue-600
              hover:bg-blue-700

              text-white

              py-2
              rounded-lg

              transition
            "
          >
            <FaCartArrowDown />
            Add to Cart
          </button>
        </div>
      </div>

      {/* ================= SEPARATOR ================= */}
      <hr className="border-gray-200 dark:border-gray-800" />

      {/* ================= RELATED PRODUCTS ================= */}
      <RelatedProduct
        category={productsingleDetails?.category}
      />
    </>
  );
};

export default ProductDetails;