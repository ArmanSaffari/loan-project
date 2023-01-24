import { APIClient } from "api/config";

const endpoint = "guarantor";

export const addGuarantor = async (body) => {
  console.log(body)
  return await APIClient.post(`${endpoint}/addGuarantor`, body)
};

export const guarantorListByLoanId = async (params) => {
  return await APIClient.get(`${endpoint}/list`, params)
};

export const getGuarantorRequest = async (params) => {
  return await APIClient.get(`${endpoint}/guarantorRequest`, params)
};