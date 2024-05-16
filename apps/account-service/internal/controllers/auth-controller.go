// Package controllers is the entry point for the application
package controllers

import (
	"ciri2/account-service/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

// set the struct for the controller
type AuthController struct{}

var service = services.AuthService{}

func (c AuthController) GetGameById() gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")

		service.DeleteAccount(id)
		c.JSON(http.StatusOK, gin.H{"status": "success", "deleted": id})

	}
}
