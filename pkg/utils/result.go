package utils

import (
	"encoding/json"
)

// Response response coming from Duo API.
type Response struct {
	Data    interface{} `json:"data"`
	Code    int         `json:"code"`
	Message string      `json:"message"`
}

const (
	SuccessCode       = 200
	GeneralFailedCode = 1000
)

func OkResponse(data interface{}) map[string]interface{} {
	var r Response
	r.Code = SuccessCode
	r.Message = "success"
	r.Data = data
	return toMap(r)
}

func ErrorResponse(message string, code int) map[string]interface{} {
	var r Response
	r.Code = GeneralFailedCode
	r.Message = message
	if code > 0 {
		r.Code = code
	}
	return toMap(r)
}

func toMap(r Response) map[string]interface{} {
	result := &map[string]interface{}{}
	marshaled, err := json.Marshal(r)

	err = json.Unmarshal(marshaled, result)

	if err != nil {
		return map[string]interface{}{
			"code":    1000,
			"message": "unsupported struct format to parse",
			"data":    nil,
		}
	}
	return *result
}
