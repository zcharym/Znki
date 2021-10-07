package utils

// Response response coming from Duo API.
type Response struct {
	Data    string `json:"data"`
	Code    int    `json:"code"`
	Message string `json:"message"`
}
