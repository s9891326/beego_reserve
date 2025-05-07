package dbutil

import (
	"booking-system/config"
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func DBInit() {
	connectString := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Taipei",
		config.Conf.DBHost,
		config.Conf.DBUser,
		config.Conf.DBPass,
		config.Conf.DBName,
		config.Conf.DBPort,
	)

	var err error
	DB, err = gorm.Open(postgres.Open(connectString), &gorm.Config{
		SkipDefaultTransaction: true,
	})
	if err != nil {
		panic(err)
	}
}
