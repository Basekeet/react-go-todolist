package main

import (
	"log"
	"net/http"
	"v0/controllers"
	"v0/database"
	"v0/entity"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func main() {
	initDB()
	log.Println("Starting the HTTP server on port 8090")

	router := mux.NewRouter().StrictSlash(true)

	initialiseRouter(router)

	credentials := handlers.AllowCredentials()
	// headersOk := handlers.AllowedHeaders([]string{"X-Requested-With"})
	origins := handlers.AllowedOrigins([]string{"http://localhost:3000"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS", "DELETE"})
	log.Fatal(http.ListenAndServe(":8090", handlers.CORS(credentials, methodsOk, origins)(router)))
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)
		next.ServeHTTP(w, r)
	})
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func initialiseRouter(router *mux.Router) {
	router.HandleFunc("/create", controllers.CreateTodo).Methods("POST")
	router.HandleFunc("/get", controllers.GetAllTodo).Methods("GET")
	router.HandleFunc("/get/{id}", controllers.GetTodoByID).Methods("GET")
	router.HandleFunc("/update/{id}", controllers.UpdateTodoByID).Methods("PUT")
	router.HandleFunc("/delete/{id}", controllers.DeleteTodoByID).Methods("DELETE")
	// router.Use(corsMiddleware)
}

func initDB() {
	config :=
		database.Config{
			ServerName: "localhost:3306",
			User:       "root",
			Password:   "root",
			DB:         "todolist_demo",
		}

	connectionString := database.GetConnectionString(config)
	err := database.Connect(connectionString)
	if err != nil {
		panic(err.Error())
	}
	database.Migrate(&entity.Todo{})
}
