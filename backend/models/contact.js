import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
     
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      
    },
    type: {
      type: String,
      required: [true, "Contact type is required"],
      enum: ["personal", "professional", "family", "other"],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

export const Contact = mongoose.model("Contact", contactSchema);