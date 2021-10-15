package handler

import (
	"github.com/gin-gonic/gin"
)

type ITag interface {
	CreateTag(c *gin.Context)
	GetTags(c *gin.Context)
	UpdateTag(c *gin.Context)
	RemoveTag(c *gin.Context)
}

type Tag struct{}

func (t Tag) CreateTag(c *gin.Context) {

}

func (t Tag) GetTags(c *gin.Context) {

}

func (t Tag) UpdateTag(c *gin.Context) {

}

func (t Tag) RemoveTag(c *gin.Context) {

}
