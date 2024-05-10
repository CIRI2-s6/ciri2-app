// Package routes holds the routes for the application
package routes

import (
	"ciri2-game-microservice/internal/controllers"

	"github.com/gin-gonic/gin"
)

func GameRoutes(gameGroup *gin.Engine) {
	game := new(controllers.GameController)
	gameGroup.GET("/game/:id", game.GetGameById())
	gameGroup.GET("/game/name/:name", game.GetGameByName())
	gameGroup.GET("/games", game.GetPaginatedGames())
}
