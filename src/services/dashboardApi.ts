import axios from "./api";

export const getDashboard = () =>
  axios.get("/dashboard").then((res) => res.data);
