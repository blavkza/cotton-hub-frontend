import React from 'react'
import Header from '../../componets/shop/Header'
import DashboardSlider from '../../componets/DashboardSlider'
import AddEvant from '../../componets/shop/AddEvant'




function AddEvantPage() {
  
  return (
    <div>
      <Header/>
     <div className="flex items-center gap-3 bg-[#e2e2eeee] h-[100vh]">
      <div className="w-[20%]  ">
        <DashboardSlider active={6} />
      </div>
     
        <AddEvant/>
      
     </div>
    </div>
  )
}

export default AddEvantPage