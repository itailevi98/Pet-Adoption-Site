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

export async function getUserById(id) {
    const response = await axios.get(`${BaseUrl}/user/${id}`, getAuthConfig(id));
    return response.data.user;
}

export async function updateUser(user, token) {
    const response = await axios.put(
        `${BaseUrl}/user/${user.id}`, 
        user,
        getAuthConfig(token)
    );
    return response.data.user;
}
