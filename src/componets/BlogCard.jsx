import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; 

function BlogCard({ data }) {
  const sortedData = [...data].sort((a, b) => moment(b.createdAt) - moment(a.createdAt));

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 768 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3500}
      keyBoardControl={true}
      containerClass="carousel-container"
      itemClass="carousel-item-padding-40-px" 
    >
      {sortedData.map((item, index) => (
        <div className="bg-white shadow-md rounded-md p-1" key={index}>
          <div className="h-[210px] overflow-hidden">
            <img
              src={
                item?.image && item?.image?.length > 0
                  ? item?.image[0].url
                  : ""
              }
              alt=""
              className="rounded-t-md w-full h-full object-cover"
            />
          </div>

          <div className="py-4 px-2">
            <p className="date text-xs font-thin pb-1 text-gray-700">
              {moment(item?.createdAt).format("MMMM Do YYYY")}
            </p>
            <h5 className="title font-bold text-sm pb-2">
              {item?.title}
            </h5>
            <p
              className="descpr text-xs font-thin pb-3 text-gray-700"
              dangerouslySetInnerHTML={{
                __html: item?.description.substr(0, 55) + "...",
              }}
            ></p>

            <Link
              to={"/blog/" + item?._id}
              className="bg-[#0d101be1] p-2 rounded-xl 
               hover:bg-gray-700 text-white text-xs"
            >
              Read More
            </Link>
          </div>
        </div>
      ))}
    </Carousel>
  );
}

export default BlogCard;
