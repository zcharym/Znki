package handler

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/znkisoft/znki/pkg/auth"
	"github.com/znkisoft/znki/pkg/db"
	"github.com/znkisoft/znki/pkg/utils"
	"net/http"
	"time"
)

type IUser interface {
	Register(ctx *gin.Context)
	Login(ctx *gin.Context)
	Logout(ctx *gin.Context)
	UpdateUser(ctx *gin.Context)
}

type User struct{}

// Register
// @Tags auth
// @Accept json
// @Produce json
// @Router /register [post]
// @param body body handler.RegisterParam true "user info"
// @Success 201 {string} json "{"code":200,"data":{},"msg":"success"}"
// @Description user register
// @Summary user register
func (h User) Register(c *gin.Context) {
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
// @Tags auth
// @Accept json
// @Produce json
// @Router /login [post]
// @param body body handler.LoginParam true "user info"
// @Success 201 {string} json "{"code":200,"data":{},"msg":"success"}"
// @Description login
// @Summary login
func (h User) Login(c *gin.Context) {
	user := &db.User{}
	err := c.ShouldBind(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, utils.ErrorResponse("login params not correct", 1000))
		return
	}

	user, err = db.ValidateUser(user.Email, user.Password)
	if err != nil {
		c.JSON(http.StatusBadRequest, utils.ErrorResponse(err.Error(), 1000))
		return
	}

	expires := time.Now().Add(time.Minute * 5)
	token, err := auth.SignJWTToken(auth.Payload{UserId: user.ID, Username: user.Name}, expires)
	if err != nil {
		c.JSON(http.StatusInternalServerError, utils.ErrorResponse(err.Error(), 1000))
		return
	}

	output := auth.JWTOutput{Token: token, Expires: expires}
	c.JSON(http.StatusOK, utils.OkResponse(output))
}

// Logout
// @Tags auth
// @Accept json
// @Produce json
// @Security JWTAuth
// @Router /logout [post]
// @Success 200 {string} json "{"code":200,"data":{},"msg":"success"}"
// @Description logout
// @Summary logout
func (h User) Logout(c *gin.Context) {
	// could be implemented at client
	panic("implement me")
}

// Refresh
// @Tags auth
// @Accept json
// @Produce json
// @Security JWTAuth
// @Router /refresh [get]
// @Success 200 {string} json "{"code":200,"data":{},"msg":"success"}"
// @Description logout
// @Summary logout
func (h User) Refresh(c *gin.Context) {
	token := c.GetHeader("Authorization")
	claims, err := auth.ParseToken(token)

	if err != nil {
		c.JSON(http.StatusUnauthorized, utils.ErrorResponse(err.Error(), 10005))
		return
	}

	if time.Unix(claims.ExpiresAt, 0).Sub(time.Now()) > time.Minute*2 {
		c.JSON(http.StatusBadRequest, utils.ErrorResponse("the token is not expired yet", 10000))
		return
	}
	expirationTime := time.Now().Add(5 * time.Minute)
	claims.ExpiresAt = expirationTime.Unix()
	token, err = auth.RefreshToken(claims)

	if err != nil {
		c.JSON(http.StatusInternalServerError, utils.ErrorResponse(fmt.Sprintf("fresh token error: %v", err), 1000))
		return
	}

	output := auth.JWTOutput{Token: token, Expires: expirationTime}
	c.JSON(http.StatusOK, utils.OkResponse(output))
}

// UpdateUser
// @Tags User
// @Accept json
// @Produce json
// @Security JWTAuth
// @Router /user [put]
// TODO @param body body handler.RegisterParam true "user info"
// @Success 200 {string} json "{"code":200,"data":{},"msg":"success"}"
// @Description update user info
// @Summary update user info
func (h User) UpdateUser(c *gin.Context) {
	panic("implement me")
}
