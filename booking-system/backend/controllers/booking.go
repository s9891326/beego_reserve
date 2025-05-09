package controllers

import (
	"booking-system/dbutil"
	"booking-system/models"
	"github.com/beego/beego/v2/server/web"
)

type BookingController struct {
	web.Controller
}

// GetAll @router /booking [get]
func (c *BookingController) GetAll() {
	var bookings []models.Booking
	dbutil.DB.Find(&bookings)
	c.Data["json"] = bookings
	err := c.ServeJSON()
	if err != nil {
		return
	}
}
