
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { getuserCart, userCart, removeCart, clearCart } =
    useContext(AppContext);

  const [qty, setQty] = useState({});
  const navigate = useNavigate();
  const MAX_CART_ITEMS = 20;

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getuserCart();
  }, []);

  // ================= TOTAL ITEMS =================
  const totalItems = userCart?.reduce((acc, item) => {
    return acc + (qty[item.productId] || item.qty || item.quantity || 1);
  }, 0);

  // ================= TOTAL PRICE =================
  const totalPrice = userCart?.reduce((acc, item) => {
    const itemQty =
      qty[item.productId] || item.qty || item.quantity || 1;

    return acc + Number(item.price || 0) * Number(itemQty);
  }, 0);

  // ================= INCREASE =================
  const increase = (productId) => {
    if (totalItems >= MAX_CART_ITEMS) {
      toast.warning(`Max ${MAX_CART_ITEMS} items allowed`);
      return;
    }

    setQty((prev) => ({
      ...prev,
      [productId]:
        (prev[productId] ||
          userCart.find((item) => item.productId === productId)?.qty ||
          userCart.find((item) => item.productId === productId)?.quantity ||
          1) + 1,
    }));
  };

  // ================= DECREASE =================
  const decrease = (productId) => {
    const currentQty =
      qty[productId] ||
      userCart.find((item) => item.productId === productId)?.qty ||
      userCart.find((item) => item.productId === productId)?.quantity ||
      1;

    if (currentQty > 1) {
      setQty((prev) => ({
        ...prev,
        [productId]: currentQty - 1,
      }));
    } else {
      handleRemove(productId);
    }
  };

  // ================= REMOVE =================
  const handleRemove = (productId) => {
    removeCart(productId);

    setQty((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });

    toast.success("Item removed ✅");
  };

  // ================= CLEAR CART =================
  const handleClearCart = () => {
    if (!userCart?.length) {
      toast.info("Cart already empty");
      return;
    }

    clearCart();
    setQty({});
    toast.success("Cart cleared ✅");
  };

  // ================= CHECKOUT =================
  const handleCheckout = () => {
    if (!userCart || userCart.length === 0) {
      toast.error("Cart is empty ⚠️");
      return;
    }

    const updatedCart = userCart.map((item) => ({
      product: item.productId,
      image: item.image,
      title: item.title,
      price: Number(item.price),
      quantity:
        qty[item.productId] || item.qty || item.quantity || 1,
    }));

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    navigate("/checkout", {
      state: {
        cart: updatedCart,
        isBuyNow: false,
      },
    });
  };

  return (
    <div
      className="
        min-h-screen
        bg-gray-100 dark:bg-gray-950
        text-gray-900 dark:text-white
        p-6
        transition-colors duration-300
      "
    >
      <div
        className="
          max-w-6xl
          mx-auto
          bg-white dark:bg-gray-900
          rounded-xl
          shadow
          dark:shadow-black/30
          border border-transparent
          dark:border-gray-800
          p-6
          transition-colors duration-300
        "
      >
        {/* ================= TITLE ================= */}
        <h1
          className="
            text-2xl
            font-bold
            mb-6
            text-gray-900 dark:text-white
          "
        >
          Shopping Cart
        </h1>

        {/* ================= EMPTY CART ================= */}
        {!userCart || userCart.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            Cart is empty
          </p>
        ) : (
          <>
            {/* ================= CART ITEMS ================= */}
            <div className="space-y-4">
              {userCart.map((item) => {
                const itemQty =
                  qty[item.productId] ||
                  item.qty ||
                  item.quantity ||
                  1;

                const imageSrc = item.image
                  ? item.image.startsWith("http")
                    ? item.image
                    : `${BASE_URL}${item.image}`
                  : "/no-image.png";

                return (
                  <div
                    key={item.productId}
                    className="
                      flex
                      flex-col
                      sm:flex-row
                      justify-between
                      items-start
                      sm:items-center
                      gap-4

                      border
                      border-gray-200 dark:border-gray-700

                      bg-gray-50 dark:bg-gray-800

                      p-4
                      rounded-lg

                      transition-colors duration-300
                    "
                  >
                    {/* ================= PRODUCT INFO ================= */}
                    <div className="flex items-center gap-4">
                      <img
                        src={imageSrc}
                        alt="product"
                        className="
                          w-20
                          h-20
                          object-cover
                          rounded
                        "
                      />

                      <div>
                        <h2
                          className="
                            font-semibold
                            text-gray-900 dark:text-white
                          "
                        >
                          {item.title}
                        </h2>

                        <p className="text-green-600 dark:text-green-400">
                          ₹{item.price}
                        </p>
                      </div>
                    </div>

                    {/* ================= QUANTITY + REMOVE ================= */}
                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        text-gray-900 dark:text-white
                      "
                    >
                      {/* DECREASE */}
                      <button
                        onClick={() =>
                          decrease(item.productId)
                        }
                        className="
                          w-8
                          h-8
                          rounded
                          border
                          border-gray-300 dark:border-gray-600
                          bg-white dark:bg-gray-900
                          hover:bg-gray-100
                          dark:hover:bg-gray-700
                          transition
                        "
                      >
                        -
                      </button>

                      {/* QUANTITY */}
                      <span
                        className="
                          min-w-6
                          text-center
                          font-semibold
                        "
                      >
                        {itemQty}
                      </span>

                      {/* INCREASE */}
                      <button
                        onClick={() =>
                          increase(item.productId)
                        }
                        className="
                          w-8
                          h-8
                          rounded
                          border
                          border-gray-300 dark:border-gray-600
                          bg-white dark:bg-gray-900
                          hover:bg-gray-100
                          dark:hover:bg-gray-700
                          transition
                        "
                      >
                        +
                      </button>

                      {/* REMOVE */}
                      <button
                        onClick={() =>
                          handleRemove(item.productId)
                        }
                        className="
                          text-red-500
                          hover:text-red-600
                          dark:text-red-400
                          dark:hover:text-red-300
                          transition
                        "
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ================= TOTAL ================= */}
            <div
              className="
                mt-6
                pt-6
                border-t
                border-gray-200 dark:border-gray-700

                flex
                flex-col
                sm:flex-row
                justify-between
                items-start
                sm:items-center
                gap-4
              "
            >
              {/* TOTAL INFO */}
              <div>
                <p className="text-gray-700 dark:text-gray-300">
                  Total Items: {totalItems}
                </p>

                <p
                  className="
                    text-xl
                    font-bold
                    text-green-600 dark:text-green-400
                  "
                >
                  ₹{totalPrice}
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3">
                {/* CLEAR */}
                <button
                  onClick={handleClearCart}
                  className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-4
                    py-2
                    rounded
                    transition
                  "
                >
                  Clear
                </button>

                {/* CHECKOUT */}
                <button
                  onClick={handleCheckout}
                  className="
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    px-4
                    py-2
                    rounded
                    transition
                  "
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;