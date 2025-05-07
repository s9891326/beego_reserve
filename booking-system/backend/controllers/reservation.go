package controllers

import (
	"booking-system/dbutil"
	"booking-system/models"
	"github.com/beego/beego/v2/server/web"
)

type ReservationController struct {
	web.Controller
}

//var DB *gorm.DB

//func init() {
//	dsn := "host=localhost user=pg_root password=pg_password dbname=booking port=5432 sslmode=disable"
//	var err error
//	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
//	if err != nil {
//		log.Fatal("failed to connect database:", err)
//	}
//
//	if err := DB.AutoMigrate(&models.Reservation{}); err != nil {
//		log.Fatal("AutoMigrate failed:", err)
//	}
//}

// @router /reservations [get]
func (c *ReservationController) GetAll() {
	var reservations []models.Reservation
	dbutil.DB.Find(&reservations)
	c.Data["json"] = reservations
	err := c.ServeJSON()
	if err != nil {
		return
	}
}
