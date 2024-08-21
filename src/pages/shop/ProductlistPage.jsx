import React from 'react'
import Header from '../../componets/shop/Header'
import DashboardSlider from '../../componets/DashboardSlider'
import Productlist from '../../componets/shop/Productlist'




function AddProduct() {
  
  return (
    <div>
      <Header/>
     <div className="flex items-center gap-3 bg-[#e2e2eeee] h-[100vh]">
      <div className="w-[20%]  ">
        <DashboardSlider active={3} />
      </div>
     
        <Productlist/>
      
     </div>
    </div>
  )
}

export default AddProduct