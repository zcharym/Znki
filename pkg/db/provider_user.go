package db

import (
	"github.com/znkisoft/ztool/crypto"
	"github.com/znkisoft/ztool/gen"
	"gorm.io/gorm"
)

func CreateUser(user *User) error {
	if err := db.Create(&user).Error; err != nil {
		return err
	}
	return nil
}

func (u *User) BeforeCreate(tx *gorm.DB) error {
	// gen uuid
	if u.ID == "" {
		uuid, err := gen.UUID()
		if err != nil {
			return err
		}
		u.ID = uuid
	}

	// sha password
	encrypted, err := crypto.HashPassword(u.Password)
	if err != nil {
		return err
	}
	u.Password = encrypted
	return nil
}
