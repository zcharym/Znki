package db

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"log"
)

func Setup() {
	var err error
	dsn := "root:Admin@1234@tcp(127.0.0.1:3306)/znki?charset=utf8mb4&parseTime=True&loc=Local"
	db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println(err.Error())
		log.Panic("Failed to connect to database")
	}
}

func DoMigration() {
	err := db.AutoMigrate(&User{}, &Deck{}, &Card{}, &Note{}, &Storage{}, &Tag{})
	if err != nil {
		log.Panic("auto miragtion error occurred")
	}
}
