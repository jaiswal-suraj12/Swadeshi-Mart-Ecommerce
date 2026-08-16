import express from "express";
import {
  createRazorpayOrder,
  verifyPayment,
  paymentFailed,
} from "../controllers/paymentController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE RAZORPAY ORDER
router.post("/create-order", authMiddleware, createRazorpayOrder);

// VERIFY PAYMENT
router.post("/verify", authMiddleware, verifyPayment);

// FAILED PAYMENT
router.post("/failed", authMiddleware, paymentFailed);

export default router;