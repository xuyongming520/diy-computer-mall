import request from '@/utils/request';

export function query(listQuery) {
  return request({
    url: '/users/address/list',
    method: 'post',
    data: listQuery,
  });
}

export function insert(data) {
  return request({
    url: '/users/address',
    method: 'post',
    data,
  });
}

export function update(data) {
  return request({
    url: '/users/address',
    method: 'put',
    data,
  });
}

export function deleteById(id) {
  return request({
    url: '/users/address',
    method: 'delete',
    params: {
      id,
    },
  });
}
