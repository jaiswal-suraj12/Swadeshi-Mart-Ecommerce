import express from "express";
import { login, userRegister } from "../controllers/authController.js";
import {
  addContact,
  getAllContact,
  getContactById,
  updateContact,
  deleteContact,
} from "../controllers/contact.js";

const router = express.Router();

//user router
router.post("/register", userRegister);
//user login
router.post("/login", login);

//get contact
router.get("/", getAllContact);

//get contact by id
router.get("/:id", getContactById);

//add contact

router.post("/add", addContact);

//update contact
router.put("/update/:id", updateContact);

//delete contact
router.delete("/:id ", deleteContact);

export default router;

// import express from "express";
// import { login, userRegister } from "../controllers/authController.js";
// import {
//   addContact,
//   getAllContact,
//   getContactById,
//   updateContact,
//   deleteContact,
// } from "../controllers/contact.js";

// const router = express.Router();

// // USER ROUTES
// router.post("/register", userRegister);
// router.post("/login", login);

// // CONTACT ROUTES
// router.get("/", getAllContact);
// router.post("/add", addContact);
// router.get("/:id", getContactById);
// router.put("/update/:id", updateContact);
// router.delete("/:id", deleteContact);

// export default router; // ✅ FIXED
