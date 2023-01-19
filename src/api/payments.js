import { APIClient } from "api/config";

const endpoint = "payment";

export const addPayment = async (body) => {
  return await APIClient.post(`${endpoint}/add`, body);
};

export const getMyPayments = async (body) => {
  return await APIClient.get(`${endpoint}/myPayments`, body);
};

export const getPayments = async (params) => {
  return await APIClient.get(`${endpoint}/myPayments`, params)
};

export const deletePayment = async (body) => {
  return await APIClient.delete(`${endpoint}`, body)
};