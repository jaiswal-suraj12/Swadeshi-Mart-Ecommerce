// import Product from "../models/Product.js";


// // 🔹 Getproducts by category (from query)
// export const getProductsByCategory = async (req, res) => {
//   try {
//     const { category } = req.query;

//     if (!category) {
//       return res.status(400).json({ message: "Category is required" });
//     }

//     const products = await Product.find({
//       category: { $regex: category, $options: "i" }, // case-insensitive
   
//     });
    
  
//     res.status(200).json(products);
//   } catch (error) {
//     console.error("Category error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

//           //getproducts 
// export const getProducts = async (req, res) => {

//   const products = await Product.find();

//         //  console.log(products)
         
//         if(!products || products.length===0){
//             return res.json({ message: "products is Empty"})
//         }

//   res.json({ message:" All products",     products  , success: true,});
// };
//         //getProductBy
// export const getProductById = async (req, res) => {
           
//                const {id}= req.params
//   const product = await Product.findById(id);
 
//       if(!product){
//           return  res.json({ message: " Product doed not exist" , success: false})
//       }


//   res.json({message:" Single product", product, success: true})
// };
//       // add products |  createProduct
// export const createProduct = async (req, res) => {
//   const product = new Product(req.body);
//   const savedProduct = await product.save();
//   res.json(savedProduct);
// };
//                //update products
// export const updateProduct = async (req, res) => {
//   const product = await Product.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );
//   res.json(product);
// };
//                  //delete products 
// export const deleteProduct = async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ message: "Product deleted" });
// };


  

//          //search items 
// export const searchProducts = async (req, res) => {
//   const query = req.query.q;

//   if (!query) {
//     return res.status(400).json({ message: "Search query is required" });
//   }

//   try {
//     const products = await Product.find({
//       $or: [
//         { title: { $regex: query, $options: "i" } },
//         { category: { $regex: query, $options: "i" } },
//       ],
//     });

//     res.status(200).json(products);
//   } catch (error) {
//     console.error("Search error:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// }

import Product from "../models/Product.js";
import mongoose from "mongoose";

// ================= GET ALL PRODUCTS =================
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "No products found",
        success: false,
      });
    }

    res.status(200).json({
      message: "All products",
      products,
      success: true,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};

// ================= GET PRODUCT BY ID =================
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
        success: false,
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product does not exist",
        success: false,
      });
    }

    res.status(200).json({
      message: "Single product",
      product,
      success: true,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};

// ================= CREATE PRODUCT =================
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();

    res.status(201).json({
      message: "Product created",
      product: savedProduct,
      success: true,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to create product",
      error: error.message,
      success: false,
    });
  }
};

// ================= UPDATE PRODUCT =================
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
        success: false,
      });
    }

    const product = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Product updated",
      product,
      success: true,
    });

  } catch (error) {
    res.status(500).json({
      message: "Update failed",
      error: error.message,
      success: false,
    });
  }
};

// ================= DELETE PRODUCT =================
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
        success: false,
      });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Product deleted",
      success: true,
    });

  } catch (error) {
    res.status(500).json({
      message: "Delete failed",
      error: error.message,
      success: false,
    });
  }
};

// ================= SEARCH PRODUCTS =================
export const searchProducts = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query || !query.trim()) {
      return res.status(400).json({
        message: "Search query is required",
        success: false,
      });
    }

    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json({
      message: "Search results",
      products,
      success: true,
    });

  } catch (error) {
    res.status(500).json({
      message: "Search failed",
      error: error.message,
      success: false,
    });
  }
};

// ================= CATEGORY FILTER =================
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({
        message: "Category is required",
        success: false,
      });
    }

    const products = await Product.find({
      category: { $regex: category, $options: "i" },
    });

    res.status(200).json({
      message: "Products by category",
      products,
      success: true,
    });

  } catch (error) {
    res.status(500).json({
      message: "Category fetch failed",
      error: error.message,
      success: false,
    });
  }
};