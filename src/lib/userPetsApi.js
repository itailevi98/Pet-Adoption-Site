import axios from "axios";

const BaseUrl = 'http://localhost:5050';

function getAuthConfig(token) {
    return {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    };
}

export async function getPetsByUser(token) {
    const response = await axios.get(`${BaseUrl}/pet/user/${token}`, getAuthConfig(token));
    return response.data.pets;
}

