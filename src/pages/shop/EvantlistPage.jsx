import React from 'react'
import Header from '../../componets/shop/Header'
import DashboardSlider from '../../componets/DashboardSlider'
import Evantlist from '../../componets/shop/Evantlist.jsx'




function EvantlistPage() {
  
  return (
    <div>
      <Header/>
     <div className="flex items-center gap-3 bg-[#e2e2eeee] h-[100vh]">
      <div className="w-[20%]  ">
        <DashboardSlider active={5} />
      </div>
     
        <Evantlist/>
      
     </div>
    </div>
  )
}



export default EvantlistPage