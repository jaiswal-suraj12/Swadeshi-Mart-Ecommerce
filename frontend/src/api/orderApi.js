import axios from "axios";
const BASE_URL = "http://localhost:3200/api";

export const createOrder = async (order) => {
  const { data } = await axios.post(`${BASE_URL}/orders`, order);
  return data;
};

export const updateShipping = async (orderId, shippingData) => {
  const { data } = await axios.put(`${BASE_URL}/orders/${orderId}/shipping`, shippingData);
  return data;
};

export const getOrderById = async (orderId) => {
  const { data } = await axios.get(`${BASE_URL}/orders/${orderId}`);
  return data;
};