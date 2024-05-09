// Package services is the business layer between the controllers and the repositories, and it contains the business logic for the application
package services

import "ciri2-game-microservice/internal/repositories"

type GameService struct{}

var gameRepository repositories.GameRepository

// GetGame gets a component by id
func (c GameService) GetGameById(id string) (interface{}, error) {

	result, err := gameRepository.FindOne(id)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (c GameService) GetGameByName(name string) (interface{}, error) {
	result, err := gameRepository.FindByName(name)
	if err != nil {
		return nil, err
	}
	return result, nil
}
