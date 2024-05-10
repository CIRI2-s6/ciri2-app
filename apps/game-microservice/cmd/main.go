package main

import (
	"ciri2-game-microservice/configs"
	"ciri2-game-microservice/internal/routes"

	"github.com/gin-contrib/gzip"
	"github.com/gin-gonic/gin"
)

// @title PC Microservice documentation
// @version 0.0.5
func main() {
	router := gin.Default()
	router.Use(gzip.Gzip(gzip.DefaultCompression))

	routes.GameRoutes(router)

	router.Run("0.0.0.0:" + configs.EnvPort())
}
