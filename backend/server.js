import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import morgan from "morgan";
import authRouter from "./routes/authRoutes.js";
import contactRouter from "./routes/contact.js";

import cartRoutes from "./routes/cartRoutes.js"
import productRoutes from "./routes/productRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import addressRoutes from "./routes/addressRoutes.js"

 import paymentRoutes from "./routes/paymentRoutes.js"
const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Connect Database
connectDB();

// Register routes
app.use("/api/auth", authRouter);



//contact routes
app.use("/api/contact", contactRouter);

//product routes
app.use("/api/products", productRoutes);

//cart Routes
app.use("/api/cart",cartRoutes);

//reviews routes
app.use("/api/reviews",reviewRoutes);

//order routes
app.use("/api/orders",orderRoutes);

// address Routes
app.use("/api/address",addressRoutes)

//payment routes
app.use("/api/payment",paymentRoutes)

const PORT = process.env.PORT || 3200;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});