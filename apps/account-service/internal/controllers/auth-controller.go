// Package controllers is the entry point for the application
package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

// set the struct for the controller
type AuthController struct{}

var validate = validator.New()

func DeleteUser(c *gin.Context) {
	id := c.Param("id")
	if err := validate.Var(id, "required,numeric"); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "User deleted successfully"})

}
