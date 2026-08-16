
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ================= SAFE DATA =================
  const cart =
    location.state?.cart ||
    JSON.parse(localStorage.getItem("cart")) ||
    [];

  const selectedAddress =
    location.state?.selectedAddress ||
    JSON.parse(localStorage.getItem("address"));

  const totalPrice =
    Number(location.state?.totalPrice) ||
    Number(localStorage.getItem("totalPrice")) ||
    cart.reduce((acc, item) => {
      const quantity = Number(item.quantity ?? item.qty ?? 1);
      return acc + Number(item.price || 0) * quantity;
    }, 0);

  const orderItems = cart.map((item) => ({
    product: item.product || item.productId,
    quantity: Number(item.quantity ?? item.qty ?? 1),
  }));

  const shippingAddress = selectedAddress
    ? {
        fullName: selectedAddress.fullName,
        phone: selectedAddress.phone || selectedAddress.phoneNumber,
        address: selectedAddress.address,
        city: selectedAddress.city,
        country: selectedAddress.country,
        postalCode:
          selectedAddress.postalCode || selectedAddress.pincode,
      }
    : null;

  // ================= VALIDATION =================
  useEffect(() => {
    if (!cart.length) {
      toast.error("Cart is empty");
      navigate("/checkout");
    }

    if (!selectedAddress) {
      toast.error("Select address first");
      navigate("/checkout");
    }
  }, []);

  // ================= PAYMENT =================
  const handlePayment = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("UserToken");

      if (!token) {
        toast.error("User not logged in");
        navigate("/login");
        return;
      }

      if (
        !orderItems.every(
          (item) => item.product && item.quantity > 0
        )
      ) {
        toast.error("Invalid cart items");
        navigate("/cart");
        return;
      }

      if (
        !shippingAddress?.fullName ||
        !shippingAddress?.phone ||
        !shippingAddress?.address ||
        !shippingAddress?.city ||
        !shippingAddress?.country ||
        !shippingAddress?.postalCode
      ) {
        toast.error("Please select a complete shipping address");
        navigate("/checkout");
        return;
      }

      if (!window.Razorpay) {
        toast.error("Payment gateway failed to load");
        return;
      }

      // ================= 1. CREATE ORDER =================
      const orderRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        {
          orderItems,
          shippingAddress,
          paymentMethod: "UPI",
          totalPrice: totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const orderDbId = orderRes.data._id;

      // ================= 2. CREATE RAZORPAY ORDER =================
      const { data } = await axios.post(
       `${import.meta.env.VITE_API_URL}/api/payment/create-order` ,
        {
          orderDbId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const razorpayOrder = data.order;

      // ================= 3. OPEN RAZORPAY =================
      const options = {
        key: "rzp_test_SbrfVdEavo2K45",
        amount: razorpayOrder.amount,
        currency: "INR",
        order_id: razorpayOrder.id,

        handler: async (response) => {
          try {
            await axios.post(
              `${import.meta.env.VITE_API_URL}/api/payment/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderDbId,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            toast.success("Payment Successful");

            localStorage.removeItem("cart");
            localStorage.removeItem("address");
            localStorage.removeItem("totalPrice");

            navigate("/order-success");
          } catch (err) {
            console.error(err);
            toast.error("Payment verification failed");
          }
        },

        prefill: {
          name: selectedAddress?.fullName,
          contact: selectedAddress?.phone,
        },

        theme: {
          color: "#16a34a",
        },

        modal: {
          ondismiss: function () {
            toast.error("Payment Cancelled");
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", async function () {
        await axios.post(
         `${import.meta.env.VITE_API_URL}/api/payment/failed`,
          {
            orderDbId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.error("Payment Failed");
      });

      rzp.open();
    } catch (error) {
      console.log("========== PAYMENT ERROR ==========");
      console.log("Error:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Response Data:", error.response.data);
      }

      toast.error(
        error.response?.data?.message || "Payment failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        justify-center
        items-center
        p-6

        bg-gray-100
        dark:bg-gray-950

        transition-colors
        duration-300
      "
    >
      <div
        className="
          w-full
          max-w-md

          bg-white
          dark:bg-gray-900

          border
          border-gray-200
          dark:border-gray-700

          p-6
          rounded-2xl

          shadow-lg
          dark:shadow-black/30

          transition-colors
          duration-300
        "
      >
        {/* TITLE */}
        <h2
          className="
            text-xl
            font-bold

            text-gray-900
            dark:text-white
          "
        >
          Payment
        </h2>

        {/* TOTAL */}
        <div
          className="
            mt-4
            p-4
            rounded-lg

            bg-gray-50
            dark:bg-gray-800

            border
            border-gray-200
            dark:border-gray-700
          "
        >
          <p
            className="
              text-sm
              text-gray-500
              dark:text-gray-400
            "
          >
            Total Amount
          </p>

          <h3
            className="
              text-green-600
              dark:text-green-400

              text-2xl
              font-bold
              mt-1
            "
          >
            ₹{totalPrice}
          </h3>
        </div>

        {/* PAYMENT BUTTON */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className="
            w-full

            bg-green-600
            hover:bg-green-700

            dark:bg-green-500
            dark:hover:bg-green-600

            disabled:bg-gray-400
            dark:disabled:bg-gray-700

            text-white
            py-3
            mt-5
            rounded-lg

            font-semibold

            transition
          "
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default Payment;