import axios from "axios";

export const getTodos = (params: any) =>
  axios
    .get("https://jsonplaceholder.typicode.com/users", { params })
    .then((res) => res.data);
