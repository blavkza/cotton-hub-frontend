import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { ChangeAPassword } from "../../features/user/userSlice";


let schema = yup.object().shape({
  oldpassword: yup.string().required("Old Password is required"),
  newpassword: yup.string().required("New Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newpassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

function ChangePassword() {
  const dispatch = useDispatch();
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const formik = useFormik({
    initialValues: {
      oldpassword:"",
      newpassword: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(ChangeAPassword(values));
    },
  });


  return (
    <div className="w-full px-5 ">
      <div>
        <div className="flex items-center justify-between text-lg pb-2 mb-4">
          <h1>Change Password</h1>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-4 ">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div className="">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Old Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible1 ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  value={formik.values.oldpassword}
                  onChange={formik.handleChange("oldpassword")}
                  onBlur={formik.handleBlur("oldpassword")}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />

                {visible1 ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible1(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible1(true)}
                  />
                )}
              </div>
              <div className="error text-red-600 text-xs mt-2">
                  {formik.touched.oldpassword &&
                    formik.errors.oldpassword}
                </div>
            </div>
            <div className="">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible2 ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  value={formik.values.newpassword}
                  onChange={formik.handleChange("newpassword")}
                  onBlur={formik.handleBlur("newpassword")}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />

                {visible2 ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible2(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible2(true)}
                  />
                )}
              </div>

              <div className="error text-red-600 text-xs mt-2">
                  {formik.touched.newpassword &&
                    formik.errors.newpassword}
                </div>
            </div>
            <div className="">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  name="confirmPassword"
                  autoComplete="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <div className="error text-red-600 text-xs mt-2">
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent font-medium rounded-full text-l text-white bg-black hover:bg-gray-900"
            >
              Reset
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
