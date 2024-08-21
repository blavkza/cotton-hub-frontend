// Layout.js
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout() {
  const location = useLocation();
  const shopId = location.pathname.split("/")[2];
  const token = location.pathname.split("/")[2];
  const id = location.pathname.split("/")[3];

  const noHeaderRoutes = [
    "/login",
    "/register",
    "/OTPVerify",
    "/profile",
    "/dashboard",
    `/shop/${shopId}`,
    "/dashboard/add-product",
    "/dashboard/productlist",
    "/seller-register",
    "/seller-login",
    "/dashboard/add-evant",
    "/dashboard/evantlist",
    "/dashboard/coupons",
    "/dashboard/add-coupon",
    "/dashboard/orders",
    "/dashboard/refund",
    `/dashboard/order/${id}`,
    "/forgotpassword",
    `/reset-password/${token}`,
    "/shipping",
    "/checkout",
    "/payment",
    "/OrderSuccess"
    
  ];
  const noFooterRoutes = [
    "/login",
    "/register",
    "/OTPVerify",
    "/dashboard",
    `/shop/${shopId}`,
    "/dashboard/add-product",
    "/dashboard/productlist",
    "/seller-register",
    "/seller-login",
    "/dashboard/add-evant",
    "/dashboard/evantlist",
    "/dashboard/coupons",
    "/dashboard/add-coupon",
    "/dashboard/add-coupon/:id",
    "/dashboard/orders",
    "/dashboard/refund",
    `/dashboard/order/${id}`,
    "/forgotpassword",
    `/reset-password/${token}`,
    "/shipping",
    "/checkout",
    "/payment",
    "/OrderSuccess",

  ];

  return (
    <>
      {!noHeaderRoutes.includes(location.pathname) && <Header />}
      <Outlet />
      {!noFooterRoutes.includes(location.pathname) && <Footer />}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default Layout;
