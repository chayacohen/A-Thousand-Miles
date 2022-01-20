import axios from "axios";

export const getUser = (id) => {
    return axios.put(`/api/users/${id}`);
};

export const editUser = (id, data) => {
    return axios.put(`/api/users/${id}`, data);
};