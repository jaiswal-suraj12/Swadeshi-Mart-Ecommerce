
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { cart, selectedAddress, totalPrice } = location.state || {};

  if (!cart) {
    return (
      <p
        className="
          text-center
          mt-10
          text-gray-700
          dark:text-gray-300
        "
      >
        No order found
      </p>
    );
  }

  return (
    <div
      className="
        min-h-screen
        bg-gray-100
        dark:bg-gray-950

        p-6
        flex
        justify-center

        transition-colors
        duration-300
      "
    >
      <div
        className="
          bg-white
          dark:bg-gray-900

          border
          border-gray-200
          dark:border-gray-700

          p-6
          rounded-xl

          shadow-md
          dark:shadow-black/30

          w-full
          max-w-2xl

          transition-colors
          duration-300
        "
      >
        {/* SUCCESS TITLE */}
        <h1
          className="
            text-2xl
            font-bold

            text-green-600
            dark:text-green-400

            mb-4
          "
        >
          Order Placed Successfully!
        </h1>

        {/* ================= ADDRESS ================= */}
        <div className="mb-6">
          <h2
            className="
              font-semibold
              mb-2

              text-gray-900
              dark:text-white
            "
          >
            Shipping Address
          </h2>

          <div
            className="
              text-gray-700
              dark:text-gray-300

              space-y-1
            "
          >
            <p>{selectedAddress?.fullName}</p>

            <p>
              {selectedAddress?.address},{" "}
              {selectedAddress?.city},{" "}
              {selectedAddress?.state}
            </p>

            <p>
              {selectedAddress?.country} -{" "}
              {selectedAddress?.pincode}
            </p>

            <p>
              {selectedAddress?.phoneNumber}
            </p>
          </div>
        </div>

        {/* ================= ITEMS ================= */}
        <div className="mb-6">
          <h2
            className="
              font-semibold
              mb-3

              text-gray-900
              dark:text-white
            "
          >
            Items
          </h2>

          <div className="space-y-2">
            {cart.map((item) => (
              <div
                key={item.productId || item.product}
                className="
                  flex
                  justify-between

                  text-sm

                  text-gray-700
                  dark:text-gray-300

                  border-b
                  border-gray-200
                  dark:border-gray-700

                  pb-2
                "
              >
                <span>{item.title}</span>

                <span>
                  ₹{item.price} × {item.qty || item.quantity || 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= TOTAL ================= */}
        <div
          className="
            flex
            justify-between

            font-bold
            text-lg

            text-green-600
            dark:text-green-400

            mb-6

            border-t
            border-gray-200
            dark:border-gray-700

            pt-4
          "
        >
          <span>Total</span>

          <span>₹{totalPrice}</span>
        </div>

        {/* ================= CONTINUE SHOPPING ================= */}
        <button
          onClick={() => navigate("/")}
          className="
            w-full

            bg-blue-600
            hover:bg-blue-700

            dark:bg-blue-500
            dark:hover:bg-blue-600

            text-white

            py-2
            rounded

            transition
          "
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;