import { APIClient } from "api/config";

const endpoint = "loan";

export const getEligibility = async () => {
  return await APIClient.get(`${endpoint}/eligibility`)
};
