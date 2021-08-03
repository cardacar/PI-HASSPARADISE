import axios from "axios";
import * as urlAPI from "./URL";

const baseUrl = urlAPI.baseUrl;

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export const getInventoryAllAxios = async () => {
  const logInToken = window.localStorage.getItem("logInUser");
  setToken(logInToken);
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.get(`${baseUrl}inventory`, config);
  return response.data;
};

export const postInventoryAxios = async (data) => {
  const logInToken = window.localStorage.getItem("logInUser");
  setToken(logInToken);
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.post(`${baseUrl}inventory`, data, config);
  return response;
};

export const putInventoryAxios = async (data, id) => {
  const logInToken = window.localStorage.getItem("logInUser");
  setToken(logInToken);
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.put(`${baseUrl}inventory/${id}`, data, config);
  return response;
};

export const deleteInventoryAxios = async (id) => {
  const logInToken = window.localStorage.getItem("logInUser");
  setToken(logInToken);
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.delete(`${baseUrl}inventory/${id}`, config);
  return response;
};
