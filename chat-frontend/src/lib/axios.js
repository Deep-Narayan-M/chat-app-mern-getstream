import axios from "axios";

const BASE_URL = import.meta.env.MODE === "production" ? "/api" : "http://localhost:5000/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
