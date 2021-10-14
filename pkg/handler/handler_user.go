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

// Login
// @Tags User
// @Accept json
// @Produce json
// @Router /login [post]
// TODO @param body body handler.RegisterParam true "user info"
// @Success 201 {string} json "{"code":200,"data":{},"msg":"success"}"
// @Description login
// @Summary login
func (h UserHandler) Login(c *gin.Context) {
	panic("implement me")
}

// Logout
// @Tags User
// @Accept json
// @Produce json
// @Router /logout [post]
// TODO @param body body handler.RegisterParam true "user info"
// @Success 200 {string} json "{"code":200,"data":{},"msg":"success"}"
// @Description logout
// @Summary logout
func (h UserHandler) Logout(c *gin.Context) {
	panic("implement me")
}

// UpdateUser
// @Tags User
// @Accept json
// @Produce json
// @Router /user [put]
// TODO @param body body handler.RegisterParam true "user info"
// @Success 200 {string} json "{"code":200,"data":{},"msg":"success"}"
// @Description update user info
// @Summary update user info
func (h UserHandler) UpdateUser(c *gin.Context) {
	panic("implement me")
}
