package configs

import "github.com/go-redis/redis"

func ConnectRedis() *redis.Client {
	rcd := redis.NewClient(&redis.Options{
		Addr:     EnvRedisUri(),
		Password: "",
		DB:       0,
	})

	_, err := rcd.Ping().Result()

	if err != nil {
		println("Error connecting to Redis" + err.Error())
		panic(err)
	}

	return rcd
}
