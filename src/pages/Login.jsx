import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoArrowBackSharp } from "react-icons/io5";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetState } from "../features/user/userSlice";
import Loader from "../componets/Loader";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

const Login = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  const userStates = useSelector((state) => state?.auth);

  const { user, isSuccess, isLoading } = userStates;

  useEffect(() => {
    const token = user?.token;
    if (token) {
      navigate("/");
    }

    dispatch(resetState());
  }, [isSuccess, dispatch, navigate]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        window.location.reload(true);
      }, 2000);
    }
  }, [isSuccess]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div>
        {isLoading && !isSuccess ? (
          <div className="flex items-center justify-center h-[100vh] w-full top-0 z-30 fixed ">
            <Loader />
          </div>
        ) : (
          <div className=" bg-[#fff8f8] items-center pt-10  justify-center  ">
            {" "}
            <div
              onClick={() => {
                handleGoBack();
              }}
              className="flex gap-3 justify-start items-center px-6 cursor-pointer"
            >
              <IoArrowBackSharp />
              <span>Go Back</span>
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="my-6 text-center text-3xl font-extrabold text-gray-900">
                Login
              </h2>
            </div>
            <div className=" sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 w-[90%]  ml-5 shadow-2xl rounded-3xl sm:px-10 mb-16">
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
                  </div>
                  <div className="error text-red-600 text-xs mt-2">
                    {formik.touched.email && formik.errors.email}
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
                        onBlur={formik.handleBlur("email")}
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

                  <button
                    type="submit"
                    className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent  font-medium rounded-full text-l text-white bg-black hover:bg-gray-900"
                  >
                    Login
                  </button>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="remember-me"
                        id="remember-me"
                        className="h-4 w-4  border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <Link
                        to="/forgotpassword"
                        className="ml-10  font-medium text-blue-600 hover:text-blue-500"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-center">
                      If you don't have an account{" "}
                      <Link
                        to="/register"
                        className="text-blue-600 pl-2 underline"
                      >
                        REGISTER
                      </Link>
                    </h4>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
