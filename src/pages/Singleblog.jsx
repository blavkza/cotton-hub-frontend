import React from "react";
import BreadCrumb from "../componets/BreadCrumb";
import Meta from "../componets/Meta";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getABlog } from "../features/blogs/blogSlice";
import { useLocation } from "react-router-dom";
import moment from "moment";

function Singleblog() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    getBlog();
    window.scrollTo(0, 2);
  }, []);

  const getBlogId = location.pathname.split("/")[2];

  const getBlog = () => {
    dispatch(getABlog(getBlogId));
  };

  const blogsState = useSelector((state) => state.blog.singileBlog);

  return (
    <div>
      <Meta title="Single blog" />
      <BreadCrumb title="Single blog" />
      <div className="py-5 bg-[#e2e2eeee] px-12">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="">
            <Link to="/blogs" className="flex items-center gap-2">
              <AiOutlineArrowLeft />
              <p className="text-sm text-gray-700">Go back to blogs</p>
            </Link>

            <h3 className="text-xl font-semibold py-4">{blogsState?.title}</h3>
            <div className=" h-[500px] py-4">
              <img
                src={
                  blogsState?.image && blogsState?.image?.length > 0
                    ? blogsState?.image[0].url
                    : ""
                }
                alt="single-blog"
                className="rounded-t-md w-full h-full object-cover"
              />
            </div>
            <p className="date text-sm font-thin pb-2 text-gray-700">
              {moment(blogsState?.createdAt).format("MMMM Do YYYY")}
            </p>
            <p
              className="font-sm text-gray-900"
              dangerouslySetInnerHTML={{
                __html: blogsState?.description,
              }}
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Singleblog;
