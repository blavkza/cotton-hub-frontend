import React from 'react'
import Header from '../../componets/shop/Header'
import DashboardSlider from '../../componets/DashboardSlider'
import Couponlist from '../../componets/shop/Couponlist'




function CouponPage() {
  
  return (
    <div>
      <Header/>
     <div className="flex items-center gap-3 bg-[#e2e2eeee] overflow-hidden">
      <div className="w-[20%]  ">
        <DashboardSlider active={7} />
      </div  >
     
        <Couponlist/>
      
     </div>
    </div>
  )
}



export default CouponPage