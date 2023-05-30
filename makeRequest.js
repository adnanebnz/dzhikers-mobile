import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://dzhikers-web-production.up.railway.app/api",
});
