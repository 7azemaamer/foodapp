import { BASE_URL } from "./constants"

const BASE_USERS_URL = `${BASE_URL}/Users`
export const BASE_IMG_URL = "https://upskilling-egypt.com:3006"

export const USERS_URLS = {
  login: `${BASE_USERS_URL}/Login`,
  register: `${BASE_USERS_URL}/Register`,
  delete: (id) => `${BASE_USERS_URL}/${id}`,
  reset: `${BASE_USERS_URL}/Reset`,
  changePassword: `${BASE_USERS_URL}/ChangePassword`,
  resetRequest: `${BASE_USERS_URL}/Reset/Request`,
  getList: `${BASE_USERS_URL}`,
  verifyAccount: `${BASE_USERS_URL}/verify`,
}

const BASE_CATEGORIES = `${BASE_URL}/Category`

export const CATEGORIES_URLS = {
  getList: `${BASE_CATEGORIES}`,
  create: `${BASE_CATEGORIES}`,
  delete: (id) => `${BASE_CATEGORIES}/${id}`,
  update: (id) => `${BASE_CATEGORIES}/${id}`,
}
const BASE_RECIPES = `${BASE_URL}/Recipe`

export const RECIPES_URLS = {
  getList: `${BASE_RECIPES}`,
  delete: (id) => `${BASE_RECIPES}/${id}`,
  create: `${BASE_RECIPES}`,
  update: (id) => `${BASE_RECIPES}/${id}`,
}

export const GET_TAGS = `${BASE_URL}/Tag`

const BASE_FAV = `${BASE_URL}/userRecipe/`

export const FAV_URLS = {
  get: `${BASE_FAV}`,
  add: `${BASE_FAV}`,
  remove: (id) => `${BASE_FAV}/${id}`,
}
