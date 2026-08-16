import Order from "../models/Order.js";
import Product from "../models/Product.js";

// ================= CREATE ORDER =================
export const createOrder = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const { orderItems, shippingAddress, paymentMethod } = req.body;

    // ================= AUTH CHECK =================
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // ================= VALIDATION =================
    if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    if (!shippingAddress || !shippingAddress.address) {
      return res.status(400).json({ message: "Shipping address required" });
    }

    // ================= EXTRACT PRODUCT IDS =================
    const productIds = orderItems
      .map(item => item.product)
      .filter(Boolean); // remove undefined

    if (productIds.length === 0) {
      return res.status(400).json({ message: "Invalid products in cart" });
    }

    const products = await Product.find({
      _id: { $in: productIds },
    });

    if (!products.length) {
      return res.status(404).json({ message: "Products not found" });
    }

    let totalPrice = 0;

    // ================= BUILD ORDER ITEMS =================
    const updatedItems = orderItems.map((item) => {
      const product = products.find(
        (p) => p._id.toString() === item.product?.toString()
      );

      if (!product) {
        throw new Error("Product not found in database");
      }

      const quantity = Number(item.quantity);

      if (!Number.isInteger(quantity) || quantity <= 0) {
        throw new Error("Invalid quantity");
      }

      totalPrice += product.price * quantity;

      return {
        product: product._id,
        name: product.title,
        price: product.price,
        quantity,
        image: product.image,
      };
    });

    // ================= CREATE ORDER =================
    const order = await Order.create({
      user: req.user.id,
      orderItems: updatedItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    res.status(201).json(order);

  } catch (error) {
    console.error("CREATE ORDER ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ================= GET MY ORDERS =================
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("orderItems.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET SINGLE ORDER =================
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).populate("orderItems.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= UPDATE ORDER STATUS =================
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (req.body.orderStatus === "cancelled") {
      order.orderStatus = "cancelled";
    } else {
      return res.status(400).json({ message: "Invalid status update" });
    }

    await order.save();

    res.json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
