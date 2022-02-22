import axios from "./api";

export const signinApi = (body: { email: string; password: string }) =>
  axios.post("/auth/signin", body).then((res) => res.data);

export const signupApi = (body: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) => axios.post("/auth/signup", body).then((res) => res.data);

export const recoveryPassword = (body: { email: string }) =>
  axios.post("/auth/signup", body).then((res) => res.data);
