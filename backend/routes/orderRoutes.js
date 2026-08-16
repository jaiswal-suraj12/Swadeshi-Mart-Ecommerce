import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// ================= CREATE ORDER =================
router.post("/", authMiddleware, createOrder);

// ================= GET USER ORDERS =================
router.get("/my-orders", authMiddleware, getMyOrders);

// ================= GET SINGLE ORDER =================
router.get("/:id", authMiddleware, getOrderById);

// ================= CANCEL ORDER =================
router.put("/:id/cancel", authMiddleware, (req, res, next) => {
  req.body.orderStatus = "cancelled";
  next();
}, updateOrderStatus);

export default router;