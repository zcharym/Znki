package auth

import (
	"github.com/dgrijalva/jwt-go"
	"time"
)

const (
	JWTSecret = "4G9khQUhPGM3Vz" // AMEND replace with env
)

type CustomClaims struct {
	Payload
	jwt.StandardClaims
}

type Payload struct {
	UserId   string `json:"user_id"`
	Username string `json:"username"`
}

type JWTOutput struct {
	Token   string    `json:"token"`
	Expires time.Time `json:"expires"`
}

func SignJWTToken(p Payload, expires time.Time) (string, error) {
	claims := CustomClaims{
		Payload{
			UserId:   p.UserId,
			Username: p.Username,
		},
		jwt.StandardClaims{
			Issuer:    "ZnkiSoft.com",
			ExpiresAt: expires.Unix(),
			IssuedAt:  time.Now().Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(JWTSecret))
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

func ParseToken(tokenStr string) (claims *CustomClaims, err error) {
	token, err := jwt.ParseWithClaims(tokenStr, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(JWTSecret), nil
	})
	if token.Valid {
		claims = token.Claims.(*CustomClaims)
		return claims, nil
	} else {
		return nil, err
	}
}

func RefreshToken(claims *CustomClaims) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenStr, err := token.SignedString([]byte(JWTSecret))
	return tokenStr, err
}
