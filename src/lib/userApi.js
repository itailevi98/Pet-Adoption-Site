import axios from "axios";

const BaseUrl = 'http://localhost:5050';

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
