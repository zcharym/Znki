package handler

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/znkisoft/znki/pkg/db"
	"github.com/znkisoft/znki/pkg/utils"
	"net/http"
)

type IDeck interface {
	CreateDeck(c *gin.Context)
	ListDeck(c *gin.Context)
	DeleteDeck(c *gin.Context)
}

type Deck struct{}

// CreateDeck
// @Tags Deck
// @Accept json
// @Produce json
// @Security JWTAuth
// @Router /decks/add [post]
// @param body body db.Deck true "deck info"
// @Success 200 {string} json "{"code":200,"data":{},"msg":"success"}"
// @Description create deck
// @Summary create deck
func (d Deck) CreateDeck(c *gin.Context) {
	deck := &db.Deck{}
	err := c.ShouldBind(&deck)
	if err != nil {
		c.JSON(http.StatusBadRequest, utils.ErrorResponse("deck create param error", 1000))
	}

	// TODO differentiate null and empty string value in MySQL with GORM
	if err := db.CreateDeck(deck); err != nil {
		c.JSON(http.StatusBadRequest, utils.ErrorResponse("deck create error", 1001))
	} else {
		c.JSON(http.StatusCreated, utils.OkResponse("created"))
	}
}

// ListDeck
// @Tags Deck
// @Accept json
// @Produce json
// @Security JWTAuth
// @Router /decks [get]
// @Param user_id query string true "user_id"
// @Success 200 {string} json "{"code":200,"data":{},"msg":"ok"}"
// @Description get deck list by user id
// @Summary get deck list by user id
func (d Deck) ListDeck(c *gin.Context) {
	var decks []db.Deck
	userID := c.Query("user_id")
	err := db.ListDeck(&decks, userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, utils.ErrorResponse(err.Error(), 1000))
		return
	}
	c.JSON(http.StatusOK, utils.OkResponse(decks))
}

// DeleteDeck
// @Tags Deck
// @Accept json
// @Produce json
// @Security JWTAuth
// @Router /decks/{id} [delete]
// @param id path string true "Deck ID"
// @Success 200 {string} json "{"code":200,"data":{},"msg":"ok"}"
// @Description delete deck by deck id
// @Summary delete deck by deck id
func (d Deck) DeleteDeck(c *gin.Context) {
	deckID := c.Param("id")
	if err := db.DeleteDeckByID(deckID); err != nil {
		c.JSON(http.StatusBadRequest, utils.ErrorResponse(fmt.Sprintf("delete deck by id error:%s", err), 1000))
	} else {
		c.JSON(http.StatusOK, utils.OkResponse("deleted"))
	}
}
