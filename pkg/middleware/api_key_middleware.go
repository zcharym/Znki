package middleware

import (
	"github.com/gin-gonic/gin"
)

func APIKeyMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// TODO add secret sign
		// if c.GetHeader("x-api-key") != os.Getenv("X_API_KEY"){
		//     c.AbortWithStatus(http.StatusUnauthorized)
		// }
		c.Next()
	}
}
