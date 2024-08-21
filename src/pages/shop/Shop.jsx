import React, { useState } from "react";
import ShopTopSlider from "../../componets/shop/ShopTopSlider";
import ShopContant from "../../componets/shop/ShopContant.jsx"
import { useNavigate } from "react-router-dom";

function Shop() {
  const [active, setActive] = useState(1);
  return (
    <div className="w-full h-[100vh] bg-[#e2e2eeee]">
      <div className="fixed left-6 top-6 z-30 ">
        <ShopTopSlider active={active} setActive={setActive} />
      </div>
      <ShopContant active={active} />
    </div>
  );
}

export default Shop;
