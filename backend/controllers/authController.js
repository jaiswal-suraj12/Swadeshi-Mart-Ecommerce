
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ----------------- REGISTER -----------------
export const userRegister = async (req, res) => {
  const { name, email, phone, password, address, role } = req.body;

  try {
    // 1 Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Already registered. Please login."
      });
    }

    // 2️ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️ Create new user
    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      address,
      role

    });

    await user.save();

    // 4️ Respond (exclude password)

    res.status(201).json({
      message: "User registered successfully ✅",
      user,
      success: true
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ----------------- LOGIN -----------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found " });
    }

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3️⃣ Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "360d" }
    );


    res.json({ message: "Login Successful  ", token, role: user.role, success: true })



  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//-------get user profile-----------
export const getprofilebyUseronly = async (req, res) => {


  const { id } = req.user
  try {

    const user = await User.findById(id)
    if (!user) {
      return res.json({ message: " User not Found ", success: false })
    }


    res.json({ message: "  Welcome to my  Profile", user, success: true })

  } catch (error) {

     console.log(error);

  res.status(500).json({
    success: false,
    message: error.message,
  });

  }



}
//----------update profile------

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { name, email, phone, address } = req.body;

    // Check email uniqueness
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }

      user.email = email;
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.address = address ||user.address;

    // Cloudinary image URL
    if (req.file) {
      user.profilePic = req.file.path;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
