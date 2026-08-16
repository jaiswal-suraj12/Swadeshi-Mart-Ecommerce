import express from "express";
import upload from "../middleware/upload.js";
import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
import {
  getProducts,
  searchProducts,
  getProductsByCategory,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
 
} from "../controllers/productController.js";

const router = express.Router();

router.get("/all", getProducts);
  

    //   /api/products  
router.get("/search", searchProducts);
// GET /api/products/category?category=electronics
router.get("/category", getProductsByCategory);
router.get("/:id", getProductById);
router.post("/add", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

    // cloudinary 

    // ✅ STEP 7: CREATE PRODUCT
// ===============================
router.post("/create-product", upload.single("image"), async (req, res) => {
  try {
     console.log("Uploaded file info:", req.file); // ✅ Check here
    const { name, price, description, quantity,category } = req.body;
    
    // Validation
    if (!name || !price || !req.file) {
      return res.status(400).json({
        message: "Name, price, and image are required",
      });
    }

    
    console.log("Request body:", req.body);
    console.log("Uploaded file info:", req.file);
    const product = await Product.create({
      title:name,
      price:Number(price),
      description,
      quantity:quantity?Number(quantity):0,
      category,
      image: req.file.path,
      imagePublicId: req.file.filename,
    });

    res.status(201).json(product);

  } catch (err) {
    console.error("full error",err);
    res.status(500).json({ message: err.message });
  }
});


// ===============================
// ✅ STEP 8: UPDATE PRODUCT
// ===============================
router.put("/update-product/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, title, price, description, quantity, category } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });

    // Delete old image
    if (req.file && product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    // Update fields
    if (name || title) product.title = title || name;
    if (price !== undefined && price !== "") product.price = Number(price);
    if (description !== undefined) product.description = description;
    if (quantity !== undefined && quantity !== "") product.quantity = Number(quantity);
    if (category !== undefined) product.category = category;

    if (req.file) {
      product.image = req.file.path;
      product.imagePublicId = req.file.filename;
    }

    await product.save();

    res.json(product);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ===============================
// ✅ STEP 9: DELETE PRODUCT
// ===============================
router.delete("/delete-product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Not found" });

    // Delete image from Cloudinary
    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    await product.deleteOne();

    res.json({ message: "Product deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



export default router;
