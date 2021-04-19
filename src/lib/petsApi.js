import axios from "axios";

const BaseUrl = 'http://localhost:5050';

export async function getPets() {
    const response = await axios.get(`${BaseUrl}/pet`);
    return response.data.pets;
}

export async function getPetById(id) {
    const response = await axios.get(`${BaseUrl}/pet/${id}`);
    return response.data.pet;
}
