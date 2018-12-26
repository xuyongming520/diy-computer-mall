const nameKey = 'user-name';

export function getName() {
  return sessionStorage.getItem(nameKey);
}

export function setName(name) {
  return sessionStorage.setItem(nameKey, name);
}

export function removeName() {
  sessionStorage.removeItem(nameKey);
}
