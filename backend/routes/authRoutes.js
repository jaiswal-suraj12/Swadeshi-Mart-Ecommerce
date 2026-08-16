import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  userRegister,
  login,
  getprofilebyUseronly,
  updateProfile,
} from "../controllers/authController.js";
import profileUpload from "../middleware/profileUpload.js";


//router object
const router = express.Router();

//routing
//Register||method post


router.post("/register", userRegister);


//--------login post-------- 
router.post("/login", login)

//-------api/auth/profile-------
router.get("/profile", authMiddleware, getprofilebyUseronly)


//-------update profile pic-------
router.put(
  "/profile",
  authMiddleware,
  profileUpload.single("profilePic"),
  updateProfile
);
  


export default router;