package handler

type RegisterParam struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginParam struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type IdSet struct {
	IdSet []string `json:"id_set"`
}
