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

type BaseModel struct {
	ID        string `gorm:"primaryKey"`
	UpdatedAt time.Time
	CreatAt   time.Time
}

type User struct {
	gorm.Model
	BaseModel
	Name     string
	Avatar   string
	Phone    string
	Email    string
	Password string
}

type Deck struct {
	gorm.Model
	Pid      string
	Name     string
	UserID   string
	Desc     string
	IsPublic bool
}

type Card struct {
	gorm.Model
	DeckID   string
	Due      time.Time
	Reviews  int
	Tittle   string
	Status   CardStatus
	Interval int
	Efactor  float64
}

type Note struct {
	gorm.Model
	CardID  string
	Content string
	Type    NoteType
}

type Tag struct {
	gorm.Model
	Pid string
	Key string
}

type Storage struct {
	gorm.Model
	URL      string
	MIMEType string
	UserID   string
}
