package utils

import (
	"strconv"
	"strings"
	"time"
)

// GetMonthRange 取得某年某月的開始日期~結束日期
func GetMonthRange(date string) (start, end time.Time) {
	// 切割年月
	dateSplit := strings.Split(date, "/")
	yearStr, monthStr := dateSplit[0], dateSplit[1]

	year, _ := strconv.Atoi(yearStr)
	month, _ := strconv.Atoi(monthStr)

	start = time.Date(year, time.Month(month), 1, 0, 0, 0, 0, time.Local)
	end = start.AddDate(0, 1, 0).Add(-time.Second)
	return start, end
}
