package config

import "os"

type Config struct {
	DBHost string
	DBPort string
	DBUser string
	DBPass string
	DBName string
}

var Conf *Config

func init() {
	Conf = &Config{
		DBHost: getEnv("DB_HOST", "127.0.0.1"),
		DBPort: getEnv("DB_PORT", "5432"),
		DBUser: getEnv("DB_USER", "pgroot"),
		DBPass: getEnv("DB_PASS", "pg_root"),
		DBName: getEnv("DB_NAME", "booking"),
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
