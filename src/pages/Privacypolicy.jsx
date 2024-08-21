import React from 'react'
import BreadCrumb from "../componets/BreadCrumb";
import Meta from "../componets/Meta";

function Privacypolicy() {
  return (
    <div>
      <Meta title="privacy policy" />
      <BreadCrumb title="Privacy policy" />
      <div className="py-5 bg-[#e2e2eeee] px-12">
        <div className="container">
          <div className='bg-white p-8 rounded-lg shadow-lg'></div>
        </div>
      </div>
    </div>
  )
}

export default Privacypolicy
