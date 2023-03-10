import { APIClient } from "./config";

const endpoint = "file";

export const getUserPhoto = async (params) => {
  return await APIClient.get(`${endpoint}`, params)
};

export const uploadFile = async (formData) => {
  return await APIClient.post(`${endpoint}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};