import Cookies from 'js-cookie';

const cartKey = 'user-shopping-cart';

export function getCart() {
  return Cookies.get(cartKey);
}

export function setCart(cart) {
  return Cookies.set(cartKey, cart);
}

export function removeCart() {
  return Cookies.remove(cartKey);
}
