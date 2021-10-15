package db

import (
	"github.com/znkisoft/ztool/gen"
	"gorm.io/gorm"
)

func CreateTag(tx *gorm.DB) {

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
