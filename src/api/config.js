import axios from "axios";

const development = process.env.REACT_APP_DEVELOPMENT_API;
const production = process.env.REACT_APP_PRODUCTION_API;
const baseURL =
  process.env.NODE_ENV === "development" ? development : production;

export const APIClient = axios.create({
  baseURL: `${baseURL}/api/`,
  headers: { "Content-Type": "application/json;charset=UTF-8" },
});

APIClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers = { ...config.headers, token };
  return config;
});
