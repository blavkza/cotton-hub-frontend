import React from "react";
import BreadCrumb from "../componets/BreadCrumb";
import Meta from "../componets/Meta";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { getUserWishlist } from "../features/user/userSlice";
import { addToWishlist } from "../features/product/productSlice";
import { Link } from "react-router-dom";

function Wishlist() {
  const dispatch = useDispatch();


  useEffect(() => {
    getwishlist();
  }, []);

  const getwishlist = () => {
    dispatch(getUserWishlist());
  };

  const wistlistState = useSelector((state) => state.auth?.wishlist?.wishlist);


  console.log(wistlistState);

  const removeFromWhishlist = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserWishlist());
    }, 200);
  };

  return (
    <div>
      <Meta title="Wish list" />
      <BreadCrumb title="Wish list" />
      {wistlistState ? (
        <div class="md:py-5 sm:py-3 sm:px-8 md:px-12 px-4 py-2 pt-10 sm:pt-5 bg-[#e2e2eeee] h-[90vh]">
          {wistlistState?.length === 0 && (
            <div className="h-[50vh] ">
              <h1 className="text-center pt-10">
                {" "}
                NO PRODUCT ADDED TO WISHLIST
              </h1>
            </div>
          )}
          <div class="grid grid-cols-2 sm:grid-cols-5 justify-center items-center">
            {wistlistState?.map((item, index) => {
              return (
                <div class="flex flex-wrap" key={index}>
                  <div class="px-5 py-4 ">
                    <div class="w-44 bg-white rounded  items-center justify-center relative">
                      <AiOutlineClose
                        onClick={(e) => {
                          removeFromWhishlist(item?._id);
                        }}
                        className="absolute top-4 right-2 size-5 cursor-pointer"
                      />
                      <div className="h-[210px]">
                        <img
                          class=" w-full h-full object-cover rounded-t"
                          src={item?.image[0].url}
                          alt="watch"
                        />
                      </div>
                      <div className="mb-4 px-2 ">
                        <Link to={""}>
                          <h3 className="text-[#171818] text-sm font-semibold  capitalize hover:underline truncate pt-1">
                            {item?.brands}
                          </h3>
                        </Link>
                        <h5 className="text-l font-semibold py-2 truncate">
                          {item?.title}
                        </h5>
                        <h6 className="text-l py-3 mb-2">R{item?.price}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="h-[50vh] ">
          <h1 className="text-center pt-10">
            {" "}
            Please
            <Link to="/login" className="text-blue-600 pl-2 underline">
              Login
            </Link>{" "}
            to add product to wistlist
          </h1>
        </div>
      )}
    </div>
  );
}

export default Wishlist;
