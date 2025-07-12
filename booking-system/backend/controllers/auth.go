package controllers

import (
	"booking-system/config"
	"booking-system/dbutil"
	"booking-system/models"
	"booking-system/utils/jwt_util"
	"context"
	"encoding/json"
	"github.com/beego/beego/v2/core/logs"
	"github.com/beego/beego/v2/server/web"
	"google.golang.org/api/idtoken"
)

type AuthController struct {
	web.Controller
}

type GoogleLoginReq struct {
	IDToken string `json:"id_token"`
}

// GoogleLogin @router /booking/tags
func (c *AuthController) GoogleLogin() {
	var req GoogleLoginReq
	if err := json.Unmarshal(c.Ctx.Input.RequestBody, &req); err != nil {
		logs.Error(err)
		c.CustomAbort(400, "Invalid request body")
		return
	}

	payload, err := idtoken.Validate(context.Background(), req.IDToken, config.Conf.GoogleClientId)
	if err != nil {
		c.CustomAbort(400, "Invalid ID Token")
		return
	}

	email := payload.Claims["email"].(string)
	name := payload.Claims["name"].(string)

	user := models.User{
		Name:  name,
		Email: email,
	}
	if err := dbutil.DB.Model(user).Where("email = ?", email).FirstOrCreate(&user).Error; err != nil {
		logs.Error(err)
		c.CustomAbort(500, "Failed to create user")
		return
	}

	token, _ := jwt_util.GenerateJWT(user.ID)
	c.Data["json"] = map[string]interface{}{
		"token": token,
	}
	_ = c.ServeJSON()
}
