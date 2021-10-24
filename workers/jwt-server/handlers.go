package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/go-chi/chi/v5"
)

type Claims struct {
	Sub string
	jwt.StandardClaims
}

func Authorize(w http.ResponseWriter, s *http.Request) {
	// Getting the username from the URL
	ctx := context.WithValue(s.Context(), "username", chi.URLParam(s, "username"))
	r := s.WithContext(ctx)
	id := r.Context().Value("username").(string)

	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		Sub: id,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}
	signBytes, _ := ioutil.ReadFile("./private.key")
	jwtKey, _ := jwt.ParseRSAPrivateKeyFromPEM(signBytes)

	token := jwt.NewWithClaims(jwt.SigningMethodRS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	fmt.Println(`username := `, id)
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Path:    "/",
		Expires: expirationTime,
	})
	w.Header().Set("Content-Type", "text/plain")
	w.Write([]byte(tokenString))
}

func Verify(w http.ResponseWriter, r *http.Request) {
	c, err := r.Cookie("token")
	if err != nil {
		if err == http.ErrNoCookie {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	signBytes, _ := ioutil.ReadFile("./public.key.pub")
	jwtKey, _ := jwt.ParseRSAPublicKeyFromPEM(signBytes)

	tknStr := c.Value
	claims := &Claims{}
	tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil {
		log.Println("Unable to verify", err)
	}
	if err != nil {
		log.Println("Unable to verify", err)
		if err == jwt.ErrSignatureInvalid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if !tkn.Valid {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	w.Header().Set("Content-Type", "text/plain")
	w.Write([]byte(claims.Sub))
}

func Readme(w http.ResponseWriter, r *http.Request) {
	b, err := ioutil.ReadFile("README.txt") // just pass the file name
	if err != nil {
		fmt.Print(err)
	}

	w.Header().Set("Content-Type", "text/html")
	w.Write([]byte(b))
}

func Stats(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	w.Write([]byte("No Stats available"))

}
