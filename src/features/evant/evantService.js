import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const createEvant = async (evantData) => {
  const response = await axios.post(`${base_url}evants/`, evantData,config );
  return response.data;

};


const getAllEvants = async () => {
  const response = await axios.get(`${base_url}evants/`);
  return response.data;
};

const getAEvant = async (id) => {
  const response = await axios.get(`${base_url}evants/${id}`);

  return response.data;
};



const evantService = {
  getAllEvants,
  getAEvant,
  createEvant
};

export default evantService;
