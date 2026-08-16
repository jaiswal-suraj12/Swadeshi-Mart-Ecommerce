import React, { useState, useEffect } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const AppState = (props) => {
  const URL = `${import.meta.env.VITE_API_URL}/api`;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUSerProfile] = useState("");
  const [userCart, setUserCart] = useState(() => {
  const savedCart = localStorage.getItem("guestCart");

  return savedCart
    ? JSON.parse(savedCart)
    : [];
});
  const [allProducts, setAllProducts] = useState([]);
  const [productsingleDetails, setProductSingleDetails] = useState("");

  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist") || "[]");
  });

  const [results, setResults] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [singleOrder, setSingleOrder] = useState("");

  const token = localStorage.getItem("UserToken");

  // ================= LOGIN CHECK =================
  useEffect(() => {
    setIsLoggedIn(!!token);
  }, []);

  // ================= REGISTER =================
  const userRegister = async (name, email, phone, password, address, role) => {
    try {
      const res = await axios.post(`${URL}/auth/register`, {
        name,
        email,
        phone,
        password,
        address,
        role,
      });

      if (res.data.success) {
        toast.success("User Registered Successfully");
        return true;
      }
      return false;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed ❌");
      return false;
    }
  };

  // ================= PROFILE =================
  const getUserProfile = async () => {
  if (!token) {
    setUSerProfile("");
    return;
  }

  try {
    const res = await axios.get(`${URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUSerProfile(res.data.user);
  } catch (error) {
    console.error(
      "Profile error:",
      error.response?.data || error.message
    );
  }
};
  const updateProfile = async (formData) => {
  if (!token) {
    toast.info("Please login first");
    return null;
  }

  try {
    const res = await axios.put(
      `${URL}/auth/profile`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.data.success) {
      setUSerProfile(res.data.user);
      return res.data;
    }

    return null;
  } catch (error) {
    console.error(
      "Profile update error:",
      error.response?.data || error.message
    );

    toast.error(
      error.response?.data?.message ||
      "Profile update failed"
    );

    return null;
  }
};

  // ================= LOGIN =================
  const loginUserAndAdmin = async (email, password) => {
    try {
      const res = await axios.post(`${URL}/auth/login`, {
        email,
        password,
      });

      if (res.data.success) {
        const { token, role } = res.data;

        if (role === "user") {
          localStorage.setItem("UserToken", token);
        } else if (role === "admin") {
          localStorage.setItem("adminToken", token);
        }

        setIsLoggedIn(true);
        toast.success("Login Successful");
        return role;
      }
    } catch (error) {
      toast.error("Login failed ❌");
      console.error(error.message);
    }
  };

  // ================= CART =================
  // ================= GET USER CART =================
  const getuserCart = async () => {
    // Guest user → don't call protected API
    if (!token) {
      setUserCart([]);
      return;
    }

    try {
      const res = await axios.get(`${URL}/cart/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserCart(res.data.cart?.items || []);
    } catch (error) {
      console.error(
        "Cart fetch error:",
        error.response?.data || error.message
      );
      setUserCart([]);
    }
  };
  // =========removecart==========
  const removeCart = async (id) => {
    if (!token) {
      toast.info("Please login first 🛒");
      return;
    }

    try {
      await axios.delete(`${URL}/cart/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserCart((prev) =>
        prev.filter(
          (item) => item.productId?.toString() !== id?.toString()
        )
      );

      toast.success("Item removed ✅");
    } catch (error) {
      console.error(
        "Remove cart error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to remove item"
      );
    }
  };
  //==========clearCart==============
  const clearCart = async () => {
    if (!token) {
      toast.info("Please login first 🛒");
      return;
    }

    try {
      await axios.delete(`${URL}/cart/clear`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserCart([]);

      toast.success("Cart cleared ✅");
    } catch (error) {
      console.error(
        "Clear cart error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to clear cart"
      );
    }
  };

  // ================= PRODUCTS =================
  const Allproducts = async () => {
    try {
      const res = await axios.get(`${URL}/products/all`);
      setAllProducts(res.data.products || []);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getProductDetailsSingle = async (productId) => {
    try {
      const res = await axios.get(`${URL}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProductSingleDetails(res.data.product);
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to load product ❌");
    }
  };

  // ================= ADD TO CART =================

  const addTOCart = async (
    productId,
    image,
    title,
    description,
    price,
    qty = 1
  ) => {
    // Guest user
    if (!token) {
      toast.info("Please login first to add products to cart 🛒");
      return;
    }

    try {
      const exists = userCart?.some(
        (item) =>
          item.productId?.toString() === productId?.toString()
      );

      if (exists) {
        toast.info("Already in cart 🛒");
        return;
      }

      await axios.post(
        `${URL}/cart/add`,
        {
          productId,
          image,
          title,
          description,
          price,
          qty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await getuserCart();

      toast.success("Added to cart 🛒");
    } catch (error) {
      console.error(
        "Add to cart error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to add item"
      );
    }
  };

  // ================= WISHLIST =================
  const addToWishlist = (product) => {
    const exists = wishlist.find((p) => p._id === product._id);

    if (exists) {
      toast.info("Already in wishlist ❤️");
      return;
    }

    const updated = [...wishlist, product];
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));

    toast.success("Added to wishlist ❤️");
  };

  const removeFromWishlist = (productId) => {
    const updated = wishlist.filter((p) => p._id !== productId);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));

    toast.info("Removed from wishlist 💔");
  };

  // ================= SEARCH =================
  const searchProducts = async (searchText) => {
    if (!searchText?.trim()) return;

    try {
      setLoading(true);

      const res = await axios.get(`${URL}/products/search`, {
        params: { q: searchText.trim() },
      });

      // ✅ FIX: always ensure array
      const data = res.data?.products || res.data || [];

      setResults(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      toast.error("Search failed ❌");
      setResults([]); // safety fallback
    } finally {
      setLoading(false);
    }
  };

  // ================= CATEGORY =================
  const getProductsByCategory = async (category) => {
    try {
      setLoading(true);

      const res = await axios.get(`${URL}/products/category`, {
        params: { category },
      });

      const data = res.data?.products || res.data || [];

      setFilteredProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error.message);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  
  // ================= ADDRESSES =================

const getAddresses = async () => {
  if (!token) {
    setAddresses([]);
    return;
  }

  try {
    const res = await axios.get(`${URL}/address/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setAddresses(res.data.userAddress || []);
  } catch (error) {
    console.error(
      "Address fetch error:",
      error.response?.data || error.message
    );

    setAddresses([]);
  }
};

const addAddress = async (address) => {
  if (!token) {
    toast.info("Please login first to add an address");
    return false;
  }

  try {
    const res = await axios.post(
      `${URL}/address/add`,
      address,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.success) {
      await getAddresses();
      toast.success("Address saved successfully");
      return true;
    }

    return false;
  } catch (error) {
    console.error(
      "Add address error:",
      error.response?.data || error.message
    );

    toast.error(
      error.response?.data?.message ||
      "Failed to add address"
    );

    return false;
  }
};
  
  // ================= ORDERS =================

const getUserOrders = async () => {
  if (!token) {
    setOrders([]);
    return;
  }

  try {
    const res = await axios.get(
      `${URL}/orders/my-orders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setOrders(res.data || []);
  } catch (error) {
    console.error(
      "Orders fetch error:",
      error.response?.data || error.message
    );

    setOrders([]);
  }
};

const getSingleOrder = async (id) => {
  if (!token) {
    toast.info("Please login to view your order");
    return;
  }

  try {
    const res = await axios.get(
      `${URL}/orders/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSingleOrder(res.data);
  } catch (error) {
    console.error(
      "Single order error:",
      error.response?.data || error.message
    );

    toast.error(
      error.response?.data?.message ||
      "Order not found"
    );
  }
};

const createOrder = async (orderData) => {
  if (!token) {
    toast.info("Please login before placing an order");
    return null;
  }

  try {
    const res = await axios.post(
      `${URL}/orders`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    toast.success("Order created successfully");

    return res.data;
  } catch (error) {
    console.error(
      "ORDER ERROR:",
      error.response?.data || error.message
    );

    toast.error(
      error.response?.data?.message ||
      "Order creation failed"
    );

    return null;
  }
};

  return (
    <AppContext.Provider
      value={{
        userRegister,
        loginUserAndAdmin,
        isLoggedIn,
        setIsLoggedIn,

        getUserProfile,
        updateProfile,
        userProfile,

        getuserCart,
        userCart,
        addTOCart,
        removeCart,
        clearCart,

        allProducts,
        Allproducts,

        productsingleDetails,
        getProductDetailsSingle,

        wishlist,
        addToWishlist,
        removeFromWishlist,

        results,
        searchProducts,

        filteredProducts,
        getProductsByCategory,

        addresses,
        getAddresses,
        addAddress,

        loading,
        setLoading,

        orders,
        getUserOrders,

        singleOrder,
        getSingleOrder,

        createOrder,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;








