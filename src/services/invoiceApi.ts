import axios from "./api";

export const getInvoices = (params: any) =>
  axios.get("/invoice", { params }).then((res) => res.data);

export const getInvoice = (_id: string | undefined) =>
  axios.get(`/invoice/${_id}`).then((res) => res.data);

export const createInvoice = (body: any) =>
  axios.post("/invoice", body).then((res) => res.data);

export const updateInvoice = (_id: string | undefined, body: any) =>
  axios.put(`/invoice/${_id}`, body).then((res) => res.data);

export const toggleInvoice = (_id: string) =>
  axios.put(`/invoice/toggle/${_id}`).then((res) => res.data);

export const deleteInvoice = (_id: string) =>
  axios.delete(`/invoice/${_id}`).then((res) => res.data);
