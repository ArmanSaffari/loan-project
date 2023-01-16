import { APIClient } from "api/config";

const endpoint = "account";

export const getAccountList = async (body) => {
  return await APIClient.get(`${endpoint}`, body)
};