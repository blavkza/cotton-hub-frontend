import React from 'react'
import BreadCrumb from "../componets/BreadCrumb";
import Meta from "../componets/Meta";

function Shippingpolicy() {
  return (
    <div>
      <Meta title="shipping policy" />
      <BreadCrumb title="Shipping policy" />
      <div className="py-5 bg-[#e2e2eeee] px-12">
        <div className="container">
          <div className='bg-white p-8 rounded-lg shadow-lg'></div>
        </div>
      </div>
    </div>
  )
}

export default Shippingpolicy
