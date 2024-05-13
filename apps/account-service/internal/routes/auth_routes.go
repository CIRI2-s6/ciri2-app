// Package routes holds the routes for the application
package routes

import (
	"github.com/gin-gonic/gin"
)

func AuthRoutes(authGroup *gin.Engine) {
	authGroup.DELETE("/account/:id")
}
