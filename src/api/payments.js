import { APIClient } from "api/config";

const endpoint = "payment";

export const addPayment = async (body) => {
  return await APIClient.post(`${endpoint}/add`, body);
};

export const getMyPayments = async (body) => {
  return await APIClient.get(`${endpoint}/myPayments`, body);
};