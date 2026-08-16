import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  quantity: {
    type: Number,
    default: 1
  },
  image: {
    type: String,
    required:true
  },
  imagePublicId:{
  type:String
}
},

{
  timestamps: true
}
);

const Product = mongoose.model("Product", productSchema);

export default Product;