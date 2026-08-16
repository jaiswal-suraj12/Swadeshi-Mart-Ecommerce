import axios from "axios";

const URL = "http://localhost:3200/api/address"; // your backend URL

// Add new address
export const addAddress = async (data, token) => {
  const res = await axios.post(`${URL}/add`, data, {
    headers: { Auth: token },
  });
  return res.data;
};

// Get all addresses for logged-in user
export const getAddresses = async (token) => {
  const res = await axios.get(`${URL}/get`, {
    headers: { Auth: token },
  });
  return res.data.userAddress;
};