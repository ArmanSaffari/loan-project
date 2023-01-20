import { APIClient } from "api/config";

const endpoint = "loan";

export const getEligibility = async () => {
  return await APIClient.get(`${endpoint}/eligibility`)
};

export const requestLoan = async (body) => {
  return await APIClient.post(`${endpoint}/request`, body)
}