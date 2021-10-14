package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/znkisoft/znki/docs"
	"github.com/znkisoft/znki/pkg/db"
	_ "github.com/znkisoft/znki/pkg/db"
	"github.com/znkisoft/znki/pkg/handler"
	"net/http"
)

func init() {
	db.Setup()
}

func main() {
	// Creates default gin router with Logger and Recovery middleware already attached
	router := gin.Default()

	port := "9000"
	// Create API route group
	api := router.Group("/api")
	{
		// Add /hello GET route to router and define route handler function
		api.GET("/ping", func(ctx *gin.Context) {
			ctx.JSON(200, gin.H{"msg": "world"})
		})

		// Auth
		api.GET("/token")
		api.POST("/register")
		api.POST("/logout")
		api.POST("/login")

		// Deck
		api.GET("/decks", handler.ListDeck)
		api.DELETE("/decks/:id")
		api.POST("/decks/add")

		// Card
		api.PUT("/cards")
		api.DELETE("/cards")
		api.POST("/cards")
		api.GET("/cards/:id")
		api.POST("/cards/add")
		api.POST("/cards/review")

		// Tag
		api.GET("/tags")
		api.POST("/tags/add")
		api.DELETE("/tags/:id")
		api.PUT("/tags/:id")

		// Note
		api.POST("/note")
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
