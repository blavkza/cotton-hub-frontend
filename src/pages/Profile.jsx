import React, { useState } from "react";
import ProfileSlider from "../componets/profile/ProfileSlider";
import ProfileContant from "../componets/profile/ProfileContant";
import { IoArrowBackSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [active, setActive] = useState(1);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-[#e2e2eeee]">
      <div
        onClick={() => {
          handleGoBack();
        }}
        className="flex gap-3 pt-4 justify-start items-center px-8 cursor-pointer"
      >
        <IoArrowBackSharp />
        <span>Go Back</span>
      </div>
      <div className="flex  justify-between py-10 px-6">
        <div className="flex justify-center w-[50px] sm:w-[300px]">
          <ProfileSlider active={active} setActive={setActive} />
        </div>

        <ProfileContant active={active} />
      </div>
    </div>
  );
}

export default Profile;
