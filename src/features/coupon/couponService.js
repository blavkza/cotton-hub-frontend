import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url";

const getCoupons = async (shopId) => {
  const response = await axios.get(`${base_url}coupon/${shopId}`, config);

  return response.data;
};

const createCoupon = async (coupon) => {
  const response = await axios.post(`${base_url}coupon/`, coupon, config);

  return response.data;
};

const updateCoupon = async (coupon) => {
  const response = await axios.put(
    `${base_url}coupon/${coupon.id}`,
    {
      name: coupon.couponData.name,
      expiry: coupon.couponData.expiry,
      discount: coupon.couponData.discount,
    },
    config
  );

  return response.data;
};

const getCoupon = async (id) => {
  const response = await axios.get(`${base_url}coupon/${id}`, config);

  return response.data;
};

const deleteCoupon = async (id) => {
  const response = await axios.delete(`${base_url}coupon/${id}`, config);

  return response.data;
};


const couponService = {
  getCoupons,
  createCoupon,
  updateCoupon,
  getCoupon,
  deleteCoupon
  
};

export default couponService;