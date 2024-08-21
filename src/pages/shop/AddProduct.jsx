import React from 'react'
import Header from '../../componets/shop/Header'
import DashboardSlider from '../../componets/DashboardSlider'
import CreateProduct from "../../componets/shop/AddProduct.jsx"



function AddProduct() {
  
  return (
    <div>
      <Header/>
     <div className="flex items-center gap-3 bg-[#e2e2eeee] h-[100vh]">
      <div className="w-[20%]  ">
        <DashboardSlider active={4} />
      </div>
     
        <CreateProduct/>
      
     </div>
    </div>
  )
}

export default AddProduct