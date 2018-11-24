import request from '@/utils/request';

export default function login() {
  return request({
    url: '/token',
    method: 'post',
    data: {
      ukPhone: '17306567116',
      password: '123',
    },
  });
}
