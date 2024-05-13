// Package configs holds all the logic that is necessary to configure the application
package configs

import (
	"os"

	"github.com/joho/godotenv"
)

// EnvMongoURI returns the MongoDB URI from the environment variables
func EnvRedisUri() string {
	println("REDISURI: ", os.Getenv("REDISURI"))
	envFile, err := godotenv.Read(".env")
	if envFile != nil && err == nil {
		println("REDISURI: ", envFile["REDISURI"])
		return envFile["REDISURI"]
	}

	return os.Getenv("REDISURI")
}

// EnvPort returns the port from the environment variables
func EnvPort() string {
	envFile, err := godotenv.Read(".env")
	if envFile != nil && err == nil {
		return envFile["ACCOUNT_PORT"]
	}

	return os.Getenv("ACCOUNT_PORT")
}

func KafkaURI() string {
	envFile, err := godotenv.Read(".env")
	if envFile != nil && err == nil {
		return envFile["KAFKA_URI"]
	}

	return os.Getenv("KAFKA_URI")
}
