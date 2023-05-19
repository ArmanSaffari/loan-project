import { APIClient } from "api/config";

const endpoint = "guarantor";

export const addGuarantor = async (body) => {
  console.log(body)
  return await APIClient.post(`${endpoint}/addGuarantor`, body)
};

export const guarantorListByLoanId = async (params) => {
  return await APIClient.get(`${endpoint}/list`, params)
};

// all requests to current user for being a guarantor
export const getGuarantorRequest = async (params) => {
  return await APIClient.get(`${endpoint}/guarantorRequest`, params)
};

export const confirmGuarantorship = async (body) => {
  return await APIClient.put(`${endpoint}/guarantorConfirmation`, body)
}

export const deleteGuarantor = async (body) => {
  return await APIClient.delete(`${endpoint}`, body)
}