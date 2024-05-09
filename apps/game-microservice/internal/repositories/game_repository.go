// Package repositories holds the database operations for the application
package repositories

import (
	"ciri2-game-microservice/configs"
	"ciri2-game-microservice/internal/models"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
)

type GameRepository struct{}

var redisClient = configs.ConnectRedis()
var totalGames []models.GameShell

func init() {
	val, err := http.Get("https://api.steampowered.com/ISteamApps/GetAppList/v2/")
	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	defer val.Body.Close()

	body, err := io.ReadAll(val.Body)
	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	var steamList models.SteamAll
	steamErr := json.Unmarshal(body, &steamList)

	if steamErr != nil {
		fmt.Println(steamErr)
		panic(steamErr)
	}

	for _, game := range steamList.AppList.Apps {
		totalGames = append(totalGames, models.GameShell{SteamAppId: game.Appid, Name: game.Name})
	}

}

func (c GameRepository) FindByName(name string) ([]models.GameShell, error) {
	var games []models.GameShell

	for _, game := range totalGames {
		if strings.Contains(strings.ToLower(game.Name), strings.ToLower(name)) {
			games = append(games, game)
		}
	}

	// Limit the number of games to 10
	if len(games) > 10 {
		games = games[:10]
	}

	return games, nil
}

// FindOne finds a component by id
func (c GameRepository) FindOne(id string) (interface{}, error) {
	var game models.Game

	val, err := redisClient.Get(id).Result()

	if err != nil {
		resp, err := http.Get("https://store.steampowered.com/api/appdetails?appids=" + id)
		if err != nil {
			return nil, err
		}
		defer resp.Body.Close()

		body, err := io.ReadAll(resp.Body)
		if err != nil {
			return nil, err
		}
		println(body)

		var steamDetails models.SteamDetails
		steamErr := json.Unmarshal(body, &steamDetails)

		if steamErr != nil {
			return nil, steamErr
		}

		var steamResponse = models.Game(steamDetails[id].Data)

		game = steamResponse
		fmt.Println(game)
		gameBytes, err := json.Marshal(game)
		if err != nil {
			return nil, err
		}

		redisResponse := redisClient.Set(id, gameBytes, 0)

		if redisResponse.Err() != nil {
			return nil, redisResponse.Err()
		}

		println("returning")
		fmt.Println(game)
		return game, nil

	}

	err = json.Unmarshal([]byte(val), &game)

	return game, err
}
