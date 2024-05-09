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

	"github.com/go-redis/redis"
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

	val, err := redisClient.ZRangeByScore("games", redis.ZRangeBy{Min: id, Max: id}).Result()

	if len(val) == 0 || err != nil {
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

		redisResponse := redisClient.ZAdd("games", redis.Z{Score: float64(game.SteamAppId), Member: gameBytes})

		if redisResponse.Err() != nil {
			return nil, redisResponse.Err()
		}

		println("returning")
		fmt.Println(game)
		return game, nil

	}

	err = json.Unmarshal([]byte(val[0]), &game)

	return game, err
}

func (c GameRepository) FindPaginated(page int, limit int) ([]models.Game, error) {
	var games []models.Game
	if page < 1 {
		page = 1
	}

	if limit < 1 {
		limit = 10
	}

	start := (page - 1) * limit
	end := start + limit

	if end > len(totalGames) {
		end = len(totalGames)
	}

	val, err := redisClient.ZRange("games", int64(start), int64(end)).Result()

	if err != nil {
		return nil, err
	}

	println(start, end)

	for _, game := range val {
		var gameObj models.Game
		err := json.Unmarshal([]byte(game), &gameObj)
		if err != nil {
			return nil, err
		}
		games = append(games, gameObj)
	}

	return games, nil
}
