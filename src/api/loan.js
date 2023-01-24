import { IndeterminateCheckBox } from "@mui/icons-material";
import { APIClient } from "api/config";

const endpoint = "loan";

export const getEligibility = async () => {
  return await APIClient.get(`${endpoint}/eligibility`)
};

export const requestLoan = async (body) => {
  return await APIClient.post(`${endpoint}/request`, body)
};

export const getLoans = async (params) => {
  return await APIClient.get(`${endpoint}/myLoans`, params)
};

export const deleteLoanRequest = async (body) => {
  return await APIClient.delete(`${endpoint}/myLoans`, body)
};