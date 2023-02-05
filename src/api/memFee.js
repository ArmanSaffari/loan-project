import { APIClient } from "api/config";

const endpoint = "memFee";

export const setMemFee = async (body) => {
  return await APIClient.post(`${endpoint}`, body);
};

export const getMemFee = async () => {
  return await APIClient.get(`${endpoint}`);
};

export const getMemFeeList = async (params) => {
  return await APIClient.get(`${endpoint}/list`, params);
};

export const deleteMemFee = async (body) => {
  console.log(body)
  return await APIClient.delete(`${endpoint}`, body);
};

export const getPaidMemFee = async (params) => {
  return await APIClient.get(`${endpoint}/myPaidMemFee`, params);
};