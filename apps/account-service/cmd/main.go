package main

import (
	"ciri2/account-service/configs"
	"ciri2/account-service/internal/routes"

	"github.com/gin-contrib/gzip"
	"github.com/gin-gonic/gin"
)

// @title PC Microservice documentation
// @version 0.0.5
func main() {
	router := gin.Default()
	router.Use(gzip.Gzip(gzip.DefaultCompression))

	routes.AuthRoutes(router)

	router.Run("0.0.0.0:" + configs.EnvPort())
}
