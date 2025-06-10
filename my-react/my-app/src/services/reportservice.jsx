// services/reportservice.js

import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/reports';

export const getReports = () => axios.get(API_BASE);
export const createReport = (data) => axios.post(API_BASE, data);
export const deleteReport = (id) => axios.delete(`${API_BASE}/${id}`);

// New API call to fetch users
export const getUsers = () => axios.get('http://localhost:8080/api/users');
