import Cookies from 'js-cookie';

const nameKey = 'user-name';

export function getName() {
  return Cookies.get(nameKey);
}

export function setName(name) {
  return Cookies.set(nameKey, name);
}

export function removeName() {
  Cookies.remove(nameKey);
}
