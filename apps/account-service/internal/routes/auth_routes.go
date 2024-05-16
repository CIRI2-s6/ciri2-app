// Package routes holds the routes for the application
package routes

import (
	"ciri2/account-service/internal/controllers"

	"github.com/gin-gonic/gin"
)

func AuthRoutes(authGroup *gin.Engine) {
	auth := new(controllers.AuthController)
	authGroup.DELETE("/account/:id", auth.GetGameById())
}
