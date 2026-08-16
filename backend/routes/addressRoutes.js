import express from "express";
import {addAddress,getAddress}from "../controllers/address.js"
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// add address
router.post("/add", authMiddleware, addAddress);

// get address
router.get("/get",authMiddleware, getAddress)

export default router;