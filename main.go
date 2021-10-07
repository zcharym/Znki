package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/znkisoft/znki/docs"
	_ "github.com/znkisoft/znki/pkg/db"
	"net/http"
)

func main() {
	// Creates default gin router with Logger and Recovery middleware already attached
	router := gin.Default()

	port := "9000"
	// Create API route group
	api := router.Group("/api")
	{
		// Add /hello GET route to router and define route handler function
		api.GET("/hello", func(ctx *gin.Context) {
			ctx.JSON(200, gin.H{"msg": "world"})
		})

		api.POST("/hello", HelloPost)
	}

	// NotFound router
	router.NoRoute(func(ctx *gin.Context) { ctx.JSON(http.StatusNotFound, gin.H{"msg": "Not Found"}) })
	// Swagger router
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	// Swagger configuration
	docs.SwaggerInfo.BasePath = "/api"
	// Start listening and serving requests
	router.Run(":" + port)

	fmt.Printf("server is running on port %s", port)
}

// HelloPost godoc
// @Description api-test
// @Param   username     path    string     true        "username"
// @Summary ping example
// @Description do ping
// @Tags example
// @Accept json
// @Produce json
// @Success 200 {string} Helloworld
// @Router /hello [post]
func HelloPost(c *gin.Context) {
	username := c.Param("username")
	c.String(http.StatusOK, fmt.Sprintf("Hello %s", username))
}
