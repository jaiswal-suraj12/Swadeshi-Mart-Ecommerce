// import React, { useState, useEffect } from "react";
// import Shipping from "../Shipping";
// import { toast } from "react-toastify";
// import { useNavigate, useLocation } from "react-router-dom";

// const Checkout = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const BASE_URL = "http://localhost:3200";

//   const isBuyNow = location.state?.isBuyNow;
//   const buyNowProduct = location.state?.product;

//   // ✅ FIXED CART STRUCTURE (MATCH BACKEND)
//   const cart =
//     isBuyNow && buyNowProduct
//       ? [
//           {
//             product: buyNowProduct._id,
//             image: buyNowProduct.image,
//             title: buyNowProduct.title,
//             price: buyNowProduct.price,
//             quantity: 1,
//           },
//         ]
//       : location.state?.cart ||
//         JSON.parse(localStorage.getItem("cart")) ||
//         [];

//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [cartState, setCartState] = useState(cart);

//   // ================= REMOVE ITEM =================
//   const removeItem = (id) => {
//     const updated = cartState.filter((item) => item.product !== id);
//     setCartState(updated);
//   };

//   // ================= UPDATE QTY =================
//   const updateQty = (id, change) => {
//     const updated = cartState.map((item) => {
//       if (item.product === id) {
//         const newQty = item.quantity + change;
//         return {
//           ...item,
//           quantity: newQty > 0 ? newQty : 1,
//         };
//       }
//       return item;
//     });

//     setCartState(updated);
//   };

//   // ================= BUY NOW VALIDATION =================
//   useEffect(() => {
//     if (isBuyNow && !cartState.length) {
//       toast.error("Buy Now session expired");
//       navigate("/");
//     }
//   }, [isBuyNow, cartState.length, navigate]);

//   if (cartState.length === 0) {
//     return (
//       <div className="p-6 text-center">
//         <p className="text-lg font-semibold">No items to checkout</p>
//         <button
//           onClick={() => navigate("/")}
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
//         >
//           Go Shopping
//         </button>
//       </div>
//     );
//   }

//   // ================= TOTAL PRICE =================
//   const totalPrice = cartState.reduce((acc, item) => {
//     return acc + Number(item.price || 0) * Number(item.quantity || 1);
//   }, 0);

//   // ================= PAYMENT HANDLER =================
//   const handlePayment = () => {
//     if (!cartState.length) {
//       toast.error("Cart is empty!");
//       return;
//     }

//     if (!selectedAddress) {
//       toast.error("Select address!");
//       return;
//     }

//     localStorage.setItem("address", JSON.stringify(selectedAddress));
//     localStorage.setItem("totalPrice", totalPrice);

//     navigate("/payment", {
//       state: {
//         cart: cartState, // ✅ now correct structure
//         selectedAddress,
//         totalPrice,
//         isBuyNow,
//       },
//     });
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gray-100 grid lg:grid-cols-3 gap-6">

//       {/* LEFT */}
//       <div className="lg:col-span-2 bg-white p-6 rounded shadow">
//         <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
//         <Shipping onSelectAddress={setSelectedAddress} />
//       </div>

//       {/* RIGHT */}
//       <div className="bg-white p-6 rounded shadow">
//         <h2 className="text-xl font-semibold mb-1">
//           {isBuyNow ? "Buy Now Order" : "Cart Order"}
//         </h2>

//         <h2 className="text-lg mb-4 text-gray-600">Order Summary</h2>

//         <div className="space-y-4">
//           {cartState.map((item) => {
//             const imageSrc =
//               typeof item.image === "string" && item.image
//                 ? item.image.startsWith("http")
//                   ? item.image
//                   : `${BASE_URL}${item.image}`
//                 : "/no-image.png";

//             return (
//               <div
//                 key={item.product}
//                 className="flex justify-between items-center text-sm"
//               >
//                 {/* PRODUCT INFO */}
//                 <div className="flex items-center gap-2">
//                   <img
//                     src={imageSrc}
//                     alt="product"
//                     className="w-10 h-10 rounded object-cover"
//                   />
//                   <span>{item.title}</span>
//                 </div>

