package utils

// Response response coming from Duo API.
type Response struct {
	Response string `json:"response"`
	Code     int    `json:"code"`
	Message  string `json:"message"`
}
