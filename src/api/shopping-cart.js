import request from '@/utils/request';

export function insert(productId, number) {
  return request({
    url: '/products/shoppingcart',
    method: 'post',
    data: {
      commodityId: productId,
      number,
    },
  });
}

export function query() {
  return request({
    url: '/products/shoppingcart',
    method: 'get',
  });
}

export function update(productId, number) {
  return request({
    url: '/products/shoppingcart',
    method: 'put',
    data: {
      commodityId: productId,
      number,
    },
  });
}

export function deleteById(productId) {
  return request({
    url: '/products/shoppingcart',
    method: 'delete',
    params: {
      id: productId,
    },
  });
}
