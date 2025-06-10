import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/sales';

// SALES
export const getAllSales = () => axios.get(`${API_BASE_URL}`);
export const createSale = (saleData) => axios.post(`${API_BASE_URL}/add`, saleData);
export const deleteSale = (id) => axios.delete(`${API_BASE_URL}/delete/${id}`);

// OTHER (leave these as-is for now)
export const fetchOpportunities = () => axios.get(`${API_BASE_URL}/opportunities`);
export const getSalesForecast = () => axios.get(`${API_BASE_URL}/forecast`);
export const deleteOpportunity = (id) => axios.delete(`${API_BASE_URL}/opportunities/${id}`);
