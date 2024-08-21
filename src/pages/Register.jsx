import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoArrowBackSharp } from "react-icons/io5";
import Meta from "../componets/Meta";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/user/userSlice";
import Loader from "../componets/Loader";


const schema = yup.object().shape({
  firstname: yup.string().required("First name is Required"),
  lastname: yup.string().required("Last name is Required"),
  mobile: yup.string().required("Mobile is Required"),
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

const Register = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const newUser = useSelector((state) => state.auth);

  const { isSuccess, isLoading } = newUser;
  useEffect(() => {
    if (isSuccess) {
      navigate("/OTPVerify");
      setTimeout(() => {
        window.location.reload(true);
      }, 1000);
    }
  }, [isSuccess, isLoading, navigate]);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      mobile: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-[100vh] w-full top-0 z-30 fixed">
          <Loader />
        </div>
      ) : (
        <div>
          <Meta title="Register" />
          <div className="bg-[#e2e2eeee] flex flex-col pt-5 sm:px-6 lg:px-8 ">
            <div
              onClick={handleGoBack}
              className="flex gap-3 justify-start items-center px-6 cursor-pointer"
            >
              <IoArrowBackSharp />
              <span>Go Back</span>
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="my-6 text-center text-3xl font-bold text-gray-900">
                Register
              </h2>
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-6 px-4 w-[90%] ml-5 shadow-xl rounded-3xl sm:px-10 mb-16">
                <form className="space-y-6" onSubmit={formik.handleSubmit}>
                  <div>
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="firstname"
                        autoComplete="given-name"
                        value={formik.values.firstname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    {formik.touched.firstname && formik.errors.firstname && (
                      <div className="error mt-2 text-red-600 text-xs">
                        {formik.errors.firstname}
                      </div>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="lastname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="lastname"
                        autoComplete="family-name"
                        value={formik.values.lastname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    {formik.touched.lastname && formik.errors.lastname && (
                      <div className="error mt-2 text-red-600 text-xs">
                        {formik.errors.lastname}
                      </div>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="mobile"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mobile
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="mobile"
                        autoComplete="tel"
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    {formik.touched.mobile && formik.errors.mobile && (
                      <div className="error mt-2 text-red-600 text-xs">
                        {formik.errors.mobile}
                      </div>
                    )}
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                      <div className="error mt-2 text-red-600 text-xs">
                        {formik.errors.email}
                      </div>
                    )}
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
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
                    {formik.touched.password && formik.errors.password && (
                      <div className="error mt-2 text-red-600 text-xs">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent font-medium rounded-full text-l text-white bg-black hover:bg-gray-900"
                  >
                    Register
                  </button>
                  <h4 className="text-center">
                    If you have an account{" "}
                    <Link to="/login" className="text-blue-600 pl-2 underline">
                      LOGIN
                    </Link>
                  </h4>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
