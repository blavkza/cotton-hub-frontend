import React from 'react'
import BreadCrumb from "../componets/BreadCrumb";
import Meta from "../componets/Meta";
import BlogCard from '../componets/BlogCard';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBlogs } from '../features/blogs/blogSlice';

function Blogs() {
  const dispatch = useDispatch();
  useEffect(() => {
    getAllBlog();
    window.scrollTo(0, 0);
  }, []);

  const getAllBlog = () => {
    dispatch(getBlogs());
  };

  const blogsState = useSelector((state) => state.blog.blogs);


  return (
    <div>
      <Meta title="blogs" />
      <BreadCrumb title="Blogs" />
      <div className="py-5 bg-[#e2e2eeee] px-12">
        <div className="flex gap-4 pt-4">
          <div className=" gap-2" style={{ width: "25%" }}>
          <div className="bg-white mb-2 rounded-md shadow-md px-5">
              <h5 className="font-bold py-4">Find By Category</h5>
              <div className="py-4 text-sm  text-gray-800">
                <ul className="cursor-pointer">
                  <li className="mb-2 ">Watch</li>
                  <li className="mb-2 ">Radio</li>
                  <li className="mb-2 ">Phone</li>
                  <li className="mb-2 ">Laptop</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="" style={{ width: "75%" }}>
          <div className="grid grid-cols-2 gap-2">
              <BlogCard data={blogsState}/>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blogs