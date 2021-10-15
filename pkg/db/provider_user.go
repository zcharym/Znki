package db

import (
	"errors"
	"github.com/znkisoft/ztool/crypto"
	"github.com/znkisoft/ztool/gen"
	"gorm.io/gorm"
	"strings"
)

func CreateUser(user *User) error {
	user.Email = strings.ToLower(user.Email)
	if err := db.Create(&user).Error; err != nil {
		return err
	}
	return nil
}

func ValidateUser(email string, pwd string) (*User, error) {
	user, err := FindUserByEmail(email)
	if err != nil {
		return nil, err
	}
	if user != nil {
		if crypto.CheckPasswordHash(pwd, user.Password) {
			return user, nil
		}
		return user, errors.New("password not correct")
	}
	return nil, errors.New("user not find")
}

func FindUserByEmail(email string) (*User, error) {
	user := &User{}
	result := db.Where("email = ?", strings.ToLower(email)).First(&user)
	if err := result.Error; err != nil {
		return nil, err
	}
	return user, nil
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
