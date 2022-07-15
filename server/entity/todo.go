package entity

import (
	"github.com/jinzhu/gorm"
)

type Todo struct {
	gorm.Model
	// ID     int    `json:"id"`
	Title  string `json:"text"`
	IsDone bool   `json:"isComplete"`
}