//                 {/* REMOVE */}
//                 <button
//                   onClick={() => removeItem(item.product)}
//                   className="text-red-500 text-xs ml-2"
//                 >
//                   Remove
//                 </button>

//                 {/* QTY */}
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => updateQty(item.product, -1)}
//                     className="px-2 bg-gray-200"
//                   >
//                     -
//                   </button>

//                   <span>{item.quantity}</span>

//                   <button
//                     onClick={() => updateQty(item.product, 1)}
//                     className="px-2 bg-gray-200"
//                   >
//                     +
//                   </button>
//                 </div>

//                 {/* PRICE */}
//                 <span>
//                   ₹{Number(item.price) * Number(item.quantity)}
//                 </span>
//               </div>
//             );
//           })}

//           <hr />

//           <div className="flex justify-between font-bold text-green-600">
//             <span>Total</span>
//             <span>₹{totalPrice}</span>
//           </div>

//           <button
//             onClick={handlePayment}
//             disabled={!selectedAddress}
//             className="w-full bg-green-600 text-white py-2 mt-4 rounded disabled:opacity-50"
//           >
//             Proceed to Payment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

import React, { useState, useEffect } from "react";
import Shipping from "../Shipping";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const BASE_URL = "http://localhost:3200";

  const isBuyNow = location.state?.isBuyNow;
  const buyNowProduct = location.state?.product;

  // ================= CART =================
  const cart =
    isBuyNow && buyNowProduct
      ? [
          {
            product: buyNowProduct._id,
            image: buyNowProduct.image,
            title: buyNowProduct.title,
            price: buyNowProduct.price,
            quantity: 1,
          },
        ]
      : location.state?.cart ||
        JSON.parse(localStorage.getItem("cart")) ||
        [];

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cartState, setCartState] = useState(cart);

  // ================= REMOVE ITEM =================
  const removeItem = (id) => {
    const updated = cartState.filter((item) => item.product !== id);
    setCartState(updated);
  };

  // ================= UPDATE QTY =================
  const updateQty = (id, change) => {
    const updated = cartState.map((item) => {
      if (item.product === id) {
        const newQty = item.quantity + change;

        return {
          ...item,
          quantity: newQty > 0 ? newQty : 1,
        };
      }

      return item;
    });

    setCartState(updated);
  };

  // ================= BUY NOW VALIDATION =================
  useEffect(() => {
    if (isBuyNow && !cartState.length) {
      toast.error("Buy Now session expired");
      navigate("/");
    }
  }, [isBuyNow, cartState.length, navigate]);

  // ================= EMPTY =================
  if (cartState.length === 0) {
    return (
      <div
        className="
          min-h-screen
          p-6
          flex
          flex-col
          items-center
          justify-center
          text-center

          bg-gray-100 dark:bg-gray-950
          text-gray-900 dark:text-white

          transition-colors duration-300
        "
      >
        <p className="text-lg font-semibold">
          No items to checkout
        </p>

        <button
          onClick={() => navigate("/")}
          className="
            mt-4
            px-4
            py-2
            bg-blue-600
            hover:bg-blue-700
            text-white
            rounded
            transition
          "
        >
          Go Shopping
        </button>
      </div>
    );
  }

  // ================= TOTAL PRICE =================
  const totalPrice = cartState.reduce((acc, item) => {
    return (
      acc +
      Number(item.price || 0) *
        Number(item.quantity || 1)
    );
  }, 0);

  // ================= PAYMENT =================
  const handlePayment = () => {
    if (!cartState.length) {
      toast.error("Cart is empty!");
      return;
    }

    if (!selectedAddress) {
      toast.error("Select address!");
      return;
    }

    localStorage.setItem(
      "address",
      JSON.stringify(selectedAddress)
    );

    localStorage.setItem("totalPrice", totalPrice);

    navigate("/payment", {
      state: {
        cart: cartState,
        selectedAddress,
        totalPrice,
        isBuyNow,
      },
    });
  };

  return (
    <div
      className="
        min-h-screen
        p-6

        bg-gray-100 dark:bg-gray-950
        text-gray-900 dark:text-white

        grid
        lg:grid-cols-3
        gap-6

        transition-colors duration-300
      "
    >
      {/* ================= LEFT ================= */}
      <div
        className="
          lg:col-span-2

          bg-white dark:bg-gray-900

          border
          border-gray-200 dark:border-gray-700

          p-6
          rounded
          shadow

          dark:shadow-black/30

          transition-colors duration-300
        "
      >
        <h2
          className="
            text-xl
            font-semibold
            mb-4
            text-gray-900 dark:text-white
          "
        >
          Shipping Address
        </h2>

        <Shipping
          onSelectAddress={setSelectedAddress}
        />
      </div>

      {/* ================= RIGHT ================= */}
      <div
        className="
          bg-white dark:bg-gray-900

          border
          border-gray-200 dark:border-gray-700

          p-6
          rounded
          shadow

          dark:shadow-black/30

          transition-colors duration-300
        "
      >
        {/* TITLE */}
        <h2
          className="
            text-xl
            font-semibold
            mb-1
            text-gray-900 dark:text-white
          "
        >
          {isBuyNow ? "Buy Now Order" : "Cart Order"}
        </h2>

        <h2
          className="
            text-lg
            mb-4
            text-gray-600 dark:text-gray-400
          "
        >
          Order Summary
        </h2>

        {/* PRODUCTS */}
        <div className="space-y-4">
          {cartState.map((item) => {
            const imageSrc =
              typeof item.image === "string" &&
              item.image
                ? item.image.startsWith("http")
                  ? item.image
                  : `${BASE_URL}${item.image}`
                : "/no-image.png";

            return (
              <div
                key={item.product}
                className="
                  flex
                  flex-wrap
                  justify-between
                  items-center
                  gap-3

                  text-sm

                  border-b
                  border-gray-200 dark:border-gray-700

                  pb-4
                "
              >
                {/* PRODUCT INFO */}
                <div className="flex items-center gap-2">
                  <img
                    src={imageSrc}
                    alt="product"
                    className="
                      w-10
                      h-10
                      rounded
                      object-cover
                    "
                  />

                  <span
                    className="
                      text-gray-900
                      dark:text-white
                    "
                  >
                    {item.title}
                  </span>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() =>
                    removeItem(item.product)
                  }
                  className="
                    text-red-500
                    hover:text-red-600
                    dark:text-red-400
                    dark:hover:text-red-300
                    text-xs
                    ml-2
                    transition
                  "
                >
                  Remove
                </button>

                {/* QTY */}
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <button
                    onClick={() =>
                      updateQty(item.product, -1)
                    }
                    className="
                      px-2
                      rounded

                      bg-gray-200
                      dark:bg-gray-700

                      text-gray-900
                      dark:text-white

                      hover:bg-gray-300
                      dark:hover:bg-gray-600

                      transition
                    "
                  >
                    -
                  </button>

                  <span
                    className="
                      min-w-5
                      text-center
                      text-gray-900
                      dark:text-white
                    "
                  >
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQty(item.product, 1)
                    }
                    className="
                      px-2
                      rounded

                      bg-gray-200
                      dark:bg-gray-700

                      text-gray-900
                      dark:text-white

                      hover:bg-gray-300
                      dark:hover:bg-gray-600

                      transition
                    "
                  >
                    +
                  </button>
                </div>

                {/* PRICE */}
                <span
                  className="
                    font-medium
                    text-gray-900
                    dark:text-white
                  "
                >
                  ₹
                  {Number(item.price) *
                    Number(item.quantity)}
                </span>
              </div>
            );
          })}

          {/* TOTAL */}
          <div
            className="
              flex
              justify-between
              font-bold

              text-green-600
              dark:text-green-400
            "
          >
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>

          {/* PAYMENT */}
          <button
            onClick={handlePayment}
            disabled={!selectedAddress}
            className="
              w-full

              bg-green-600
              hover:bg-green-700

              text-white

              py-2
              mt-4
              rounded

              disabled:opacity-50
              disabled:cursor-not-allowed

              transition
            "
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;