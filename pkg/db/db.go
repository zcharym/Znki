package db

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"log"
	"os"
	"time"
)

func Setup() {
	var err error

	newLogger := logger.New(
		log.New(os.Stdout, "[GORM]", log.LstdFlags), // io writer
		logger.Config{
			SlowThreshold:             time.Second, // Slow SQL threshold
			LogLevel:                  logger.Info, // Log level
			IgnoreRecordNotFoundError: true,        // Ignore ErrRecordNotFound error for logger
			Colorful:                  true,        // Disable color
		},
	)

	dsn := "root:Admin@1234@tcp(127.0.0.1:3306)/znki?charset=utf8mb4&parseTime=True&loc=Local"
	db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: newLogger,
	})
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
