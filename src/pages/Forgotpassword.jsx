import React, { useEffect, useState } from "react";
import Meta from "../componets/Meta";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { passwordToken, resetAPassword } from "../features/user/userSlice";
import Loader from "../componets/Loader";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
});

function Forgotpassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(passwordToken(values));
    },
  });

  const userState = useSelector((state) => state.auth);


  const { isSuccess, isLoading } = userState;
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        window.location.reload(true);
      }, 2000);
    }
  }, [isSuccess, isLoading, navigate]);

  return (
    <div>
      <Meta title="login" />
      {isLoading && !isSuccess ? (
        <div className="flex items-center justify-center h-[100vh] w-full top-0 z-30 fixed ">
          <Loader />
        </div>
      ) : (
        <div className=" bg-[#e2e2eeee] flex flex-col justify-center h-[100vh] ">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="my-6 text-center text-3xl font-extrabold text-gray-900">
              Reset Password
            </h2>
            <div className="text-center py-2 text-gray-700">
              You will recever an email
            </div>
          </div>
          <div className=" sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 w-[90%]  ml-5 shadow-xl rounded-3xl sm:px-10 mb-16">
              <form className="space-y-6" onSubmit={formik.handleSubmit}>
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
                  <div className="error text-red-600 text-xs mt-2">
                    {formik.touched.email && formik.errors.email}
                  </div>
                </div>

                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent  font-medium rounded-full text-l text-white bg-black hover:bg-gray-900"
                >
                  Submit
                </button>

                <div className="py-3 flex justify-center">
                  <Link to="/login">
                    <h6 className="text-center ">Cancel</h6>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className=" bg-[#e2e2eeee] flex flex-col justify-center h-[100vh] ">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="my-6 text-center text-3xl font-extrabold text-gray-900">
            Reset Password
          </h2>
          <div className="text-center py-2 text-gray-700">
            You will recever an email
          </div>
        </div>
        <div className=" sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 w-[90%]  ml-5 shadow-xl rounded-3xl sm:px-10 mb-16">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
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
                <div className="error text-red-600 text-xs mt-2">
                  {formik.touched.email && formik.errors.email}
                </div>
              </div>

              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent  font-medium rounded-full text-l text-white bg-black hover:bg-gray-900"
              >
                Submit
              </button>

              <div className="py-3 flex justify-center">
                <Link to="/login">
                  <h6 className="text-center ">Cancel</h6>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgotpassword;
