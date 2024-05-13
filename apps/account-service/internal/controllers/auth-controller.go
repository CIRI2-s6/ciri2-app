// Package controllers is the entry point for the application
package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

// set the struct for the controller
type AuthController struct{}

var validate = validator.New()

func (c AuthController) GetGameById() gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")

		c.JSON(http.StatusOK, gin.H{"status": "success", "deleted": id})

	}
}
