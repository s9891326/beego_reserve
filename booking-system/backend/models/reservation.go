package models

import "gorm.io/gorm"

// Reservation 預約
type Reservation struct {
	gorm.Model
	UserID uint `gorm:"column:user_id;index;comment:user id"`
}
