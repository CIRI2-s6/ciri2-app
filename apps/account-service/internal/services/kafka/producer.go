package kafka

import (
	"ciri2/account-service/configs"
	"fmt"

	"github.com/IBM/sarama"
)

func ProduceMessage(topic string, value string) {
	// Setup producer configuration
	config := sarama.NewConfig()
	config.Producer.RequiredAcks = sarama.WaitForAll
	config.Producer.Retry.Max = 5
	config.Producer.Return.Successes = true

	// The broker adress to connect to.
	var bootstrapServer = configs.KafkaURI()

	// Create a new producer
	producer, err := sarama.NewAsyncProducer([]string{bootstrapServer}, config)
	if err != nil {
		panic(err)
	}
	defer func() {
		if err := producer.Close(); err != nil {
			panic(err)
		}
	}()

	// The topic to which we produce events
	var topicName = topic

	//NOTE: Instead of using string encoder, we would probably use some json serializer here to produce messages in JSON format
	message := &sarama.ProducerMessage{Topic: topicName, Value: sarama.StringEncoder(value)}
	producer.Input() <- message

	select {
	case <-producer.Successes():
		fmt.Println("Message produced")
	case err := <-producer.Errors():
		fmt.Println("Failed to produce message: ", err)
	}
}
