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

export async function getPetsByUser(token) {
    const response = await axios.get(`${BaseUrl}/pet/user/${token}`, getAuthConfig(token));
    return response.data.pets;
}
