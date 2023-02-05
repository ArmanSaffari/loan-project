import { APIClient } from "./config";

const endpoint = "file";

export const getUserPhoto = async (params) => {
  return await APIClient.get(`${endpoint}`, params)
}