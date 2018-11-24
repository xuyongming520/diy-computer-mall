const TokenKey = 'Admin-Token';

export function getToken() {
  return sessionStorage.get(TokenKey);
}

export function setToken(token) {
  return sessionStorage.set(TokenKey, token);
}

export function removeToken() {
  return sessionStorage.remove(TokenKey);
}
