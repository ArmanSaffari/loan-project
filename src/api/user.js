import { APIClient } from "api/config";

const endpoint = "user";

export const login = async (body) => {
  return await APIClient.post(`${endpoint}/signin`, body);
};

export const register = async (body) => {
  return await APIClient.post(`${endpoint}/register`, body);
};

export const getMySummary = async (params) => {
  return await APIClient.get(`${endpoint}/summary`, params);
};

export const getMyInfo = async () => {
  return await APIClient.get(`${endpoint}/info`);
};

export const changeMyInfo = async (body) => {
  return await APIClient.put(`${endpoint}/info`, body);
};