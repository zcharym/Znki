package handler

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/znkisoft/znki/pkg/db"
	"github.com/znkisoft/znki/pkg/utils"
	"net/http"
)

type IDeckHandler interface {
	CreateDeck(c *gin.Context)
	ListDeck(c *gin.Context)
	DeleteDeck(c *gin.Context)
}

type DeckHandler struct{}

// CreateDeck
// @Tags Deck
// @Accept json
// @Produce json
// @Router /decks/add [post]
// @param body body db.Deck true "deck info"
// @Success 200 {string} json "{"code":200,"data":{},"msg":"success"}"
// @Description create deck
// @Summary create deck
func (d DeckHandler) CreateDeck(c *gin.Context) {
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
// @Router /decks [get]
// @Success 200 {string} json "{"code":200,"data":{},"msg":"ok"}"
// @Description get deck list
// @Summary get deck list
func (d DeckHandler) ListDeck(c *gin.Context) {
	var decks []db.Deck
	db.ListDeck(&decks)
	c.JSON(http.StatusOK, utils.OkResponse(decks))
}

// DeleteDeck
// @Tags Deck
// @Accept json
// @Produce json
// @Router /decks/{id} [delete]
// @param id path string true "Deck ID"
// @Success 200 {string} json "{"code":200,"data":{},"msg":"ok"}"
// @Description delete deck by deck id
// @Summary delete deck by deck id
func (d DeckHandler) DeleteDeck(c *gin.Context) {
	deckID := c.Param("id")
	if err := db.DeleteDeckByID(deckID); err != nil {
		c.JSON(http.StatusBadRequest, utils.ErrorResponse(fmt.Sprintf("delete deck by id error:%s", err), 1000))
	} else {
		c.JSON(http.StatusOK, utils.OkResponse("deleted"))
	}
}
