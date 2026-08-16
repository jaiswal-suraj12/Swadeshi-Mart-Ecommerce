// import { Cart } from "../models/Cart.js";
// // add To Cart
// export const addToCart = async (req, res) => {


//   // const { productId, title, price, qty, imgSrc } = req.body;
//        const { productId,image,  title, description,price , qty}= req.body
//            console.log(req.body)
//        const userId = req.user.id

//   let cart = await Cart.findOne({ userId });

//   if (!cart) {
//     cart = new Cart({ userId, items: [] }); 
//   }
   
//   const itemIndex = cart.items.findIndex(
//     (item) => item?.productId?.toString() === productId
//   );
       
   
  
//      if (itemIndex > -1) {
//     cart.items[itemIndex].qty += Number(qty);
  
//    cart.items[itemIndex].price += price * qty; 
//   } else{
//     cart.items.push({ productId, image,  title, description,price,  qty });
//   }
  
//   await cart.save();
//   res.json({ message: "Items Added To Cart", cart });
// };

// // get User Cart
// export const userCart = async (req,res) =>{
//    const userId = req.user.id;
   
//    let cart = await Cart.findOne({userId});
//    if(!cart) return res.json({message:'Cart not found'})

//     res.json({message:"user cart",cart})
// }

// // remove product from cart
// export const removeProductFromCart = async (req, res) => {

//   const {productId}= req.params;
   
//    console.log("Removing product:", productId);
      
//    const  usercartitem = await Cart.findOne({userId:req.user.id} );


//   if ((!usercartitem || usercartitem.items.length === 0)){
//       return res.json({ message: "Cart  is empty " });
//   }
    
          
//           usercartitem.items = usercartitem.items.filter(
//   (item) => item.productId && item.productId.toString() !== productId
// );
//              await  usercartitem.save();

//      res.json({ message: " product  remove from cart",    usercartitem});
// };


// // // clear cart
// export const clearCart = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     let cart = await Cart.findOne({ userId });
    
//     if (!cart) {
//       // If cart doesn't exist yet, just respond with empty cart
//       return res.status(200).json({ message: "Cart is already empty", cart: { items: [] } });
//     }

//     // Clear items
//     cart.items = [];
//     await cart.save();

//     res.status(200).json({ message: "Cart cleared successfully", cart });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error clearing cart" });
//   }
// };

import { Cart } from "../models/Cart.js";
import Product from "../models/Product.js";

// ================= ADD TO CART =================
export const addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;

    const userId = req.user.id;

    if (!productId) {
      return res.status(400).json({ message: "ProductId required" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    const quantity = Number(qty) || 1;

    if (itemIndex > -1) {
      // ✅ ONLY increase qty (NOT price)
      cart.items[itemIndex].qty += quantity;
      cart.items[itemIndex].image = product.image;
      cart.items[itemIndex].title = product.title;
      cart.items[itemIndex].description = product.description;
      cart.items[itemIndex].price = product.price;
    } else {
      cart.items.push({
        productId,
        image: product.image,
        title: product.title,
        description: product.description,
        price: product.price,
        qty: quantity,
      });
    }

    await cart.save();

    res.status(200).json({
      message: "Item added to cart",
      cart,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET USER CART =================
export const userCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(200).json({
        message: "Cart is empty",
        cart: { items: [] },
      });
    }

    const productIds = cart.items.map((item) => item.productId).filter(Boolean);
    const products = await Product.find({ _id: { $in: productIds } });
    let cartUpdated = false;

    cart.items.forEach((item) => {
      const product = products.find(
        (p) => p._id.toString() === item.productId.toString()
      );

      if (!product) return;

      if (
        item.price !== product.price ||
        item.title !== product.title ||
        item.image !== product.image ||
        item.description !== product.description
      ) {
        item.price = product.price;
        item.title = product.title;
        item.image = product.image;
        item.description = product.description;
        cartUpdated = true;
      }
    });

    if (cartUpdated) {
      await cart.save();
    }

    res.status(200).json({
      message: "User cart",
      cart,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= REMOVE ITEM =================
export const removeProductFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      message: "Item removed from cart",
      cart,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= CLEAR CART =================
export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(200).json({
        message: "Cart already empty",
        cart: { items: [] },
      });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      message: "Cart cleared",
      cart,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
