import React, { useState } from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { FaTag } from "react-icons/fa";
import { FaShirt, FaCircleInfo } from "react-icons/fa6";
import { IoArrowBackSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import SellerInfo from "../../componets/shop/SellerInfo.jsx";


function shopTopSlider({ active, setActive }) {
  const [info, setInfo] = useState(false);
  const navigate = useNavigate();


  const handleGoBack = () => {
    navigate(-1); 
  };

  const location = useLocation();

  const shopId = location.pathname.split("/")[2];


  return (
    <div className="flex items-center gap-4">
      <div onClick={()=>{handleGoBack()}} className="flex gap-3 justify-start items-center px-6 cursor-pointer">
          <IoArrowBackSharp />
          <span>Go Back</span>
        </div>
      <div
        onClick={() => {
          setActive(1);
        }}
        className={`bg-white rounded-full items-center px-3 py-1 shadow-md flex gap-1 cursor-pointer ${
          active === 1 ? "bg-[#f3af10fe]" : ""
        }`}
      >
        <FaShirt size={22} color={active === 1 ? "white" : ""} />
        <h4 className={` ${active === 1 ? "text-[white]" : ""}`}>Products</h4>
      </div>

      <div
        onClick={() => {
          setActive(2);
        }}
        className={`bg-white rounded-full items-center px-3 py-1 cursor-pointer shadow-md flex gap-1 ${
          active === 2 ? "bg-[#f3af10fe]" : ""
        }`}
      >
        <TiStarFullOutline size={22} color={active === 2 ? "white" : ""} />
        <h4 className={` ${active === 2 ? "text-[white]" : ""}`}>Reviews</h4>
      </div>

      <div
        onClick={() => {
          setActive(3);
        }}
        className={`bg-white rounded-full items-center px-3 py-1 cursor-pointer shadow-md flex gap-1 ${
          active === 3 ? "bg-[#f3af10fe]" : ""
        }`}
      >
        <FaTag size={18} color={active === 3 ? "white" : ""} />
        <h4 className={` ${active === 3 ? "text-[white]" : ""}`}>Spacials</h4>
      </div>
      <div
        onClick={() => {
          setInfo(!info);
        }}
        className={`bg-white rounded-full items-center px-3 py-1 cursor-pointer shadow-md flex gap-1 relative `}
      >
        <FaCircleInfo size={20} />
        <h4>Shop Info</h4>
        {info === true && (
          <div className="w-[350px] bg-[white] h-[90vh] absolute top-0 left-0 rounded-xl shadow-md">
            <div className="flex gap-1 pt-2 pl-2 ">
              <FaCircleInfo
                size={20}
                color={info === true ? "#fab71afe" : ""}
              />
              <h4 className={` ${info === true ? "text-[#f3af10fe]" : ""}`}>
                Shop Info
              </h4>
            </div>
            <div className="">
              <SellerInfo data={shopId} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default shopTopSlider;
