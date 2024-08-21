import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CountDown from "./CountDown";

const SpacialProduct = (props) => {
  const { data } = props;

  const specialProducts =
    data?.filter((item) => item?.tags === "spacial") || [];

  return (
    <Carousel
      responsive={{
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 4,
        },
        desktop: {
          breakpoint: { max: 3000, min: 768 },
          items: 3,
        },
        tablet: {
          breakpoint: { max: 768, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      }}
      infinite={false}
      autoPlay={true}
      autoPlaySpeed={3500}
      keyBoardControl={true}
      containerClass="carousel-container"
      removeArrowOnDeviceType={[
        "tablet",
        "mobile",
        "desktop",
        "superLargeDesktop",
      ]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-60-px"
    >
      {specialProducts.map((item, index) => {
        const calculatedProgress = (item?.sold / item?.quantity) * 100;
        const imageUrl = item?.image?.[0]?.url || "";

        return (
          <div
            className="bg-white shadow-md rounded-md p-2 relative "
            key={index}
          >
            <div className="flex">
              <div className="w-1/2">
                <div className="h-[210px]">
                  <img
                    src={imageUrl}
                    alt="special product"
                    className="object-cover w-full h-full rounded-l"
                  />
                </div>
              </div>
              <div className="w-1/2 ml-2">
                <h5 className="brand truncate">{item?.brand}</h5>
                <h6 className="title truncate">{item?.title}</h6>
                <ReactStars
                  count={5}
                  size={22}
                  value={item?.totalrating}
                  edit={false}
                  activeColor="#ffd700"
                />
                <p className="red-p text-sm">
                  <span className="text-red-800">R{item?.price}</span>&nbsp;
                  <strike className="text-gray-500">R{item?.price}</strike>
                </p>
                <div className="flex gap-1 py-2 items-center text-xs font-thin">
                  <CountDown />
                </div>
                <div>
                  <p className="py-2 text-gray-600 text-xs">
                    Products: {item?.quantity}
                  </p>
                  <div className="w-full bg-gray-400 h-2 rounded-full">
                    <div
                      className="bg-blue-400 h-full rounded-full"
                      style={{ width: `${calculatedProgress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="my-4">
                  <Link
                    to="/cart"
                    className="bg-[#0d101be1] mt-2 p-2 rounded-2xl 
              hover:bg-gray-700 text-white text-xs"
                  >
                    Add to Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default SpacialProduct;
