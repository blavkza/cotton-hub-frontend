import React from 'react'
import Header from '../../componets/shop/Header'
import DashboardSlider from '../../componets/DashboardSlider'
import Refund from '../../componets/shop/Refund.jsx'

function RefundPage() {
  return (
    <div>
    <Header/>
    <div className="flex items-center gap-3 bg-[#e2e2eeee] h-[100vh]">
     <div className="w-[20%]  ">
       <DashboardSlider active={11} />
     </div>
     <Refund/>
    </div>
   </div>
  )
}

export default RefundPage