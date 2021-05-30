import axios from "axios";
import { config } from "../configs/constants";

const BaseUrl = config.API_URL;

export async function postComment(newComment) {
    const response = await axios.post(`${BaseUrl}/comment`, newComment);
    return response.data.status;
}

export async function getComments() {
    const response = await axios.get(`${BaseUrl}/comment`);
    return response.data.comments;
}
