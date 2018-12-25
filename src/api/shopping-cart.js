import request from '@/utils/request';

export function insert(productId, number) {
  return request({
    url: '/users/shoppingcart',
    method: 'post',
    data: {
      commodityId: productId,
      number,
    },
  });
}

export function query() {
  return request({
    url: '/users/shoppingcart',
    method: 'get',
  });
}

export function update(productId, number) {
  return request({
    url: '/users/shoppingcart',
    method: 'put',
    data: {
      commodityId: productId,
      number,
    },
  });
}

export function deleteById(productId) {
  return request({
    url: '/users/shoppingcart',
    method: 'delete',
    params: {
      id: productId,
    },
  });
}
