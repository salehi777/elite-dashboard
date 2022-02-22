import axios from "./api";

export * from "./authApi";
export * from "./dashboardApi";
export * from "./invoiceApi";
export * from "./analyticsApi";

export const uploadApi = (body: any) =>
  axios.post("/files/upload", body).then((res) => res.data);
