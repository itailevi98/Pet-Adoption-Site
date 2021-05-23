import axios from "axios";
import { config } from "../configs/constants";


const BaseUrl = config.API_URL;

function getAuthConfig(token) {
    return {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    };
}

export async function createUser(newUser) {
    const response = await axios.post(`${BaseUrl}/signup`, newUser);
    return response.data.user;
}

export async function userLogin(email, password) {
    const response = await axios.post(`${BaseUrl}/login`, { email, password });
    return response.data.token;
}

export async function getUserById(token) {
    const response = await axios.get(`${BaseUrl}/user/${token}`, getAuthConfig(token));
    return response.data.user;
}

export async function updateUser(user, token) {
    const response = await axios.put(
        `${BaseUrl}/user/${token}`, 
        user,
        getAuthConfig(token)
    );
    return response.data.user;
}

export async function getUsers() {
    const response = await axios.get(`${BaseUrl}/user`);
    return response.data.users;
}

export async function getFullUserById(id) {
    const response = await axios.get(`${BaseUrl}/user/${id}/full`);
    return response.data;
}

export async function changeUserRole(userId, newRole) {
    const response = await axios.put(`${BaseUrl}/user/${userId}/role`, {newRole: newRole });
    return response.data;
}
