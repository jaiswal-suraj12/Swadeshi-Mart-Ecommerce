import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Client/Navbar";
import Register from "./Components/Client/Register";
import Login from "./Components/Client/Login";
import Profile from "./Components/Client/Profile";
import EditProfile from "./Components/Client/EditProfile"
import Product from "./Components/Client/Product";
import Cart from "./Components/Client/Cart";
import Shipping from "./Components/Shipping";
import ProductDetails from "./Components/Client/ProductDetails";
import SearchItem from "./Components/Client/SearchItem";
import Wishlist from "./Components/Client/Wishlist";
import { ToastContainer } from "react-toastify";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import CategoryFilter from "./Components/Client/CategoryFilter";
import Payment from "./Components/Payment";
import Checkout from "./Components/Client/Checkout";
import OrderSuccess from "./Components/OrderSuccess";
import Orders from "./Components/Orders";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/" element={<Product />} />
          <Route path="/category/:category" element={<CategoryFilter />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />  {/* 🔹 Corrected */}
          <Route path="/product/details/:productId" element={<ProductDetails />} />
          <Route path="/search" element={<SearchItem />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/checkout" element={<Checkout />} /> 
          <Route path="/orders" element={<Orders />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;