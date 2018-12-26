import request from '@/utils/request';

export function query(listQuery) {
  return request({
    url: '/products',
    method: 'post',
    data: listQuery,
  });
}

export function queryDetail(productId) {
  return request({
    url: '/products',
    method: 'get',
    params: {
      id: productId,
    },
  });
}

export function deleteByPkId(productId) {
  return request({
    url: '/products/remove',
    method: 'delete',
    params: {
      id: productId,
    },
  });
}
