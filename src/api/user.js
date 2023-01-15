import { APIClient } from "api/config";

const endpoint = "user";

export const login = async (body) => {
  return await APIClient.post(`${endpoint}/signin`, body);
};

export const register = (body) => {
  return APIClient.post(`${endpoint}/register`, body);
};

export const getMySummary = (body) => {
  return APIClient.get(`${endpoint}/summary`, body);
};