import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const createProduct = async (productData) => {
  const response = await axios.post(
    `${base_url}products/`,
    productData,
    config
  );
  return response.data;
};

const getProducts = async () => {
  const response = await axios.get(`${base_url}products/`);
  return response.data;
};

const getAProduct = async (id) => {
  const response = await axios.get(`${base_url}products/${id}`);

  return response.data;
};

const addToWishlist = async (prodId) => {
  const response = await axios.put(
    `${base_url}products/wishlist`,
    {
      prodId,
    },
    config
  );
  if (response.data) {
    return response.data;
  }
};

const rating = async ({ prodId, comment, star }) => {
  const response = await axios.put(
    `${base_url}products/rating`,
    {
      prodId,
      comment,
      star,
    },
    config
  );
  return response.data;
};


const productService = {
  getProducts,
  addToWishlist,
  getAProduct,
  createProduct,
  rating,
};

export default productService;
