import * as users from '@/api/users';

const nameKey = 'user-name';

export function getName() {
  return sessionStorage.getItem(nameKey);
}

export function setName() {
  users.userInfo()
    .then((res) => {
      console.log(res);
      switch (res.data.code) {
        case '1':
          sessionStorage.setItem(nameKey, res.data.users.name);
          break;
        default:
          break;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function removeName() {
  sessionStorage.removeItem(nameKey);
}
