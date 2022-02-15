import axios from "axios";
import { toast } from "react-toastify";

const configs = {
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: (status: number) => status >= 200 && status < 400,
};

const api = axios.create(configs);

api.interceptors.request.use(
  (config) => {
    // console.log("config", config);
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    showError();
    return Promise.reject(error);
  }
);

const showError = () => {
  toast.error("messages");
};

export default api;
