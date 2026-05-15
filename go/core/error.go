package core

type ListenfreeError struct {
	IsListenfreeError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewListenfreeError(code string, msg string, ctx *Context) *ListenfreeError {
	return &ListenfreeError{
		IsListenfreeError: true,
		Sdk:              "Listenfree",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *ListenfreeError) Error() string {
	return e.Msg
}
