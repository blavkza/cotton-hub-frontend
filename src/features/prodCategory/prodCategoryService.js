import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url";

const getProdCategory = async () => {
  const response = await axios.get(`${base_url}category/`, config);

  return response.data;
  
};

const createProdCategory = async (category) => {
  const response = await axios.post(`${base_url}category/`, category, config);

  return response.data;
};
const updateProdCategory = async (category) => {
  const response = await axios.put(
    `${base_url}category/${category.id}`,
    { title: category.categoryData.title },
    config
  );

  return response.data;
};
const getProdCategorie = async (id) => {
  const response = await axios.get(`${base_url}category/${id}`, config);

  return response.data;
};

const deleteProdCategory = async (id) => {
  const response = await axios.delete(`${base_url}category/${id}`, config);

  return response.data;
};




const prodCategoryService = {
  getProdCategory,
  createProdCategory,
  updateProdCategory,
  getProdCategorie,
  deleteProdCategory

};


export default prodCategoryService;
