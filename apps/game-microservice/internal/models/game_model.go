// Package models holds the data models for the application
package models

type Game struct {
	SteamAppId   int      `json:"steam_appid"`
	Name         string   `json:"name"`
	AboutTheGame string   `json:"about_the_game"`
	HeaderImage  string   `json:"header_image"`
	Developers   []string `json:"developers"`
	Publishers   []string `json:"publishers"`
}

type GameResponse struct {
	Status  int                    `json:"status"`
	Message string                 `json:"message"`
	Data    map[string]interface{} `json:"data"`
}

type GameShell struct {
	SteamAppId int    `json:"steam_appid"`
	Name       string `json:"name"`
}
