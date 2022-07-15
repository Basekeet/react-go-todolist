import axios from 'axios';

const apiUrl = "http://localhost:8090/"

export function getTodosAPI() {
    return axios.get(apiUrl + "get");
}

export function getTodoAPI(id) {
    return axios.get(apiUrl + "get/" + String(id))
}

export function createTodoAPI(todo) {
    return axios.post(apiUrl + "create", JSON.stringify(todo))
}

export function updateTodoAPI(todo) {
    return axios.put(apiUrl + "update/" + String(todo.ID), JSON.stringify(todo))
}

export function deleteTodoAPI(id) {
    return axios.delete(apiUrl + "delete/" + String(id))
}