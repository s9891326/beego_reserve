package routers

import (
	"booking-system/controllers"
	beego "github.com/beego/beego/v2/server/web"
)

func init() {
	beego.Router("/", &controllers.MainController{})

	beego.Router("/booking/list", &controllers.BookingController{}, "get:GetAll")
	beego.Router("/booking/add", &controllers.BookingController{}, "post:Add")
}
