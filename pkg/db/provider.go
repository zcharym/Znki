package db

import (
	"gorm.io/gorm"
)

type Provider interface {
}

var db *gorm.DB
