package dbutil

import (
	"booking-system/config"
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"time"
)

var DB *gorm.DB

func DBInit() {
	timeZone := "Asia/Taipei"
	loc, _ := time.LoadLocation(timeZone)

	connectString := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=%s",
		config.Conf.DBHost,
		config.Conf.DBUser,
		config.Conf.DBPass,
		config.Conf.DBName,
		config.Conf.DBPort,
		timeZone,
	)

	var err error
	DB, err = gorm.Open(postgres.Open(connectString), &gorm.Config{
		SkipDefaultTransaction: true,
		NowFunc: func() time.Time {
			return time.Now().In(loc)
		},
	})
	if err != nil {
		panic(err)
	}
}
