package controllers

import (
	"booking-system/config"
	"booking-system/dbutil"
	"booking-system/models"
	"booking-system/utils"
	"encoding/json"
	"github.com/beego/beego/v2/core/logs"
	"github.com/beego/beego/v2/server/web"
)

type BookingController struct {
	web.Controller
}

// GetBookingTags @router /booking/tags
func (c *BookingController) GetBookingTags() {
	c.Data["json"] = config.BookingTags
	_ = c.ServeJSON()

}

// GetAll @router /booking/list [get]
/*
Request
{
	search: "2024/05"  # 取得某年某月的所有客人預約日期與會員資料
}

Response
[
    {
        "ID": 1,
        "CreatedAt": "2025-05-14T22:30:54.641846+08:00",
        "UpdatedAt": "2025-05-14T22:30:54.641846+08:00",
        "DeletedAt": null,
        "user_id": 1,
        "start_at": "2025-05-14T18:00:00+08:00",
        "end_at": "2025-05-14T19:00:00+08:00",
        "desc": "剪髮"
    }
]
*/
func (c *BookingController) GetAll() {
	var bookings []models.Booking
	query := dbutil.DB.Model(bookings)

	search := c.GetString("search", "")
	if search != "" {
		startDate, endDate := utils.GetMonthRange(search)
		query.Where("start_at >= ? AND start_at <= ?", startDate, endDate)
	}

	if err := query.Find(&bookings).Error; err != nil {
		logs.Error(err)
		c.CustomAbort(400, err.Error())
	}

	c.Data["json"] = bookings
	_ = c.ServeJSON()
}

/*
Add @router /booking/add [post]

	{
		"user_id": 1,
		"desc": "desc",
		"start_at": "2025-06-09T11:00:00+08:00",
		"end_at": "2025-06-09T12:30:00+08:00",
		"tags": [ 1 ]
	}
*/
func (c *BookingController) Add() {
	var booking models.Booking
	if err := json.Unmarshal(c.Ctx.Input.RequestBody, &booking); err != nil {
		logs.Error(err)
		c.CustomAbort(400, "Invalid request body")
		return
	}

	if err := dbutil.DB.Create(&booking).Error; err != nil {
		logs.Error(err)
		c.CustomAbort(500, "Database error")
		return
	}

	c.Data["json"] = map[string]interface{}{
		"success": true,
		"data":    booking,
	}
	_ = c.ServeJSON()
}
