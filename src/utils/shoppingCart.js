const cartKey = 'user-shopping-cart';

export function getCart() {
  return sessionStorage.getItem(cartKey);
}

export function setCart(cart) {
  return sessionStorage.setItem(cartKey, cart);
}

export function removeCart() {
  return sessionStorage.removeItem(cartKey);
}
