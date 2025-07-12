package routers

import (
	"booking-system/controllers"
	beego "github.com/beego/beego/v2/server/web"
)

func init() {
	beego.Router("/", &controllers.MainController{})

	// 登入
	beego.Router("/auth/google", &controllers.AuthController{}, "post:GoogleLogin")

	// 預約
	beego.Router("/booking/tags", &controllers.BookingController{}, "get:GetBookingTags")
	beego.Router("/booking/list", &controllers.BookingController{}, "get:GetAll")
	beego.Router("/booking/add", &controllers.BookingController{}, "post:Add")
}
