package repositories_test

import (
	"testing"

	"ciri2-pc-microservice/internal/models"
	"ciri2-pc-microservice/internal/repositories"

	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson"
)

func TestComponentRepository_FindPaginated(t *testing.T) {
	// Create a new instance of the component repository
	componentRepo := repositories.ComponentRepository{}
	assert.NotNil(t, componentRepo)

	// Define the pagination parameters
	pagination := models.Pagination{
		Skip:  1,
		Limit: 10,
		Sort:  bson.M{"name": 1},
	}

	// Call the FindPaginated function
	components, totalCount, err := componentRepo.FindPaginated(pagination)

	// Assert that there are no errors
	assert.NoError(t, err)

	// Assert that the components slice is not nil
	assert.NotNil(t, components)

	// Assert that the total count is greater than or equal to zero
	assert.True(t, totalCount >= 0)
}

func TestComponentRepository_FindOne(t *testing.T) {
	// Create a new instance of the component repository
	componentRepo := repositories.ComponentRepository{}

	// Define the ID of the component to find
	id := "661fa817d08671c0c4a4e963"

	// Call the FindOne function
	component, err := componentRepo.FindOne(id)

	// Assert that there are no errors
	assert.NoError(t, err)

	// Assert that the component is not nil
	assert.NotNil(t, component)
}

func TestComponentRepository_CheckAlreadyExistingComponents(t *testing.T) {
	// Create a new instance of the component repository
	componentRepo := repositories.ComponentRepository{}

	// Define the component names to check
	componentNames := []string{"Component1432", "Component2432", "AMD Ryzen 5 5600"}

	// Call the CheckAlreadyExistingComponents function
	existingComponents, err := componentRepo.CheckAlreadyExistingComponents(componentNames)

	// Assert that there are no errors
	assert.NoError(t, err)

	// Assert that the existing components slice is not nil
	assert.NotNil(t, existingComponents)

	assert.Equal(t, len(existingComponents), 1)

	assert.Equal(t, existingComponents[0], "AMD Ryzen 5 5600")
}

func TestComponentRepository_BatchInsert(t *testing.T) {
	// Create a new instance of the component repository
	componentRepo := repositories.ComponentRepository{}

	// Define the components to insert
	components := []interface{}{
		models.Component{Name: "Component1", Type: "CPU", Properties: map[string]interface{}{"cores": 8, "speed": 3.6}},
		models.Component{Name: "Component2", Type: "CPU", Properties: map[string]interface{}{"cores": 8, "speed": 3.6}},
	}

	// Call the BatchInsert function
	result, err := componentRepo.BatchInsert(components)

	// Assert that there are no errors
	assert.NoError(t, err)

	// Assert that the result is not nil
	assert.NotNil(t, result)
}
