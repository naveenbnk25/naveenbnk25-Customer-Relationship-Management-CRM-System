import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/opportunities';

export const getAllOpportunities = () => axios.get(BASE_URL);
export const addOpportunity = (opportunity) => axios.post(BASE_URL, opportunity);
export const deleteOpportunity = (id) => axios.delete(`${BASE_URL}/${id}`);
