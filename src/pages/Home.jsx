import React, { useRef } from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import { TbTruckDelivery, TbGift, TbHeadset } from "react-icons/tb";
import {
  FaCreditCard,
} from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CiDiscount1 } from "react-icons/ci";
import { FaCamera, FaApple } from "react-icons/fa";
import { CgAdidas } from "react-icons/cg";
import BlogCard from "../componets/BlogCard";
import ProductCard from "../componets/ProductCard";
import SpacialProduct from "../componets/SpacialProduct";
import FamousCard from "../componets/FamousCard";
import FamousCardW from "../componets/FamousCardW";
import Meta from "../componets/Meta";
import Hero from "../images/woman-7712737_640.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBlogs } from "../features/blogs/blogSlice";
import { getProducts } from "../features/product/productSlice";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    getAllBlog();
    getAllProducts();
  }, []);

  const blogsState = useSelector((state) => state.blog.blogs);

  const getAllBlog = () => {
    dispatch(getBlogs());
  };

  const getAllProducts = () => {
    dispatch(getProducts());
  };
  const productState = useSelector((state) => state.products?.products);

  return (
    <>
      <Meta title="home" />
      <div className="bg-[#e2e2eeee] pt-16 sm:pt-8">
        <section>
          <div className="md:py-5 sm:py-3 sm:px-8 md:px-12 px-4 py-2 ">
            <div className="sm:flex sm:flex-row flex flex-col ">
              <div className="w-full sm:w-[50%] h-[440px]">
                <div className=" relative w-full h-full mt-6 ">
                  <img
                    src={Hero}
                    alt="hero image"
                    className=" rounded-l-lg rounded-br-lg"
                    style={{
                      width: "100%",
                      height: "95%",
                      objectFit: "cover",
                    }}
                  />
                  <div className=" absolute bottom-28 sm:right-24 right-20  text-center">
                    <h1 className=" text-4xl text-white font-extrabold">
                      COTTON HUB
                    </h1>
                    <p className="text-lg text-[#000000ee] font-bold"></p>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-[50%]  py-3 sm:pt-0">
                <div className="text-end">
                  <h1 className="text-5xl sm:text-6xl md:text-7xl text-black font-extrabold">
                    ONLINE <br /> FASHION
                  </h1>
                  <h2 className=" text-orange-600 text-5xl font-bold pt-2">
                    ##SALE
                  </h2>
                  <p className="text-xs font-light text-gray-700 pl-32 pt-2">
                    Fashion is more than clothes it's a powerful expression of
                    your unique identity Our latest collection empowers you with
                    confidence, turning heads and sparking conversations.
                  </p>
                  <div className="pt-8">
                    <button class="bg-black hover:bg-orange-600 hover:text-black text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform ">
                      SHOP NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="md:py-5 sm:py-3 sm:px-8 md:px-2 px-4 py-2 ">
            <div className="md:grid grid-cols-5 gap-2 md:px-12 hidden">
              <div className="flex items-center">
                <TbTruckDelivery className="text-2xl" />
                <div className="pl-2">
                  <h6>Free Shipping</h6>
                  <p className=" text-gray-700 text-xs">For oder over R700</p>
                </div>
              </div>
              <div className="flex items-center">
                <TbGift className="text-2xl" />
                <div className="pl-2">
                  <h6>Daily Gift Offers</h6>
                  <p className=" text-gray-700 text-xs">Save up to 35%</p>
                </div>
              </div>
              <div className="flex items-center">
                <TbHeadset className="text-2xl" />
                <div className="pl-2">
                  <h6>Support 24/7</h6>
                  <p className=" text-gray-700 text-xs">Shop with an expert</p>
                </div>
              </div>
              <div className="flex items-center">
                <CiDiscount1 className="text-2xl" />
                <div className="pl-2">
                  <h6>Affordable Prices</h6>
                  <p className=" text-gray-700 text-xs">Get factory prices </p>
                </div>
              </div>
              <div className="flex items-center">
                <FaCreditCard className="text-2xl" />
                <div className="pl-2">
                  <h6>Secure Payment</h6>
                  <p className=" text-gray-700 text-xs">100% protected</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="md:py-5 sm:py-3 sm:px-8 md:px-12 px-4 py-2">
            <div className="flex overflow-x-auto gap-2 sm:grid md:grid-cols-4 sm:grid-cols-3 ">
              <div className="flex-shrink-0 w-[calc(50%-0.5rem)] sm:w-full">
                <FamousCard />
              </div>
              <div className="flex-shrink-0 w-[calc(50%-0.5rem)]  sm:w-full">
                <FamousCardW />
              </div>
              <div className="flex-shrink-0 w-[calc(50%-0.5rem)]  sm:w-full">
                <FamousCardW />
              </div>
              <div className="flex-shrink-0 w-[calc(50%-0.5rem)]  sm:w-full">
                <FamousCardW />
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="md:py-5 sm:py-3 sm:px-8 md:px-12 px-4  py-2">
            <div className="flex justify-between py-4 text-base font-bold">
              <h3>OUR BRANDS</h3>
            </div>
            <div className="md:py-5 py-2 conteiner max-w-full rounded-lg shadow-3xl shadow-black bg-white">
              <Marquee className="flex items-center justify-between">
                <div className="mx-4 w-25 text-4xl">
                  <FaApple />
                </div>
                <div className="mx-4 w-25 text-4xl">
                  <CgAdidas />
                </div>
                <div className="mx-4 w-25 text-4xl">
                  <FaApple />
                </div>
                <div className="mx-4 w-25 text-4xl">
                  <CgAdidas />
                </div>
                <div className="mx-4 w-25 text-4xl">
                  <FaApple />
                </div>
                <div className="mx-4 w-25 text-4xl">
                  <CgAdidas />
                </div>
                <div className="mx-4 w-25 text-4xl">
                  <FaApple />
                </div>
                <div className="mx-4 w-25 text-4xl">
                  <CgAdidas />
                </div>
              </Marquee>
            </div>
          </div>
        </section>
        <section>
          <div className="md:py-5 sm:py-3 sm:px-8 md:px-12 px-4 py-2 ">
            <div className="flex justify-between py-4 text-base font-bold">
              <h3>SPACIAL PRODUCTS</h3>
            </div>
            <div className="">
              <SpacialProduct data={productState} />
            </div>
          </div>
        </section>
        <section>
          <div className="md:py-5 sm:py-3 sm:px-8 md:px-12 px-4 py-2">
            <div className="flex justify-between py-4 text-base font-bold">
              <h3>FEATURED COLLECTION</h3>
            </div>

            <div className="z-50">
              <ProductCard data={productState} />
            </div>
          </div>
        </section>

        <section>
          <div className="md:py-5 sm:py-3 sm:px-8 md:px-12 px-4 py-2">
         
            <div className="flex justify-between py-4 text-base font-bold">
              <h3>OUR LATEST BLOGS</h3>
            </div>
            <div className=" ">
              <BlogCard data={blogsState} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
