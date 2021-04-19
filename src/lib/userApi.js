import axios from "axios";

const BaseUrl = 'http://localhost:5050';

export async function createUser(newUser) {
    const response = await axios.post(`${BaseUrl}/signup`, newUser);
    return response.data.user;
}

export async function verifyUserLogin(user) {
    const response = await axios.post(`${BaseUrl}/login`, user);
    return response.data.token;
}

export async function getUserById(id) {
    const response = await axios.get(`${BaseUrl}/user/${id}`);
    return response.data.user;
}

export async function updateUser(user) {
    const response = await axios.put(`${BaseUrl}/user/${user.id}`, user);
    return response.data.user;
}
