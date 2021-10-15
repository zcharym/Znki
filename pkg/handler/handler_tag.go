package handler

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/znkisoft/znki/pkg/db"
	"github.com/znkisoft/znki/pkg/utils"
	"net/http"
)

type ITag interface {
	CreateTag(c *gin.Context)
	GetTags(c *gin.Context)
	EditTag(c *gin.Context)
	RemoveTag(c *gin.Context)
}

type Tag struct{}

// CreateTag
// @Tags Tag
// @Accept json
// @Router /tags/add [post]
// @param body body db.Tag true "tag info"
// @Success 201 {string} json "{"code":200,"data":{},"msg":"success"}"
// @Description create tag
// @Summary create tag
func (t Tag) CreateTag(c *gin.Context) {
	tag := db.Tag{}
	err := c.ShouldBind(&tag)
	if err != nil {
		c.JSON(http.StatusBadRequest, utils.ErrorResponse("tag info is not correct", 1000))
		return
	}
	if tag.Cid == "" {
		c.JSON(http.StatusBadRequest, utils.ErrorResponse("cid is needed", 1000))
		return
	}
	err = db.CreateTag(&tag)
	if err != nil {
		c.JSON(http.StatusInternalServerError, utils.ErrorResponse(err.Error(), 1000))
	}

	c.JSON(http.StatusCreated, utils.OkResponse(tag))
}

// GetTags
// @Tags Tag
// @Accept json
// @Produce json
// @Security JWTAuth
// @Router /tags [get]
// @param card_id query string true "card_id"
// @Success 200 {string} json "{"code":200,"data":{},"msg":"success"}"
// @Description create tag
// @Summary create tag
func (t Tag) GetTags(c *gin.Context) {
	var (
		tags []db.Tag
		err  error
	)
	cardID := c.Query("card_id")
	if cardID == "" {
		c.JSON(http.StatusBadRequest, utils.ErrorResponse("card id is needed", 1000))
		return
	}
	tags, err = db.GetTagsByCardID(cardID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, utils.ErrorResponse(err.Error(), 1000))
		return
	}
	c.JSON(http.StatusOK, utils.OkResponse(tags))
}

// EditTag
// @Tags Tag
// @Accept json
// @Produce json
// @Security JWTAuth
// @Router /tags/{id} [put]
// @param body body db.Tag true "tag info"
// @param id path string true "Tag ID"
// @Success 200 {string} json "{"code":200,"data":{},"msg":"success"}"
// @Description edit tag
// @Summary edit tag
func (t Tag) EditTag(c *gin.Context) {
	tagID := c.Param("id")
	newTag := &db.Tag{}
	err := c.ShouldBind(newTag)
	if err != nil {
		c.JSON(http.StatusBadRequest, utils.ErrorResponse("edit tag info error", 1000))
	}

	err = db.EditTag(tagID, newTag)
	if err != nil {
		c.JSON(http.StatusBadRequest, utils.ErrorResponse(fmt.Sprintf("delete tag by id error:%s", err), 1000))
		return
	}
	c.JSON(http.StatusOK, utils.OkResponse("edited"))

}

// RemoveTag
// @Tags Tag
// @Accept json
// @Produce json
// @Security JWTAuth
// @Router /tags/{id} [delete]
// @param id path string true "Tag ID"
// @Success 200 {string} json "{"code":200,"data":{},"msg":"success"}"
// @Description remove tag
// @Summary remove tag
func (t Tag) RemoveTag(c *gin.Context) {
	tagID := c.Param("id")
	if err := db.DeleteTag(tagID); err != nil {
		c.JSON(http.StatusBadRequest, utils.ErrorResponse(fmt.Sprintf("delete tag by id error:%s", err), 1000))
		return
	}
	c.JSON(http.StatusOK, utils.OkResponse("deleted"))

}
