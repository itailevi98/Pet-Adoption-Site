import axios from "axios";

const BaseUrl = 'http://localhost:5050';

export async function createUser(newUser) {
    const response = await axios.post(`${BaseUrl}/signup`, newUser);
    return response.data.newUser;
}

// export async function getTodos() {
//   const response = await axios.get(`${BaseUrl}/todos`);
//   return response.data.todos;
// }

// export async function deleteTodo(todoId) {
//   await axios.delete(`${BaseUrl}/todos/${todoId}`);
// }