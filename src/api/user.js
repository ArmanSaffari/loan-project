import { APIClient } from "api/config";

const endpoint = "user";

export const login = async (body) => {
  return await APIClient.post(`${endpoint}/signin`, body);
};

export const register = async (formData) => {
  return await APIClient.post(`${endpoint}/registerWithPhoto`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const getMySummary = async () => {
  return await APIClient.get(`${endpoint}/summary`, );
};

export const getMyInfo = async () => {
  return await APIClient.get(`${endpoint}/info`);
};

export const changeMyInfo = async (body) => {
  return await APIClient.put(`${endpoint}/info`, body);
};

export const tokenCheck = async () => {
  return await APIClient.get(`${endpoint}/tokenCheck`);
};

