package db

import (
	"github.com/znkisoft/ztool/gen"
	"gorm.io/gorm"
)

func AddCard(card Card, note Note) error {
	return nil
}

func ReviewCard() error {
	return nil
}
func ListCard(skip, take int, cond Card) error {

	return nil
}
func DeleteCards(cardIDs string) error {
	return nil
}
func GetCardById() error {
	return nil
}
func UpdateCard() error {
	return nil
}

func IsCardExists(cardID string) (bool, error) {
	var card Card
	// err := db.Select("id").Where("id = ? AND deleted_on = ? ", cardID, 0).First(&card).Error
	err := db.Select("id").Where("id = ?", cardID).First(&card).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return false, err
	}
	if card.ID != "" {
		return true, nil
	}
	return false, nil
}

func (c *Card) BeforeCreate(tx *gorm.DB) error {
	if c.ID == "" {
		uuid, err := gen.UUID()
		if err != nil {
			return err
		}
		c.ID = uuid
	}
	return nil
}

func (c *Card) AfterCreate(tx *gorm.DB) error {
	return nil
}

func (c *Card) BeforeSave(tx *gorm.DB) error {
	return nil
}

func (c *Card) BeforeUpdate(tx *gorm.DB) error {
	return nil
}

func (c *Card) AfterUpdate(tx *gorm.DB) error {
	return nil
}

func (c *Card) AfterSave(tx *gorm.DB) error {
	return nil
}
