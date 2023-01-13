import { APIClient } from "api/config";

const endpoint = "memFee";

export const setMemFee = async (body) => {
  return await APIClient.post(`${endpoint}`, body);
};

export const getMemFee = async (body) => {
  return await APIClient.get(`${endpoint}`, body);
};

export const getMemFeeList = async (body) => {
  return await APIClient.get(`${endpoint}/list`, body);
};

export const deleteMemFee = async (body) => {
  console.log(body)
  return await APIClient.delete(`${endpoint}`, body);
};