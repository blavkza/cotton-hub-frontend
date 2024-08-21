import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { IoIosAddCircle, IoIosHeart } from "react-icons/io";
import { IoBagAddOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../features/product/productSlice";
import { getUserWishlist } from "../features/user/userSlice";
import ProductDetailCard from "../componets/ProductDetailCard";

function StoreProductCart(props) {
  const dispatch = useDispatch();
  const { data } = props;

  const [shuffledData, setShuffledData] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      const shuffleArray = (array) => {
        let shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [
            shuffledArray[j],
            shuffledArray[i],
          ];
        }
        return shuffledArray;
      };

      setShuffledData(shuffleArray(data));
    } else {
    }
  }, [data]);

  useEffect(() => {
    getwishlist();
  }, []);

  const getwishlist = () => {
    dispatch(getUserWishlist());
  };

  const addTowish = (id) => {
    if (wishlist.includes(id)) {
      setWishlist((prevWishlist) =>
        prevWishlist.filter((productId) => productId !== id)
      );
    } else {
      setWishlist((prevWishlist) => [...prevWishlist, id]);
    }
    dispatch(addToWishlist(id));
  };

  const wishlistState = useSelector((state) => state.auth?.wishlist?.wishlist);

  const isInWishlist = (id) => wishlist.includes(id);

  useEffect(() => {
    if (wishlistState) {
      setWishlist(wishlistState.map((item) => item._id));
    }
  }, [wishlistState]);

  const handleQuickView = (productId) => {
    setCurrentProductId(productId);
    setOpen(true);
  };

  return (
    <>
      {shuffledData?.map((item, index) => (
        <div key={index} className="bg-white shadow-md rounded-md p-2 relative">
          <div className="h-[210px]">
            <Link to={"/product/" + item?._id} className="relative">
              <img
                src={item?.image[0]?.url}
                alt="product img"
                className="hover:opacity-0 w-full h-full object-cover"
              />
              <img
                src={
                  item?.image[1]?.url
                    ? item?.image[1]?.url
                    : item?.image[0]?.url
                }
                alt="product img"
                className="absolute top-0 left-0 w-full h-full object-cover opacity-0 hover:opacity-100 transition-opacity duration-300"
              />
            </Link>
          </div>
          <div className="">
            <div>
              <Link to={""}>
                <h3 className="text-[#171818] text-sm font-semibold py-1 capitalize hover:underline truncate ">
                  {item?.brands}
                </h3>
              </Link>
              <h6 className="text-[#e06830] text-sm py-1 truncate ">
                {item?.title}
              </h6>

              <div className="flex justify-between">
                <p className=" text-l pb-2">R {item?.price}</p>
                <Link className="text-gray-900 hover:text-gray-500">
                  <IoIosAddCircle
                    onClick={() => handleQuickView(item._id)}
                    title="Add to Cart"
                    size={25}
                  />
                </Link>
              </div>
              <ReactStars
                count={5}
                size={22}
                value={item?.totalrating}
                edit={false}
                activeColor="#ffd700"
              />
            </div>
            <div className="absolute top-4 right-3 text-gray-800">
              {isInWishlist(item._id) ? (
                <IoIosHeart
                  className="cursor-pointer"
                  onClick={() => addTowish(item._id)}
                  color="red"
                />
              ) : (
                <IoIosHeart
                  className="cursor-pointer"
                  onClick={() => addTowish(item._id)}
                  color="black"
                />
              )}
            </div>

            <div className="absolute top-10 right-3">
              <div className="flex flex-col gap-3">
                {open && currentProductId === item._id ? (
                  <ProductDetailCard
                    open={open}
                    setOpen={setOpen}
                    data={currentProductId}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default StoreProductCart;
