import Header from '../../componets/shop/Header'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardSlider from "../../componets/DashboardSlider";
import Oderlist from "../../componets/shop/Oderlist"


function OderPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const cartId = location.pathname.split("/")[2];

  


  useEffect(() => {
   
  }, []);

  

  return (
    <div>
    <Header/>
    <div className="flex items-center gap-3 bg-[#e2e2eeee] h-[100vh]">
     <div className="w-[20%]  ">
       <DashboardSlider active={2} />
     </div>
     <Oderlist/>
    </div>
   </div>
  );
}

export default OderPage;
