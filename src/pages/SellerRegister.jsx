import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoArrowBackSharp } from "react-icons/io5";
import Meta from "../componets/Meta";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerSeller } from "../features/seller/sellerSlice";


let schema = yup.object().shape({
  shopname: yup.string().required("Shop name is Required"),
  mobile: yup.number().required("mobile is Required"),
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  address: yup.string().required("address is Required"),
  zipcode: yup.string().required("zip code is Required"),
  password: yup.string().required("Password is Required"),
});

const SellerRegister = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formik = useFormik({
    initialValues: {
      shopname: "",
      mobile: "",
      email: "",
      address: "",
      zipcode:"",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(registerSeller(values));
    },
  });

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <>
      <Meta title="register" />
      <div className=" bg-[#e2e2eeee] flex flex-col justify-center  sm:px-6 lg:px-8">
      <div onClick={()=>{handleGoBack()}} className="flex gap-3 justify-start items-center px-6 pt-4 cursor-pointer">
          <IoArrowBackSharp />
          <span>Go Back</span>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="my-6 text-center text-3xl font-exrabold font-bold text-gray-900">
            Register Seller
          </h2>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 w-[90%] ml-5 shadow-xl rounded-3xl sm:px-10 mb-16">
            <form className="space-y-6 " onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Shop Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="shopname"
                    autoComplete="shop name"
                    value={formik.values.shopname}
                    onChange={formik.handleChange("shopname")}
                    onBlur={formik.handleBlur("shopname")}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="error mt-2 text-red-600 text-xs">
                {formik.touched.shopname && formik.errors.shopname}
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mobile
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="mobile"
                    autoComplete="mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange("mobile")}
                    onBlur={formik.handleBlur("mobile")}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="error mt-2 text-red-600 text-xs">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="error mt-2 text-red-600 text-xs">
                {formik.touched.email && formik.errors.email}
              </div>
           
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="address"
                    autoComplete="second name"
                    value={formik.values.address}
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="error mt-2 text-red-600 text-xs">
                  {formik.touched.address && formik.errors.address}
                </div>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Zip code
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="zipcode"
                    autoComplete="zip code"
                    value={formik.values.zipcode}
                    onChange={formik.handleChange("zipcode")}
                    onBlur={formik.handleBlur("zipcode")}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="error mt-2 text-red-600 text-xs">
                  {formik.touched.zipcode && formik.errors.zipcode}
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    value={formik.values.password}
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />

                  {visible ? (
                    <AiOutlineEye
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
              </div>
              <div className="error mt-2 text-red-600 text-xs">
                {formik.touched.password && formik.errors.password}
              </div>
              <div>
                <label
                  htmlFor="avatar"
                  className="black text-sm font-medium text-gray-700"
                ></label>
              </div>

              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent  font-medium rounded-full text-l text-white bg-black hover:bg-gray-900"
              >
                Register
              </button>
              <h4 className="text-center">
                If you have any account{" "}
                <Link to="/seller-login" className="text-blue-600 pl-2 underline">
                  LOGIN
                </Link>
              </h4>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerRegister;
