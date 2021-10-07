package db

import (
	"gorm.io/gorm"
	"time"
)

type CardStatus string
type NoteType string

const (
	NEW      CardStatus = "new"
	Learning            = "learning"
	Archived            = "archived"
)

const (
	TEXT  NoteType = "text"
	IMAGE          = "image"
)

type User struct {
	gorm.Model
	ID        string `gorm:"primaryKey"`
	Name      string
	Avatar    string
	Phone     string
	Email     string
	UpdatedAt time.Time
	CreatAt   time.Time
	Password  string
}

type Deck struct {
	gorm.Model
	ID        string `gorm:"primaryKey"`
	Pid       string
	CreatedAt time.Time
	UpdatedAt time.Time
	Name      string
	UserID    string
	Desc      string
	IsPublic  bool
}

type Card struct {
	gorm.Model
	ID        string `gorm:"primaryKey"`
	DeckID    string
	Due       time.Time
	Reviews   int
	Tittle    string
	Status    CardStatus
	Interval  int
	Efactor   float64
	CreatedAt time.Time
	UpdatedAt time.Time
}

type Note struct {
	gorm.Model
	ID        string `gorm:"primaryKey"`
	CardID    string
	Content   string
	Type      NoteType
	CreatedAt time.Time
	UpdatedAt time.Time
}

type Tag struct {
	gorm.Model
	ID        string `gorm:"primaryKey"`
	Pid       string
	Key       string
	CreatedAt time.Time
	UpdatedAt time.Time
}

type Storage struct {
	gorm.Model
	ID        string `gorm:"primaryKey"`
	URL       string
	MIMEType  string
	UserID    string
	CreatedAt time.Time
	UpdatedAt time.Time
}
