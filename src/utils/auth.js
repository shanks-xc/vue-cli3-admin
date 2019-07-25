import Cookies from 'js-cookie'

const TokenKey = 'login'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken (TokenKey) {
  return Cookies.remove(TokenKey)
}
