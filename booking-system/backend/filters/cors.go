package filters

import "github.com/beego/beego/v2/server/web/context"

var AllowCORS = func(ctx *context.Context) {
	ctx.ResponseWriter.Header().Set("Access-Control-Allow-Origin", "*")
	ctx.ResponseWriter.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	ctx.ResponseWriter.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if ctx.Input.Method() == "OPTIONS" {
		ctx.ResponseWriter.WriteHeader(200)
		return
	}
}
