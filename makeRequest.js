import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://192.168.72.51:8800/api",
});
