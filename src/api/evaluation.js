import request from '@/utils/request';

export function query(listQuery) {
  return request({
    url: '/products/evaluation/list',
    method: 'post',
    data: listQuery,
  });
}

export function insert(data) {
  return request({
    url: '/products/evaluation',
    method: 'post',
    data,
  });
}
