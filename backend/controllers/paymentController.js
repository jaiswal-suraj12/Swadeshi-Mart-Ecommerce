import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/Payment.js";
import Order from "../models/Order.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ CREATE RAZORPAY ORDER (RENAMED)
export const createRazorpayOrder = async (req, res) => {
  try {
    const { orderDbId } = req.body;

    const order = await Order.findById(orderDbId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 🔐 Take amount from DB (SECURE)
    const options = {
      amount: Math.round(order.totalPrice * 100),
      currency: "INR",
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order: razorpayOrder,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ VERIFY PAYMENT
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderDbId,
    } = req.body;

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!orderDbId) {
      return res.status(400).json({ message: "Order ID required" });
    }

    // 🔐 VERIFY SIGNATURE
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }

    const order = await Order.findById(orderDbId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 💾 SAVE PAYMENT
    const payment = await Payment.create({
      user: userId,
      order: orderDbId,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      amount: order.totalPrice,
      status: "paid",
    });

    // ✅ UPDATE ORDER
    order.paymentStatus = "paid";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment successful",
      payment,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ❌ PAYMENT FAILED
export const paymentFailed = async (req, res) => {
  try {
    const { orderDbId } = req.body;

    const userId = req.user?.id;

    const order = await Order.findById(orderDbId);

    await Payment.create({
      user: userId,
      order: orderDbId,
      orderId: "FAILED",
      paymentId: "FAILED",
      amount: order?.totalPrice || 0,
      status: "failed",
    });

    if (order) {
      order.paymentStatus = "failed";
      await order.save();
    }

    res.json({
      success: true,
      message: "Payment failed recorded",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
