// src/api.js

import axios from 'axios';

const API_URL = 'http://localhost:3000'; 

axios.defaults.headers.common['Content-Type'] = 'application/json';


export const getUsers = async () => {
    const response = await axios.get(`${API_URL}/get_all_users`);
    return response.data;
};

export const insertUser = async (user) => {
    //user.id = "todo: make this id not necessary";
    const response = await axios.post(`${API_URL}/insert_user`, user);
    return response.data;
};

export const updateUser = async (user) => {
    const response = await axios.put(`${API_URL}/update_user`, user);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await axios.delete(`${API_URL}/delete_user/${id}`);
    return response.data;
};

export const getUserById = async (id) => {
    const response = await axios.get(`${API_URL}/user/${id}`);
    return response.data;
};