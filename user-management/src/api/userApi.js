import axios from 'axios';


const BASE_URL = 'http://localhost:5000';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getUsers = async() => {
    const response = await api.get('/users');
    return response.data;
};

export const createUser = async(userData) => {
    const response = await api.post('/users', userData);
    return response.data;
};

export const getUser = async(userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
};

export const updateUser = async(userId, userData) => {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
};

export const deleteUser = async(userId) => {
    await api.delete(`/users/${userId}`);
};