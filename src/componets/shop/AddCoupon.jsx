import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createCoupon,
  getACoupon,
  resetState,
  updateACoupon,
} from "../../features/coupon/couponSlice";
import { getProducts } from "../../features/product/productSlice";

let schema = yup.object().shape({
  name: yup.string().required("Coupon Name is Required"),
  expiry: yup.string().required("Expiry Date is Required"),
  discount: yup.number().required("Discount is Required"),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getCouponId = location.pathname.split("/")[3];
  const couponState = useSelector((state) => state.coupons);

  const {
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    couponName,
    couponExpiary,
    couponDiscount,
    couponMinAmount,
    couponMaxAmount,
    couponselectedProduct,
    updatedCoupon,
  } = couponState;

  const changeDateFormet = (date) => {
    const isoDate = new Date(date).toISOString().split("T")[0];
    return isoDate;
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const productState = useSelector((state) => state.products.products);

  const sellerState = useSelector((state) => state.seller.seller);

  const shopId = sellerState?._id;

  const filteredProducts = productState?.filter(
    (product) => product.sellerId === shopId
  );

  

  useEffect(() => {
    if (getCouponId) {
      dispatch(getACoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon Added Successfully!");
      navigate("/dashboard/coupons");
    }

    if (isSuccess && updatedCoupon) {
      toast.success("Coupon Updated Successfully!");
      navigate("/dashboard/coupons");
    }

    if (isError) {
      toast.error("Something Went Wrong or coupon alredy exist!");
    }
    return () => {
      if (isSuccess || isError) {
        dispatch(resetState());
      }
    };
  }, [isSuccess, isError, updatedCoupon, navigate, dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || "",
      expiry: couponExpiary ? changeDateFormet(couponExpiary) : "",
      discount: couponDiscount || "",
      minAmount: couponMinAmount || "",
      maxAmount: couponMaxAmount || "",
      selectedProduct: couponselectedProduct || "",
      shopId: shopId,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCouponId) {
        const data = { id: getCouponId, couponData: values };

        dispatch(updateACoupon(data));
      } else {
        dispatch(createCoupon(values));
      }
    },
  });

  return (
    <div className="w-[70%]  overflow-y-auto ">
      <div className="flex flex-row items-center justify-between mb-4">
        <h4 className=" font-bold">{getCouponId ? "Edit" : "Add"} Coupon</h4>
      </div>
      <div className="mb-4 bg-white shadow-lg rounded-xl p-4  ">
        <form action="" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            placeholder="Enter Coupon Name"
            id="name"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm placeholder-gray-500 mb-4"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="error text-red-600 text-xs my-4">
              {formik.errors.name}
            </div>
          )}

          <input
            type="date"
            name="expiry"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.expiry}
            placeholder="Enter Coupon Expiry"
            id="expiry"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm placeholder-gray-500 mb-4"
          />
          {formik.touched.expiry && formik.errors.expiry && (
            <div className="error text-red-600 text-xs my-4">
              {formik.errors.expiry}
            </div>
          )}

          <input
            type="number"
            name="discount"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.discount}
            placeholder="Enter Coupon Discount Percent"
            id="discount"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm placeholder-gray-500 mb-4"
          />
          {formik.touched.discount && formik.errors.discount && (
            <div className="error text-red-600 text-xs my-4">
              {formik.errors.discount}
            </div>
          )}
          <input
            type="number"
            name="minAmount"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.minAmount}
            placeholder="Enter Coupon Min Amount"
            id="minAmount"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm placeholder-gray-500 mb-4"
          />
          <input
            type="number"
            name="maxAmount"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.maxAmount}
            placeholder="Enter Coupon Max Amount "
            id="maxAmount"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm placeholder-gray-500 mb-4"
          />
          <select
            name="selectedProduct"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.selectedProduct}
            className="bg-white py-3 border border-gray-300 rounded shadow-sm w-full"
          >
            <option value="" disabled>
              Select Product
            </option>
            {filteredProducts.map((product) => (
              <option key={product._id} value={product.title}>
                {product.title}
              </option>
            ))}
          </select>

          <div className="mt-6">
            <button
              className="w-full py-2 px-4 border font-medium rounded-lg text-lg text-white hover:bg-[rgb(225,159,27)] bg-gray-900"
              type="submit"
            >
              {getCouponId ? "Edit" : "Add"} Coupon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
