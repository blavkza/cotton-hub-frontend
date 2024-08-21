import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./componets/Layout";
import Home from "./pages/Home";
import OurStore from "./pages/OurStore";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Compere from "./pages/Compere";
import Wishlist from "./pages/Wishlist";
import Forgotpassword from "./pages/Forgotpassword";
import Resetpassword from "./pages/Resetpassword";
import Singleblog from "./pages/Singleblog";
import Privacypolicy from "./pages/Privacypolicy";
import Refundpolicy from "./pages/Refundpolicy";
import Shippingpolicy from "./pages/Shippingpolicy";
import Termsconditions from "./pages/Termsconditions";
import Singleproduct from "./pages/Singleproduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Cartsidebar from "./pages/Cartsidebar";
import Profile from "./pages/Profile";
import SellerRegister from "./pages/SellerRegister";
import SellerLogin from "./pages/SellerLogin";
import Shop from "./pages/shop/Shop";
import Dashboard from "./pages/shop/Dashboard";
import AddProduct from "./pages/shop/AddProduct"
import Productlist from "./pages/shop/ProductlistPage";
import AddEvantPage from "./pages/shop/AddEvantPage";
import EvantlistPage from "./pages/shop/EvantlistPage";
import CouponPage from "./pages/shop/CouponPage";
import AddCouponPage from "./pages/shop/AddCouponPage";
import OTPVerification from "./pages/OTPVerification";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import OderPage from "./pages/shop/OderPage";
import SingleOrderPage from "./pages/shop/SingleOrderPage";
import RefundPage from "./pages/shop/RefundPage";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="store" element={<OurStore />} />
            <Route path="product/:id" element={<Singleproduct />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="OTPVerify" element={<OTPVerification />} />
            <Route path="forgotpassword" element={<Forgotpassword />} />
            <Route path="reset-password/:token" element={<Resetpassword />} />
            <Route path="compere" element={<Compere />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="blog/:id" element={<Singleblog />} />
            <Route path="privacy-policy" element={<Privacypolicy />} />
            <Route path="refund-policy" element={<Refundpolicy />} />
            <Route path="shipping-policy" element={<Shippingpolicy />} />
            <Route path="terms-conditions" element={<Termsconditions />} />
            <Route path="cartsidebar" element={<Cartsidebar />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="payment" element={<Payment />} />
            <Route path="OrderSuccess" element={<OrderSuccess />} />
            <Route path="shipping" element={<Shipping />} />
            <Route path="profile" element={<Profile />} />
            <Route path="seller-register" element={<SellerRegister />} />
            <Route path="seller-login" element={<SellerLogin />} />
            <Route path="shop/:id" element={<Shop />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/orders" element={<OderPage />} />
            <Route path="dashboard/order/:id" element={<SingleOrderPage />} />
            <Route path="dashboard/add-product" element={<AddProduct />} />
            <Route path="dashboard/productlist" element={<Productlist />} />
            <Route path="dashboard/add-evant" element={<AddEvantPage />} />
            <Route path="dashboard/evantlist" element={<EvantlistPage />} />
            <Route path="dashboard/coupons" element={<CouponPage />} />
            <Route path="dashboard/add-coupon" element={<AddCouponPage />} />
            <Route path="dashboard/refund" element={<RefundPage />} />
            <Route
              path="dashboard/add-coupon/:id"
              element={<AddCouponPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
