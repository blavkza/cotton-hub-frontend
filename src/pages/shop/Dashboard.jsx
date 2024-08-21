import React, { useState } from 'react'
import Header from '../../componets/shop/Header'
import DashboardSlider from '../../componets/DashboardSlider.jsx'
import DashboardOverAll  from '../../componets/shop/DashboardOverAll.jsx'

function Dashboard() {


  return (
    <div>
     <Header/>
     <div className="flex items-center bg-[#e2e2eeee] h-auto">
      <div className="w-[20%]  ">
        <DashboardSlider active={1} />
      </div>
      <DashboardOverAll />
     </div>
    </div>
  )
}

export default Dashboard
