// import mongoose from "mongoose";

// const connectDB = async () => {
//   await mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce");
//   console.log("Database Connected");
// };

// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;