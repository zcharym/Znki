package db

import (
	"errors"
	"github.com/znkisoft/ztool/gen"
	"gorm.io/gorm"
)

func CreateDeck(deck *Deck) error {
	if deck.Name == "" || deck.UserID == "" {
		return errors.New("empty field(name,userID) not allowed in deck")
	}
	if err := db.Create(deck).Error; err != nil {
		return err
	}
	return nil
}

func ListDeck(decks *[]Deck, userID string) error {
	result := db.Where("user_id = ?", userID).Order("created_at desc").Limit(100).Find(decks)
	if err := result.Error; err != nil {
		return err
	}
	return nil
}

func DeleteDeckByID(deckID string) error {
	if err := db.Where("id = ?", deckID).Delete(&Deck{}).Error; err != nil {
		return err
	}
	return nil
}

func (d *Deck) BeforeCreate(tx *gorm.DB) error {
	if d.ID == "" {
		uuid, err := gen.UUID()
		if err != nil {
			return err
		}
		d.ID = uuid
	}
	return nil
}

func (d *Deck) AfterCreate(tx *gorm.DB) error {
	return nil
}

func (d *Deck) BeforeSave(tx *gorm.DB) error {
	return nil
}

func (d *Deck) BeforeUpdate(tx *gorm.DB) error {
	return nil
}

func (d *Deck) AfterUpdate(tx *gorm.DB) error {
	return nil
}

func (d *Deck) AfterSave(tx *gorm.DB) error {
	return nil
}
