import axios from "axios";

export const editUser = (id, data) => {
    return axios.put(`/api/users/${id}`, data);
};