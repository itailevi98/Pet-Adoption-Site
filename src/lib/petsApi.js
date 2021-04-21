import axios from "axios";

const BaseUrl = 'http://localhost:5050';

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
