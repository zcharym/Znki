package handler

import (
	"github.com/gin-gonic/gin"
)

type ICard interface {
	CreateCard(c *gin.Context)
	ReviewCard(c *gin.Context)
	GetCards(c *gin.Context)
	GetCardByID(c *gin.Context)
	UpdateCard(c *gin.Context)
	RemoveCard(c *gin.Context)
}

type Card struct{}

// CreateCard
// @Tags Card
// @Accept json
// @Produce json
// @Security JWTAuth
// @Router /cards/add [post]
// @param body body db.Card true "card info"
// @Success 201 {string} json "{"code":200,"data":{},"msg":"success"}"
// @Description create card
// @Summary create card
func (card Card) CreateCard(c *gin.Context) {

}

// ReviewCard
// @Tags Card
// @Accept json
// @Produce json
// @Security JWTAuth
// @Router /cards/review [put]
// @param body body db.Card true "card info"
// @Success 200 {string} json "{"code":200,"data":{},"msg":"success"}"
// @Description review card
// @Summary review card
func (card Card) ReviewCard(c *gin.Context) {

}

// GetCards
// @Tags Card
// @Accept json
// @Produce json
// @Security JWTAuth
// @Router /cards [post]
// @param body body db.Card true "card info"
// @Param skip query number true "0"
// @Param take query number true "20"
// @Success 200 {string} json "{"code":200,"data":{},"msg":"success"}"
// @Description usually get cards by deck id
// @Summary usually get cards by deck id
func (card Card) GetCards(c *gin.Context) {

}

// GetCardByID
// @Tags Card
// @Accept json
// @Produce json
// @Security JWTAuth
// @Router /cards/{id} [get]
// @param id path string true "Card ID"
// @Success 200 {string} json "{"code":200,"data":{},"msg":"success"}"
// @Description get card by card id
// @Summary get card by card id
func (card Card) GetCardByID(c *gin.Context) {

}

// UpdateCard
// @Tags Card
// @Accept json
// @Produce json
// @Security JWTAuth
// @Router /cards [put]
// @param body body db.Card true "card info"
// @Success 200 {string} json "{"code":200,"data":{},"msg":"success"}"
// @Description update card
// @Summary update card
func (card Card) UpdateCard(c *gin.Context) {

}

// RemoveCard
// @Tags Card
// @Accept json
// @Produce json
// @Security JWTAuth
// @Router /cards/delete [post]
// @param body body handler.IdSet true "card ids"
// @Success 200 {string} json "{"code":200,"data":{},"msg":"success"}"
// @Description batch remove cards
// @Summary batch remove cards
func (card Card) RemoveCard(c *gin.Context) {

}
