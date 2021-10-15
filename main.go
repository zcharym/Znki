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
	"github.com/znkisoft/znki/pkg/middleware"
	"net/http"
)

func init() {
	db.Setup()
}

// @title Znki API doc
// @version 0.1
// @description Znki API documentation
// @termsOfService http://swagger.io/terms/

// @contact.name Zchary
// @contact.url https://github.com/zchary-ma
// @contact.email zcharyma@gmail.com

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @securityDefinitions.apikey JWTAuth
// @in header
// @name Authorization

// // @host example.com
func main() {
	// Creates default gin router with Logger and Recovery middleware already attached
	router := gin.Default()
	port := "9000"

	// Auth without jwt
	router.POST("/api/register", handler.User{}.Register)
	router.POST("/api/login", handler.User{}.Login)

	// api group with jwt middleware
	api := router.Group("/api")
	api.Use(middleware.AuthMiddleware())
	{
		// Add /hello GET route to router and define route handler function
		api.GET("/ping", func(ctx *gin.Context) {
			ctx.JSON(200, gin.H{"msg": "world"})
		})

		// Auth & User
		api.GET("/refresh", handler.User{}.Refresh)
		api.POST("/logout", handler.User{}.Logout)

		// Deck
		api.GET("/decks", handler.Deck{}.ListDeck)
		api.DELETE("/decks/:id", handler.Deck{}.DeleteDeck)
		api.POST("/decks/add", handler.Deck{}.CreateDeck)

		// Card
		api.PUT("/cards", handler.Card{}.UpdateCard)
		api.POST("/cards/delete", handler.Card{}.RemoveCard)
		api.POST("/cards", handler.Card{}.GetCards)
		api.GET("/cards/:id", handler.Card{}.GetCardByID)
		api.POST("/cards/add", handler.Card{}.CreateCard)
		api.PUT("/cards/review", handler.Card{}.ReviewCard)

		// Tag
		api.GET("/tags", handler.Tag{}.GetTags)
		api.POST("/tags/add", handler.Tag{}.CreateTag)
		api.DELETE("/tags/:id", handler.Tag{}.RemoveTag)
		api.PUT("/tags/:id", handler.Tag{}.EditTag)

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
