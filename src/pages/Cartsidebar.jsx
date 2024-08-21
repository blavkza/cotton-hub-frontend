import React from 'react'

function Cartsidebar() {
  return (
    <div>
      <div className="bg-opacity-0">
        <div className="bg-white" style={{width:"30%"}}>
          <div className="flex items-center justify-between">
            <p>Back</p>
            <h1>CART</h1>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <p>cotton hud</p>
              <p>R700</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cartsidebar
