import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";
import Cookies from "js-cookie";

console.log(config);

const register = async (userData) => {
  const response = await axios.post(`${base_url}User/register`, userData);

  return response.data;
};

const otpVerify = async (data) => {
  const response = await axios.post(`${base_url}User/verifyOtp`, data);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${base_url}User/loginUser`, userData, {
    withCredentials: true,
  });
  return response.data;
};

const getUser = async (id) => {
  const response = await axios.get(`${base_url}User/${id}`, config);

  return response.data;
};

const updateUser = async (user) => {
  const response = await axios.put(
    `${base_url}User/edit-user`,
    {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      mobile: user.mobile,
      image: user.image,
    },

    config
  );

  if (response.data) {
    Cookies.set("user", JSON.stringify(response.data), { expires: 1 });
  }

  return response.data;
};

const saveUserAddress = async (data) => {
  const response = await axios.put(
    `${base_url}User/save-address`,
    data,
    config
  );

  return response.data;
};

const removeAddress = async (addressType) => {
  const response = await axios.put(
    `${base_url}User/remove-address`,
    { addressType },
    config
  );

  return response.data;
};

const logOut = async () => {
  const response = await axios.get(`${base_url}User/logoutUser`, config);

  return response.data;
};

const resetPassword = async (data) => {
  const response = await axios.put(
    `${base_url}User/reset-password/${data.token}`,
    { password: data.password },
    config
  );

  return response.data;
};

const changePassword = async (data) => {
  const response = await axios.put(`${base_url}User/password`, data, config);

  return response.data;
};

const forgetPasswordToken = async (data) => {
  const response = await axios.post(
    `${base_url}User/forgot-password-token`,
    data
  );

  return response.data;
};

const addToCart = async (cartData) => {
  const response = await axios.post(`${base_url}User/cart`, cartData, config);

  if (response.data) {
    return response.data;
  }
};

const getCart = async () => {
  const response = await axios.get(`${base_url}User/cart`, config);

  if (response.data) {
    return response.data;
  }
};

const updateCartProduct = async (cartItemId, quantity) => {
  const quantityNumber = Number(quantity);
  if (isNaN(quantityNumber)) {
    throw new Error("Invalid quantity");
  }

  const response = await axios.put(
    `${base_url}User/update-cart-product/${cartItemId}/${quantityNumber}`,
    {},
    config
  );

  return response.data;
};

const deleteFromCart = async (id) => {
  const response = await axios.delete(
    `${base_url}User/delete-from-cart/${id}`,
    config
  );

  if (response.data) {
    return response.data;
  }
};

const getUserWishlist = async () => {
  const response = await axios.get(`${base_url}User/wishlist`, config);

  if (response.data) {
    return response.data;
  }
};

const applyCoupon = async (coupon, cart) => {
  const response = await axios.post(
    `${base_url}user/cart/applycoupon`,
    { coupon, cart },
    config
  );

  if (response.data) {
    return response.data;
  }
};

const oder = async (oderData) => {
  try {
    const response = await axios.post(
      `${base_url}user/cart/create-order`,
      { oderData },
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUserOder = async (id) => {
  try {
    const response = await axios.get(`${base_url}user/get-user-orders/${id}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const orderRefund = async (id, status) => {
  try {
    const response = await axios.put(`${base_url}user/order-refund/${id}`, { status }, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};


const authService = {
  register,
  otpVerify,
  login,
  forgetPasswordToken,
  resetPassword,
  changePassword,
  getUserWishlist,
  addToCart,
  getCart,
  deleteFromCart,
  logOut,
  updateCartProduct,
  updateUser,
  saveUserAddress,
  removeAddress,
  getUser,
  applyCoupon,
  oder,
  getUserOder,
  orderRefund
  
};

export default authService;
