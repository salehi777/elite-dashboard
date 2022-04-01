import axios from "axios";
import { toast } from "react-toastify";
import { store } from "store/store";

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
    if (config.headers)
      config.headers.Authorization = `Bearer ${
        store.getState().auth.token || ""
      }`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    showError(error.response);
    return Promise.reject(error);
  }
);

const showError = (response: any) => {
  const message: string | string[] = response?.data?.message || "Network Error";

  if (Array.isArray(message)) {
    toast.error(message.join("\n"));
  } else {
    toast.error(message);
  }
};

export default api;
