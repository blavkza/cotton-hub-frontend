import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Country, State, City } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import {
  getAUser,
  resetState,
  saveAUserAddress,
  removeAUserAddress,
} from "../../features/user/userSlice";
import { RiDeleteBin7Line } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";

let schema = yup.object().shape({
  province: yup.string().required("Province is Required"),
  city: yup.string().required("City is Required"),
  address1: yup.string().required("Address 1 is Required"),
  address2: yup.string().required("Address 2 is Required"),
  addressType: yup.string().required("Address Type is Required"),
});

function Address({ userId }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAUser(userId));
  }, [dispatch, userId]);

  const address = useSelector((state) => state.auth.user?.getUser?.address);

  console.log(address);

  const addressTypeData = [
    { name: "Default" },
    { name: "Home" },
    { name: "Office" },
  ];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      country: "ZA",
      province: "",
      city: "",
      address1: "",
      address2: "",
      addressType: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await dispatch(saveAUserAddress({ address: values }));
      setOpen(false);
      setTimeout(() => {
        dispatch(getAUser(userId));
      }, 100);
    },
  });

  const handleRemoveAddress = async (addressType) => {
    await dispatch(removeAUserAddress(addressType));
    setTimeout(() => {
      dispatch(getAUser(userId));
    }, 100);
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed top-0 left-0 h-screen w-full bg-[#0000004b] flex items-center justify-center">
          <div className="flex flex-col bg-white rounded-md shadow-xl p-4 h-[80%] w-[70%] relative overflow-y-auto">
            <div
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4"
            >
              <RxCross1 size={16} className="cursor-pointer" />
            </div>
            <h4 className="text-center font-semibold">Add Address</h4>
            <div className="w-full pt-2">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <label>
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="country"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.country}
                    className="bg-white py-3 border border-gray-300 rounded shadow-sm w-full"
                  >
                    <option value="" className="block border pb-2">
                      Choose your country
                    </option>
                    {Country.getAllCountries().map((item) => (
                      <option
                        className="block pb-2"
                        key={`${item.isoCode}-${item.name}`}
                        value={item.isoCode}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label>
                    Province <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="province"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.province}
                    className="bg-white py-3 border border-gray-300 rounded shadow-sm w-full"
                  >
                    <option value="" className="block border pb-2">
                      Choose your province
                    </option>
                    {State.getStatesOfCountry(formik.values.country).map(
                      (item) => (
                        <option
                          className="block pb-2"
                          key={`${item.isoCode}-${item.name}`}
                          value={item.isoCode}
                        >
                          {item.name}
                        </option>
                      )
                    )}
                  </select>
                  {formik.touched.province && formik.errors.province && (
                    <div className="error text-red-600 text-xs my-4">
                      {formik.errors.province}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label>
                    City/Town <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="city"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.city}
                    className="bg-white py-3 border border-gray-300 rounded shadow-sm w-full"
                  >
                    <option value="" className="block border pb-2">
                      Choose your city/town
                    </option>
                    {City.getCitiesOfState(
                      formik.values.country,
                      formik.values.province
                    ).map((item) => (
                      <option
                        className="block pb-2"
                        key={`${item.isoCode}-${item.name}`}
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.city && formik.errors.city && (
                    <div className="error text-red-600 text-xs my-4">
                      {formik.errors.city}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label>
                    Address 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address1"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address1}
                    className="appearance-none block w-full px-2 py-2 border border-gray-300 rounded shadow-sm placeholder-gray-900"
                  />
                  {formik.touched.address1 && formik.errors.address1 && (
                    <div className="error text-red-600 text-xs my-4">
                      {formik.errors.address1}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label>Address 2</label>
                  <input
                    type="text"
                    name="address2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address2}
                    className="appearance-none block w-full px-2 py-2 border border-gray-300 rounded shadow-sm placeholder-gray-900"
                  />
                  {formik.touched.address2 && formik.errors.address2 && (
                    <div className="error text-red-600 text-xs my-4">
                      {formik.errors.address2}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label>
                    Address Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="addressType"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.addressType}
                    className="bg-white py-3 border border-gray-300 rounded shadow-sm w-full"
                  >
                    <option value="" className="block border pb-2">
                      Choose your address type
                    </option>
                    {addressTypeData.map((item) => (
                      <option
                        className="block pb-2"
                        key={`${item.isoCode}-${item.name}`}
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.addressType && formik.errors.addressType && (
                    <div className="error text-red-600 text-xs my-4">
                      {formik.errors.addressType}
                    </div>
                  )}
                </div>
                <div className="my-4">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 border font-medium rounded-lg text-lg text-white hover:bg-[rgb(192,133,15)] bg-gray-900"
                  >
                    Add Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div>
        <div className="flex items-center justify-between text-lg pb-2 mb-4">
          <h1>Address</h1>
          {open ? null : (
            <span
              onClick={() => setOpen(true)}
              className="text-sm bg-black hover:bg-[red] text-white font-bold py-1 px-3 rounded-3xl transition duration-300 ease-in-out transform"
            >
              Add New
            </span>
          )}
        </div>
        {address?.length > 0 ? (
          address?.map((item, index) => (
            <div key={index} className="bg-white shadow-lg rounded-xl p-4 mb-2">
              <div className="flex gap-1 items-center justify-between sm:text-sm text-xs font-light">
                <p className="sm:text-sm font-semibold pr-2">
                  {item?.addressType}
                </p>
                <p className="sm:text-sm truncate pr-2">
                  {item?.city}, {item?.address1}, {item?.address2}
                </p>
                <div
                  className="sm:text-2xl cursor-pointer"
                  onClick={() => handleRemoveAddress(item?.addressType)}
                >
                  <RiDeleteBin7Line />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="h-[50vh] flex justify-center items-center">
            <h1 className="text-center pt-10"> NO ADDRESS ADDED</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Address;
