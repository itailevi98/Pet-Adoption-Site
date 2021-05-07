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

export async function searchPets(query) {
    const response = await axios.get(`${BaseUrl}/pet`, { 
        params: query
    });
    return response.data.results;
}

export async function getPetById(id) {
    const response = await axios.get(`${BaseUrl}/pet/${id}`);
    return response.data.pet;
}

export async function savePet(petId, token) {
    const response = await axios.post(`${BaseUrl}/pet/${petId}/save`, token, getAuthConfig(token));
    return response.data;
}

export async function deleteSavedPet(petId, token) {
    const response = await axios.delete(`${BaseUrl}/pet/${petId}/save`, getAuthConfig(token));
    return response.data;
}

export async function adoptPet(petId, statusType, token) {
    const response = await axios.post(`${BaseUrl}/pet/${petId}/adopt`, { statusType: statusType }, getAuthConfig(token));
    return response.data;
}

export async function returnPet(petId, token) {
    const response = await axios.post(`${BaseUrl}/pet/${petId}/return`, token, getAuthConfig(token));
    return response.data;
}

export async function addPet(formData, token) {
    const response = await axios.post(`${BaseUrl}/pet`, formData, getAuthConfig(token));
    return response.data.pet;
}

export async function editPet(formData, petId) {
    const response = await axios.put(`${BaseUrl}/pet/${petId}`, formData);
    return response.data;
}

