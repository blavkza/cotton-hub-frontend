import axios from "axios";

import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";


const createEnquiry = async (contactData) => {
  const response = await axios.post(`${base_url}enquiry/`,contactData);
  return response.data;
};

const enquiryService = {
  createEnquiry
};

export default enquiryService;