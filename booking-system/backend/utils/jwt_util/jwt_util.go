package jwt_util

import (
	"github.com/golang-jwt/jwt/v5"
	"time"
)

var jwtSecret = []byte("booking-system-secret")

const (
	jwtAdminIdKey = "admin_id"
	jwtUnixKey    = "admin_unix"
)

func GenerateJWT(adminId uint) (string, error) {
	claims := jwt.MapClaims{
		jwtAdminIdKey: adminId,
		jwtUnixKey:    time.Now().Add(24 * time.Hour).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}
