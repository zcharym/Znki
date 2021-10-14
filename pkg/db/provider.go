package db

import (
	"gorm.io/gorm"
)

var db *gorm.DB

type IProvider interface {
	BeforeCreate(tx *gorm.DB) error
	AfterCreate(tx *gorm.DB) error
	BeforeSave(tx *gorm.DB) error
	BeforeUpdate(tx *gorm.DB) error
	AfterUpdate(tx *gorm.DB) error
	AfterSave(tx *gorm.DB) error
}
