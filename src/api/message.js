import { APIClient } from "./config";

const endpoint = "message";

export const getUnreadMessageCount = async () => {
  return await APIClient.get(`${endpoint}/unread`)
}

export const getMyMessages = async (params) => {
  return await APIClient.get(`${endpoint}`, params)
}

export const readMessage = async (body) => {
  return await APIClient.put(`${endpoint}`, body)
}
