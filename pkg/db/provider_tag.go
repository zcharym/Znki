package db

import (
	"fmt"
	"github.com/znkisoft/ztool/gen"
	"gorm.io/gorm"
)

func CreateTag(t *Tag) error {
	if err := db.Create(&t).Error; err != nil {
		return err
	}
	return nil
}

func GetTagsByCardID(cardID string) ([]Tag, error) {
	var (
		tags []Tag
		err  error
	)
	m := make(map[string]string, 5)
	m["cid"] = cardID

	if cardID == "" {
		return nil, fmt.Errorf("cardID is empty")
	}
	if _, err = IsCardExists(cardID); err != nil {
		return nil, err
	}
	result := db.Where(m).Find(&tags)

	if err = result.Error; err != nil {
		return nil, err
	}
	return tags, nil
}

func DeleteTag(tagID string) error {
	if err := db.Where("id = ?", tagID).Delete(&Tag{}).Error; err != nil {
		return err
	}
	return nil
}

func EditTag(tagID string, data interface{}) error {
	if err := db.Model(&Tag{}).Where("id = ?", tagID).Updates(data).Error; err != nil {
		return err
	}
	return nil
}

func (t *Tag) BeforeCreate(tx *gorm.DB) error {
	if t.ID == "" {
		uuid, err := gen.UUID()
		if err != nil {
			return err
		}
		t.ID = uuid
	}
	return nil
}

func (t *Tag) AfterCreate(tx *gorm.DB) error {
	return nil
}

func (t *Tag) BeforeSave(tx *gorm.DB) error {
	return nil
}

func (t *Tag) BeforeUpdate(tx *gorm.DB) error {
	return nil
}

func (t *Tag) AfterUpdate(tx *gorm.DB) error {
	return nil
}

func (t *Tag) AfterSave(tx *gorm.DB) error {
	return nil
}

func (t Tag) String() string {
	return "tag"
}
