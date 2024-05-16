// Package services is the business layer between the controllers and the repositories, and it contains the business logic for the application
package services

import (
	"ciri2/account-service/configs"
	"ciri2/account-service/internal/models"
	"encoding/json"
	"io"
	"net/http"
	"strings"
)

type AuthService struct{}

func (s AuthService) DeleteAccount(accountId string) {

	url := "https://ciri2.eu.auth0.com/oauth/token"

	payload := strings.NewReader("{\"client_id\":\"" + configs.ENVAUTH0CLIENTID() + "\",\"client_secret\":\"" + configs.ENVAUTH0CLIENTSECRET() + "\",\"audience\":\"https://ciri2.eu.auth0.com/api/v2/\",\"grant_type\":\"client_credentials\"}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("content-type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	var jsonBody models.TokenResponse
	json.Unmarshal(body, &jsonBody)

	deleteUrl := "https://ciri2.eu.auth0.com/api/v2/users/" + accountId

	deleteReq, _ := http.NewRequest("DELETE", deleteUrl, nil)

	deleteReq.Header.Add("authorization", "Bearer "+jsonBody.AccessToken)

	deleteRes, _ := http.DefaultClient.Do(deleteReq)

	defer deleteRes.Body.Close()

	println("Account deleted")

	// kafka.ProduceMessage("DELETE_ACCOUNT", accountId)
}
