package controllers

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"strconv"
	"v0/database"
	"v0/entity"

	"github.com/gorilla/mux"
)

func GetAllTodo(w http.ResponseWriter, r *http.Request) {
	var todos []entity.Todo
	database.Connector.Find(&todos)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(todos)
}

func GetTodoByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	key := vars["id"]

	var todo entity.Todo
	database.Connector.First(&todo, key)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(todo)
}

func CreateTodo(w http.ResponseWriter, r *http.Request) {
	requestBody, _ := ioutil.ReadAll(r.Body)
	var todo entity.Todo
	json.Unmarshal(requestBody, &todo)
	database.Connector.Create(&todo)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(todo)
}

func UpdateTodoByID(w http.ResponseWriter, r *http.Request) {
	requestBody, _ := ioutil.ReadAll(r.Body)
	var todo entity.Todo
	json.Unmarshal(requestBody, &todo)
	database.Connector.Save(&todo)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(todo)
}

func DeleteTodoByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	key := vars["id"]

	id, _ := strconv.ParseInt(key, 10, 64)
	database.Connector.Delete(&entity.Todo{}, id)
	w.WriteHeader(http.StatusNoContent)
}
