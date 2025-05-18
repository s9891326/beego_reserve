package models

import (
	"time"
)

// Booking 預約主體
type Booking struct {
	CustomGormModel
	UserID  UserId    `gorm:"column:user_id;primaryKey;comment: user id" json:"user_id"`
	StartAt time.Time `gorm:"column:start_at;comment: start at" json:"start_at"`
	EndAt   time.Time `gorm:"column:end_at;comment: end at" json:"end_at"`
	Desc    string    `gorm:"column:desc;type:varchar(255);comment: description" json:"desc"`
	// todo: tags 標籤欄位(睫毛、指甲...)
}

func (Booking) TableName() string {
	return "data_booking"
}
