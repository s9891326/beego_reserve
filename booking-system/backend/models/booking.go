package models

import (
	"gorm.io/gorm"
	"time"
)

// Booking 預約主體
type Booking struct {
	gorm.Model
	StartAt time.Time `gorm:"column:start_at;comment: start at"`
	EndAt   time.Time `gorm:"column:end_at;comment: end at"`
	Desc    string    `gorm:"column:desc;type:varchar(255);comment: description"`
	// todo: tags 標籤欄位(睫毛、指甲...)

	User User `gorm:"foreignKey:UserID"`
}

func (Booking) TableName() string {
	return "data_booking"
}
