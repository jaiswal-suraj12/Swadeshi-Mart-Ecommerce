import express from "express";
import {
  addToCart,
  clearCart,
  removeProductFromCart,
  userCart,
} from "../controllers/cartController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// ================= ADD TO CART =================
router.post("/add", authMiddleware, addToCart);

// ================= GET USER CART =================
router.get("/user", authMiddleware, userCart);

// ================= REMOVE ITEM =================
router.delete("/remove/:productId", authMiddleware, removeProductFromCart);

// ================= CLEAR CART =================
router.delete("/clear", authMiddleware, clearCart);

export default router;