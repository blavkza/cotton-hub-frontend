import React from 'react'

const FamousCardW = () => {
  return (
    <>
    <div className="bg-white shadow-md rounded-md p-4 relative" style={{ height: "400px" }}>
      <div className="py-2 text-black" style={{ height: "100%" }}>
        <img src="images/ac11c5d1-e91b-4d23-82d1-a7ab6ce0ca35_1.85ac5d4794c8bde73430fd8c4a67e795.webp" alt="" className="w-full h-full object-cover" />
        <div className="absolute top-10 left-5">
          <h6 className="text-sm pb-1">Big Screen</h6>
          <h5 className="font-bold pb-1">Smart Watch Series 7</h5>
          <p className="font-thin text-xs">from R150 p.m in 24 months</p>
        </div>
      </div>
    </div>
  </>
  )
}

export default FamousCardW
