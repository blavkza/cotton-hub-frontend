import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { CiDiscount1, CiShop, CiViewList } from "react-icons/ci";
import { IoShirtOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { HiOutlineFolderAdd, HiOutlineCash } from "react-icons/hi";
import { CiShoppingTag } from "react-icons/ci";
import { TiMessages } from "react-icons/ti";
import { BiLogOut } from "react-icons/bi";
import { RiRefundLine } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function DashboardSlider({ active }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("seller");
    toast.success("Logged out successfully");
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[100vh] bg-white shadow-xl p-4 gap-8 fixed top-16 left-0 z-30 overflow-y-auto ">
      <Link
        to={"/dashboard"}
        className="flex items-center gap-2 cursor-pointer pt-4"
      >
        <LuLayoutDashboard
          size={25}
          color={active === 1 ? "rgb(225,159,27)" : ""}
        />
        <span
          className={` ${
            active === 1 ? "text-[rgb(225,159,27)]" : ""
          } hidden sm:block`}
        >
          Dashboard
        </span>
      </Link>
      <Link to={"/dashboard/orders"} className="flex items-center gap-2">
        <CiViewList size={25} color={active === 2 ? "rgb(225,159,27)" : ""} />
        <span
          className={` ${
            active === 2 ? "text-[rgb(225,159,27)]" : ""
          } hidden sm:block`}
        >
          All Oders
        </span>
      </Link>
      <Link to={"/dashboard/refund"} className="flex items-center gap-2">
        <RiRefundLine size={25} color={active === 11 ? "rgb(225,159,27)" : ""} />
        <span
          className={` ${
            active === 11 ? "text-[rgb(225,159,27)]" : ""
          } hidden sm:block`}
        >
          Refunds
        </span>
      </Link>
      <Link to={"/dashboard/productlist"} className="flex items-center gap-2">
        <IoShirtOutline
          size={25}
          color={active === 3 ? "rgb(225,159,27)" : ""}
        />
        <span
          className={` ${
            active === 3 ? "text-[rgb(225,159,27)]" : ""
          } hidden sm:block`}
        >
          All Products
        </span>
      </Link>
      <Link to={"/dashboard/add-product"} className="flex items-center gap-2">
        <HiOutlineFolderAdd
          size={25}
          color={active === 4 ? "rgb(225,159,27)" : ""}
        />
        <span
          className={` ${
            active === 4 ? "text-[rgb(225,159,27)]" : ""
          } hidden sm:block`}
        >
          Add Product
        </span>
      </Link>
      <Link to={"/dashboard/evantlist"} className="flex items-center gap-2">
        <CiShoppingTag
          size={25}
          color={active === 5 ? "rgb(225,159,27)" : ""}
        />
        <span
          className={` ${
            active === 5 ? "text-[rgb(225,159,27)]" : ""
          } hidden sm:block`}
        >
          All Evants
        </span>
      </Link>
      <Link
        to={"/dashboard/add-evant"}
        className="flex items-center gap-2 cursor-pointer"
      >
        <IoIosAddCircleOutline
          size={25}
          color={active === 6 ? "rgb(225,159,27)" : ""}
        />
        <span
          className={` ${
            active === 6 ? "text-[rgb(225,159,27)]" : ""
          } hidden sm:block`}
        >
          Add Evant
        </span>
      </Link>
      <Link
        to={"/dashboard/coupons"}
        className="flex items-center gap-2 cursor-pointer"
      >
        <CiDiscount1 size={25} color={active === 7 ? "rgb(225,159,27)" : ""} />
        <span
          className={` ${
            active === 7 ? "text-[rgb(225,159,27)]" : ""
          } hidden sm:block`}
        >
          All Coupon
        </span>
      </Link>
      <Link
        to={"/dashboard/add-coupon"}
        className="flex items-center gap-2 cursor-pointer"
      >
        <IoIosAddCircleOutline
          size={25}
          color={active === 8 ? "rgb(225,159,27)" : ""}
        />
        <span
          className={` ${
            active === 8 ? "text-[rgb(225,159,27)]" : ""
          } hidden sm:block`}
        >
          Add Coupon
        </span>
      </Link>
      <div className="flex items-center gap-2">
        <HiOutlineCash
          size={25}
          color={active === 9 ? "rgb(225,159,27)" : ""}
        />
        <span
          className={` ${
            active === 9 ? "text-[rgb(225,159,27)]" : ""
          } hidden sm:block`}
        >
          Withdraw
        </span>
      </div>
      <div className="flex items-center gap-2">
        <TiMessages size={25} color={active === 10 ? "rgb(225,159,27)" : ""} />
        <span
          className={` ${
            active === 10 ? "text-[rgb(225,159,27)]" : ""
          } hidden sm:block`}
        >
          Inbox
        </span>
      </div>
      <div
        type="button"
        onClick={() => {
          handleLogout();
        }}
        className="flex items-center gap-2 cursor-pointer"
      >
        <BiLogOut size={25} color={active === 11 ? "rgb(225,159,27)" : ""} />
        <span
          className={` ${
            active === 11 ? "text-[rgb(225,159,27)]" : ""
          } hidden sm:block`}
        >
          LogOut
        </span>
      </div>
    </div>
  );
}

export default DashboardSlider;
