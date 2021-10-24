package main

import (
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {

	port := "8080"
	if fromEnv := os.Getenv("PORT"); fromEnv != "" {
		port = fromEnv
	}
	log.Printf("Starting up on http://localhost:%s", port)
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Get("/auth/{username}", Authorize)
	r.Get("/verify", Verify)
	r.Get("/README.txt", Readme)
	r.Get("/stats", Stats)
	http.ListenAndServe(":"+port, r)
}
