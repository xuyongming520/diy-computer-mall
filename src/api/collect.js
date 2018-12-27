import request from '@/utils/request';

export function query(listQuery) {
  return request({
    url: '/users/collect',
    method: 'post',
    data: listQuery,
  });
}

export function insert(productId) {
  return request({
    url: '/users/collect',
    method: 'post',
    data: {
      commodityId: productId,
    },
  });
}

export function deleteCollect(productId) {
  return request({
    url: '/users/collect',
    method: 'delete',
    params: {
      id: productId,
    },
  });
}

export function isCollected(productId) {
  return request({
    url: '/users/collect/iscollect',
    method: 'get',
    params: {
      id: productId,
    },
  });
}
