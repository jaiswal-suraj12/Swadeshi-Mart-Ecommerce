import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  title: { type: String,
    //  required: true 
    
    },
  price: { 
    type: Number,
    //  required: true
     }, 
  qty: {
     type: Number,
     
    
    },
  image: { type: String,
    //  required: true 
    },

     description:{
       type: String,
     } , 
      name:{
  type: String,
      } 
});      

  

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [cartItemSchema],
});

export const Cart = mongoose.model('Cart',cartSchema)