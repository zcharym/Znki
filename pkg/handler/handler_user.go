package handler

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/znkisoft/znki/pkg/db"
	"github.com/znkisoft/znki/pkg/utils"
	"net/http"
)

type IUserHandler interface {
	Register(ctx *gin.Context)
	Login(ctx *gin.Context)
	Logout(ctx *gin.Context)
	CreateUser(ctx *gin.Context)
	UpdateUser(ctx *gin.Context)
}

type UserHandler struct{}

// Register
// @Tags User
// @Accept json
// @Produce json
// @Router /register [post]
// @param body body handler.RegisterParam true "user info"
// @Success 201 {string} json "{"code":200,"data":{},"msg":"success"}"
// @Description user register
// @Summary list decks from user
func (h UserHandler) Register(c *gin.Context) {
	var user db.User
	err := c.ShouldBind(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, utils.ErrorResponse(fmt.Sprintf("bind body error:%s", err), 1000))
	}

	if err := db.CreateUser(&user); err != nil {
		c.JSON(http.StatusBadRequest, utils.ErrorResponse(fmt.Sprintf("create user error:%s", err), 1000))
	} else {
		c.JSON(http.StatusCreated, utils.OkResponse("created"))
	}
}

func (h UserHandler) Login(c *gin.Context) {
	panic("implement me")
}

func (h UserHandler) Logout(c *gin.Context) {
	panic("implement me")
}

func (h UserHandler) CreateUser(c *gin.Context) {
	panic("implement me")
}

func (h UserHandler) UpdateUser(c *gin.Context) {
	panic("implement me")
}
