package db

import (
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

type Model struct {
	ID        string `gorm:"primaryKey"`
	UpdatedAt time.Time
	CreatAt   time.Time
}

type User struct {
	Model
	Name     string
	Avatar   string
	Phone    string
	Email    string
	Password string
}

type Deck struct {
	Model
	Pid      string
	Name     string
	UserID   string
	Desc     string
	IsPublic bool
}

type Card struct {
	Model
	DeckID   string
	Due      time.Time
	Reviews  int
	Tittle   string
	Status   CardStatus
	Interval int
	Efactor  float64
}

type Note struct {
	Model
	CardID  string
	Content string
	Type    NoteType
}

type Tag struct {
	Model
	Pid string
	Key string
}

type Storage struct {
	Model
	URL      string
	MIMEType string
	UserID   string
}
