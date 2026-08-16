import Address from "../models/Address.js";

/* ================== ADD ADDRESS ================== */
export const addAddress = async (req, res) => {
  try {
    console.log("decoded user:", req.user); // JWT object
    console.log("BODY:", req.body);

    const {
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber,
    } = req.body || {};

    // Validate all required fields
    if (!fullName || !address || !city || !state || !country || !pincode || !phoneNumber) {
      return res.status(400).json({
        message: "Required fields missing",
        success: false,
      });
    }

    // Extract only the user ID from the decoded JWT object
    const userId = req.user?.id;  
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    // Create a new address
    const userAddress = await Address.create({
      userId,
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber,
    });

    res.status(201).json({
      message: "Address added successfully",
      userAddress,
      success: true,
    });

  } catch (error) {
    console.error("Add Address Error:", error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

/* ================== GET ADDRESS ================== */
export const getAddress = async (req, res) => {
  try {
    // Extract only the user ID
    const userId = req.user?.id;  
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }

    // Fetch all addresses of this user, sorted newest first
    const addresses = await Address.find({ userId }).sort({ createdAt: -1 }).populate("userId");;


       console.log( "populate address",addresses)
    res.json({
      message: "Addresses fetched successfully",
      userAddress: addresses, // returns all addresses
      success: true,
    });

  } catch (error) {
    console.error("Get Address Error:", error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};