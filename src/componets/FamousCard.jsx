import React from "react";

const FamousCard = () => {
  return (
    <>
    <div className="bg-black shadow-md rounded-md p-4 relative" style={{ height: "400px" }}>
      <div className="py-2 text-gray-100" style={{ height: "100%" }}>
        <img src="images/images (1).jpeg" alt="" className="w-full h-full object-cover" />
        <div className="absolute top-10 left-5">
          <h6 className="text-sm pb-1">Big Screen</h6>
          <h5 className="font-bold text-white pb-1">Smart Watch Series 7</h5>
          <p className="font-thin text-xs">from R150 p.m in 24 months</p>
        </div>
      </div>
    </div>
  </>
  );
};

export default FamousCard;
