import axios from "axios";

const develop = process.env.REACT_APP_DEVELOP_API;
const production = process.env.REACT_APP_PRODUCTION_API;
const baseURL = process.env.NODE_ENV === "development" ? develop : production;

export const API = axios.create({ baseURL });
