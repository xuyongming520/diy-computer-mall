/**
 * 邮箱格式检查函数
 *
 * @export
 * @param {*} str
 * @returns
 */
export function email(str) {
  const format = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
  return format.test(str);
}
