import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://192.168.29.51:8800/api",
});
