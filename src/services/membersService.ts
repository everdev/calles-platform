import axios from 'axios';
const BASE_URL = import.meta.env.VITE_APP_API_URL;

export const fetchMembers = async () => {
  const response = await axios.get(`${BASE_URL}/members`);
  return response.data;
};

export const fetchMemberById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/members/${id}`);
  return response.data;
};

export const createMember = async (memberData: object) => {
  const response = await axios.post(`${BASE_URL}/members`, memberData);
  return response.data;
};

export const updateMember = async (id: string, memberData: object) => {
  const response = await axios.put(`${BASE_URL}/members/${id}`, memberData);
  return response.data;
};

export const deleteMember = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/members/${id}`);
  return response.data;
};