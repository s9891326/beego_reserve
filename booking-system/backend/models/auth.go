package models

import (
	"gorm.io/gorm"
	"time"
)

type UserId uint

type CustomGormModel struct {
	ID        uint           `gorm:"column:id;primaryKey;comment:id" json:"id"`
	CreatedAt time.Time      `gorm:"column:created_at;comment:create at" json:"created_at"`
	UpdatedAt time.Time      `gorm:"column:updated_at;comment:update at" json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"column:deleted_at;index;comment:deleted at" json:"deleted_at"`
}

// User 會員
type User struct {
	gorm.Model
	CustomGormModel
}
