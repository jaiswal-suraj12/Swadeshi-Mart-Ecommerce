
import React, { useEffect, useState, useContext } from "react";
import AppContext from "../Context/AppContext";

const Orders = () => {
  const {
    getUserOrders,
    orders,
    getSingleOrder,
    singleOrder,
  } = useContext(AppContext);

  const [viewOrder, setViewOrder] = useState(false);

  // Fetch orders on load
  useEffect(() => {
    getUserOrders();
  }, []);

  // View single order
  const handleView = async (id) => {
    await getSingleOrder(id);
    setViewOrder(true);
  };

  return (
    <div
      className="
        min-h-screen
        p-6

        bg-gray-100 dark:bg-gray-950
        text-gray-900 dark:text-white

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
        My Orders
      </h1>

      {/* ================= ORDERS LIST ================= */}
      {!viewOrder && (
        <div className="space-y-4">
          {orders?.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No orders found
            </p>
          ) : (
            orders?.map((order) => (
              <div
                key={order._id}
                className="
                  bg-white dark:bg-gray-900

                  border
                  border-gray-200 dark:border-gray-700

                  p-4
                  rounded-xl

                  shadow
                  dark:shadow-black/30

                  flex
                  justify-between
                  items-center

                  transition-colors duration-300
                "
              >
                {/* LEFT */}
                <div>
                  <p
                    className="
                      font-semibold
                      text-gray-900 dark:text-white
                    "
                  >
                    Order ID: {order._id.slice(-6)}
                  </p>

                  <p
                    className="
                      text-sm
                      text-gray-500 dark:text-gray-400
                    "
                  >
                    Total: ₹{order.totalPrice}
                  </p>

                  <p
                    className="
                      text-sm
                      text-gray-700 dark:text-gray-300
                    "
                  >
                    Payment:{" "}
                    <span
                      className={
                        order.paymentStatus === "paid"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-500 dark:text-red-400"
                      }
                    >
                      {order.paymentStatus}
                    </span>
                  </p>

                  <p
                    className="
                      text-sm
                      text-blue-500 dark:text-blue-400
                    "
                  >
                    Status: {order.orderStatus}
                  </p>
                </div>

                {/* RIGHT */}
                <button
                  onClick={() => handleView(order._id)}
                  className="
                    bg-blue-500
                    hover:bg-blue-600
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    transition
                  "
                >
                  View
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* ================= SINGLE ORDER VIEW ================= */}
      {viewOrder && singleOrder && (
        <div
          className="
            bg-white dark:bg-gray-900

            border
            border-gray-200 dark:border-gray-700

            p-6
            rounded-xl

            shadow
            dark:shadow-black/30

            transition-colors duration-300
          "
        >
          {/* BACK */}
          <button
            onClick={() => setViewOrder(false)}
            className="
              text-blue-500
              dark:text-blue-400
              mb-4
              hover:underline
            "
          >
            ← Back
          </button>

          {/* TITLE */}
          <h2
            className="
              text-xl
              font-bold
              mb-4
              text-gray-900 dark:text-white
            "
          >
            Order Details
          </h2>

          {/* ================= BASIC INFO ================= */}
          <div
            className="
              space-y-1
              mb-6
              text-gray-700 dark:text-gray-300
            "
          >
            <p>
              <b className="text-gray-900 dark:text-white">
                Order ID:
              </b>{" "}
              {singleOrder._id}
            </p>

            <p>
              <b className="text-gray-900 dark:text-white">
                Total:
              </b>{" "}
              ₹{singleOrder.totalPrice}
            </p>

            <p>
              <b className="text-gray-900 dark:text-white">
                Status:
              </b>{" "}
              <span className="text-blue-500 dark:text-blue-400">
                {singleOrder.orderStatus}
              </span>
            </p>

            <p>
              <b className="text-gray-900 dark:text-white">
                Payment:
              </b>{" "}
              <span
                className={
                  singleOrder.paymentStatus === "paid"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-500 dark:text-red-400"
                }
              >
                {singleOrder.paymentStatus}
              </span>
            </p>
          </div>

          {/* ================= SHIPPING ================= */}
          <div className="mb-6">
            <h3
              className="
                font-semibold
                mb-2
                text-gray-900 dark:text-white
              "
            >
              Shipping
            </h3>

            <div
              className="
                text-gray-700
                dark:text-gray-300
                space-y-1
              "
            >
              <p>
                {singleOrder.shippingAddress?.fullName}
              </p>

              <p>
                {singleOrder.shippingAddress?.address}
              </p>

              <p>
                {singleOrder.shippingAddress?.city} -{" "}
                {singleOrder.shippingAddress?.postalCode}
              </p>

              <p>
                {singleOrder.shippingAddress?.country}
              </p>
            </div>
          </div>

          {/* ================= ITEMS ================= */}
          <div>
            <h3
              className="
                font-semibold
                mb-2
                text-gray-900 dark:text-white
              "
            >
              Items
            </h3>

            <div className="space-y-2">
              {singleOrder.orderItems?.map((item, index) => (
                <div
                  key={index}
                  className="
                    flex
                    justify-between
                    border-b
                    border-gray-200 dark:border-gray-700
                    pb-2
                    text-gray-700 dark:text-gray-300
                  "
                >
                  <p>
                    {item.name} × {item.quantity}
                  </p>

                  <p
                    className="
                      font-medium
                      text-gray-900 dark:text-white
                    "
                  >
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;