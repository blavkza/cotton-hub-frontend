import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CiDiscount1,  CiShop,CiViewList } from "react-icons/ci";
import { CiShoppingTag } from "react-icons/ci";
import { TiMessage } from "react-icons/ti";


function Header() {
  const sellerState = useSelector((state) => state.seller.seller);
  const shopId = location.pathname.split("/")[2];

  return (
    <div>
      <header className="hidden sm:flex items-center justify-between py-3 px-4 header-upper shadow-xl fixed top-0 left-0 z-50 w-full">
        <div className="">
          <h2 className="flex flex-col items-center text-xl font-extrabold text-[#bf6e04] select-none">
            <Link to="/">COTTON.HUB </Link>
            <p className="text-xs font-light text-white">
              {sellerState?.shopname}
            </p>
          </h2>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            {" "}
            <p className="text-xs text-white font-light">
              {sellerState?.email}
            </p>
            <Link to={"/shop/" + sellerState?._id} className=" rounded-lg ">
              <img
                src="https://yt3.ggpht.com/yti/ANjgQV9i5fISqhQeFUaV0hz76kuGg9rMq2Ho1FlNYI6Udz1Q3Kzk=s88-c-k-c0x00ffffff-no-rj"
                alt="Profile Picture"
                className="rounded-full w-7 h-7 object-cover border border-orange-600"
              />
            </Link>
          </div>
         
          <div className="hover:rounded-full hover:bg-gray-600 p-1">
            <Link to={"/dashboard-events"}>
              <CiShoppingTag className="text-gray-300 cursor-pointer" size={30} />
            </Link>
          </div>
          <div className="hover:rounded-full hover:bg-gray-600 p-1">
            <Link to={"/dashboard-messages"}>
              <TiMessage className="text-gray-300 cursor-pointer" size={34} />
            </Link>
          </div>
          <div className="hover:rounded-full hover:bg-gray-600 p-1">
            <Link to={"/dashboard-products"}>
              < CiShop className="text-gray-300 cursor-pointer" size={30} />
            </Link>
          </div>
          <div className="hover:rounded-full hover:bg-gray-600 p-1">
            <Link to={"/dashboard-coupons"}>
              < CiDiscount1 className="text-gray-300 cursor-pointer" size={30} />
            </Link>
          </div>
          
          <div className=" hover:rounded-full hover:bg-gray-600 p-1">
            <Link to={"/dashboard-oders"}>
              <CiViewList title="Oders" className="text-gray-300 cursor-pointer" size={30} />
            </Link>
          </div>
         
        </div>
      </header>
    </div>
  );
}

export default Header;
