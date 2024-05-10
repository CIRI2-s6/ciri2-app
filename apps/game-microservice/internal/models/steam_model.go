// Package models holds the data models for the application
package models

type Steam_Detail struct {
	SteamAppId   int      `json:"steam_appid"`
	Name         string   `json:"name"`
	AboutTheGame string   `json:"about_the_game"`
	HeaderImage  string   `json:"header_image"`
	Developers   []string `json:"developers"`
	Publishers   []string `json:"publishers"`
}

type SteamResponse struct {
	Success bool         `json:"success"`
	Data    Steam_Detail `json:"data"`
}

type SteamDetails map[string]SteamResponse

type SteamAll struct {
	AppList AppList `json:"applist"`
}

type AppList struct {
	Apps []App `json:"apps"`
}

type App struct {
	Appid int    `json:"appid"`
	Name  string `json:"name"`
}
