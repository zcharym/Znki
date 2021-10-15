package db

import (
	"time"
)

type CardStatus string
type NoteType string

const (
	NEW      CardStatus = "new"
	Learning CardStatus = "learning"
	Archived CardStatus = "archived"
)

const (
	TEXT  NoteType = "text"
	IMAGE NoteType = "image"
)

type Model struct {
	ID        string    `json:"id" gorm:"primaryKey"`
	UpdatedAt time.Time `json:"updated_at" gorm:"type:datetime not null default CURRENT_TIMESTAMP"`
	CreatedAt time.Time `json:"created_at" gorm:"type:datetime not null default CURRENT_TIMESTAMP"`
}

type User struct {
	Model
	Name     string `json:"name"`
	Avatar   string `json:"avatar"`
	Phone    string `json:"phone"`
	Email    string `json:"email" gorm:"unique"`
	Password string `json:"password"`
}

type Deck struct {
	Model
	Pid      string `json:"pid"`
	Name     string `json:"name"`
	UserID   string `json:"user_id"`
	Desc     string `json:"desc"`
	IsPublic bool   `json:"is_public"`
}

type Card struct {
	Model
	DeckID   string     `json:"deck_id"`
	Due      time.Time  `json:"due"`
	Reviews  int        `json:"reviews"`
	Tittle   string     `json:"tittle"`
	Status   CardStatus `json:"status"`
	Interval int        `json:"interval"`
	Efactor  float64    `json:"efactor"`

	Note   Note   `json:"note"`
	NoteID string `json:"note_id" gorm:"index"`

	Tag   Tag    `json:"tag"`
	TagID string `json:"tag_id" gorm:"index"`
}

type Note struct {
	Model
	CardID  string   `json:"card_id"`
	Content string   `json:"content"`
	Type    NoteType `json:"type"`
}

type Tag struct {
	Model
	Cid string `json:"cid"`
	Key string `json:"key"`
}

type Storage struct {
	Model
	URL      string `json:"url"`
	MIMEType string `json:"mime_type"`
	UserID   string `json:"user_id"`
}
