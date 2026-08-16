import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true,
   
   },
  email:{
    type:String,
    required:true,
    unique:true
  
   } ,
  phone:{
    type:String,
    required:true,
   } ,

  address:{
    type:String,
    required:true,
   },
 profilePic: {
    type: String,
    default: "",
  },
   role:{
     type:String,
     enum:["admin", "user"],
       default: "user"

   },
  password: { 
    type: String,
     required: true
    },
  createdAt:{
    type: Date,
    default: Date.now 
  },
  
});

//login==
 userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
  

export const User = mongoose.model("User", userSchema);
