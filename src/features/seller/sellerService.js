import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const registerSeller = async (sellerData) => {
  const response = await axios.post(`${base_url}Seller/register`, sellerData);

  return response.data;
};


const loginSeller = async (sellerData) => {
  const response = await axios.post(`${base_url}Seller/login`, sellerData);

  if (response.data) {
    localStorage.setItem("seller", JSON.stringify(response.data));
  }
  return response.data;
};

const getAllOder = async (id) => {
  try {
    const response = await axios.get(`${base_url}Seller/get-seller-orders/${id}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const getOder = async (id) => {
  try {
    const response = await axios.get(`${base_url}Seller/get-order/${id}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const getSeller = async (id) => {
  try {
    const response = await axios.get(`${base_url}Seller/get-seller/${id}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const getSellerBalance = async (id) => {
  try {
    const response = await axios.get(`${base_url}Seller/get-seller-balance/${id}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const sellerService = {
  registerSeller,
  loginSeller,
  getAllOder,
  getOder,
  getSeller,
  getSellerBalance
 
};

export default sellerService;
