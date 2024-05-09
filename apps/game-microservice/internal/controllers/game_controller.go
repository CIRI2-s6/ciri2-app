// Package controllers is the entry point for the application
package controllers

import (
	"ciri2-game-microservice/internal/models"
	"ciri2-game-microservice/internal/services"

	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

// set the struct for the controller
type GameController struct{}

var gameService services.GameService

var validate = validator.New()

func (c GameController) GetGameById() gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		result, err := gameService.GetGameById(id)

		if err != nil {
			c.JSON(http.StatusInternalServerError, models.GameResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		c.JSON(http.StatusOK, models.GameResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{"data": result}})

	}
}

func (c GameController) GetGameByName() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		name := ctx.Param("name")
		result, err := gameService.GetGameByName(name)

		if err != nil {
			ctx.JSON(http.StatusInternalServerError, models.GameResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		ctx.JSON(http.StatusOK, models.GameResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{"data": result}})
	}
}

func (c GameController) GetPaginatedGames() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		page := ctx.Query("page")
		limit := ctx.Query("limit")
		result, err := gameService.GetPaginatedGames(page, limit)

		if err != nil {
			ctx.JSON(http.StatusInternalServerError, models.GameResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		ctx.JSON(http.StatusOK, models.GameResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{"data": result}})
	}
}
