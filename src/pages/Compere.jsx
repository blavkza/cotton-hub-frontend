import React from "react";
import BreadCrumb from "../componets/BreadCrumb";
import Meta from "../componets/Meta";
import { AiOutlineClose } from "react-icons/ai";
import Color from "../componets/Color";

function Compere() {
  return (
    <div>
      <Meta title="Compare Products" />
      <BreadCrumb title="Compare Products" />
      <div class="py-5 bg-[#e2e2eeee] px-12">
        <div class="container">
          <div class="flex flex-wrap">
            <div class="px-5 py-4">
              <div class="w-48 bg-white items-center justify-center relative">
                <AiOutlineClose className="absolute top-4 right-2 size-5" />
                <div>
                  <img
                    class="object-contain w-full"
                    src="images/smart-watch-isolated-on-white-background-vector-11610149.jpg"
                    alt="watch"
                  />
                </div>
                <div className="mb-2 px-2 ">
                  <h5 className="text-xl mb-2">Smart Watch </h5>
                  <h6 className="text-sm mb-2">R500.00</h6>
                </div>
                <div className="flex items-center justify-between px-2 py-3 mb-2 border-t border-gray-300">
                  <h5 className=" font-semibold">Brand:</h5>
                  <p className="text-gray-700 text-sm">Havels</p>
                </div>
                <div className="flex items-center justify-between px-2 py-3 mb-2 border-t border-gray-300">
                  <h5 className=" font-semibold">Type:</h5>
                  <p className="text-gray-700 text-sm">Watch</p>
                </div>
                <div className="flex items-center justify-between px-2 py-3 mb-2 border-t border-gray-300 text-sm">
                  <h5 className=" font-semibold">Availability:</h5>
                  <p className="text-gray-700">In stock</p>
                </div>
                <div className="flex items-center justify-between px-2 py-3 mb-2 border-t border-gray-300 text-sm">
                  <h5 className=" font-semibold">Color:</h5>
                  <div>
                    <Color />
                  </div>
                </div>
                <div className="flex items-center justify-between px-2 py-3 mb-2 border-t border-gray-300 text-sm">
                  <h5 className="font-semibold">Size:</h5>
                  <div className="flex items-center gap-2">
                  <p className=" text-gray-700">S</p>
                  <p className=" text-gray-700">M</p>
                  </div>
                </div>
              </div>
              
            </div>
            <div class="px-5 py-4">
              <div class="w-48 bg-white items-center justify-center relative">
                <AiOutlineClose className="absolute top-4 right-2 size-5" />
                <div>
                  <img
                    class="object-contain w-full"
                    src="images/smart-watch-isolated-on-white-background-vector-11610149.jpg"
                    alt="watch"
                  />
                </div>
                <div className="mb-2 px-2 ">
                  <h5 className="text-xl mb-2">Smart Watch </h5>
                  <h6 className="text-sm mb-2">R500.00</h6>
                </div>
                <div className="flex items-center justify-between px-2 py-3 mb-2 border-t border-gray-300">
                  <h5 className=" font-semibold">Brand:</h5>
                  <p className="text-gray-700 text-sm">Havels</p>
                </div>
                <div className="flex items-center justify-between px-2 py-3 mb-2 border-t border-gray-300">
                  <h5 className=" font-semibold">Type:</h5>
                  <p className="text-gray-700 text-sm">Watch</p>
                </div>
                <div className="flex items-center justify-between px-2 py-3 mb-2 border-t border-gray-300 text-sm">
                  <h5 className=" font-semibold">Availability:</h5>
                  <p className="text-gray-700">In stock</p>
                </div>
                <div className="flex items-center justify-between px-2 py-3 mb-2 border-t border-gray-300 text-sm">
                  <h5 className=" font-semibold">Color:</h5>
                  <div>
                    <Color />
                  </div>
                </div>
                <div className="flex items-center justify-between px-2 py-3 mb-2 border-t border-gray-300 text-sm">
                  <h5 className="font-semibold">Size:</h5>
                  <div className="flex items-center gap-2">
                  <p className=" text-gray-700">S</p>
                  <p className=" text-gray-700">M</p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Compere;
