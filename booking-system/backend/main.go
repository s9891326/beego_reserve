package main

import (
	"booking-system/config"
	"booking-system/dbutil"
	"booking-system/filters"
	"booking-system/models"
	_ "booking-system/routers"
	beego "github.com/beego/beego/v2/server/web"
)

func main() {
	dbutil.DBInit()
	dbutil.DB = dbutil.DB.Debug()
	autoMigrate()

	beego.InsertFilter("*", beego.BeforeRouter, filters.AllowCORS)

	beego.BConfig.WebConfig.ViewsPath = config.Conf.ViewsPath
	beego.Run(config.Conf.ReceiverHost + ":" + config.Conf.Port)
}

func autoMigrate() {
	err := dbutil.DB.AutoMigrate(
		&models.User{},
		&models.Booking{},
	)

	if err != nil {
		return
	}
}
