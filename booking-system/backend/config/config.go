package config

import "os"

type Config struct {
	DBHost         string
	DBPort         string
	DBUser         string
	DBPass         string
	DBName         string
	ReceiverHost   string
	Port           string
	ViewsPath      string
	GoogleClientId string
}

var Conf *Config

var BookingTags = map[int8]string{
	1: "睫毛",
	2: "指甲",
	3: "頭髮",
}

func init() {
	Conf = &Config{
		DBHost:         getEnv("DB_HOST", "127.0.0.1"),
		DBPort:         getEnv("DB_PORT", "5432"),
		DBUser:         getEnv("DB_USER", "pgroot"),
		DBPass:         getEnv("DB_PASS", "pg_root"),
		DBName:         getEnv("DB_NAME", "booking"),
		ReceiverHost:   getEnv("RECEIVER_HOST", "0.0.0.0"),
		Port:           getEnv("PORT", "8850"),
		ViewsPath:      getEnv("VIEWS_PATH", "views"),
		GoogleClientId: getEnv("GOOGLE_CLIENT_ID", ""),
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
