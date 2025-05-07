package main

import (
	"booking-system/dbutil"
	"booking-system/models"
	_ "booking-system/routers"
	beego "github.com/beego/beego/v2/server/web"
)

func main() {
	dbutil.DBInit()
	dbutil.DB = dbutil.DB.Debug()
	autoMigrate()

	beego.BConfig.WebConfig.ViewsPath = "backend/views"
	beego.Run()
}

func autoMigrate() {
	err := dbutil.DB.AutoMigrate(
		&models.Reservation{},
	)

	if err != nil {
		return
	}
}
