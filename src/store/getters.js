const getters = {
  isLogin: state => state.userInfo.isLogin,
  username: state => state.userInfo.username,
  shoppingCartIsNull: state => state.userInfo.shoppingCartIsNull,

  shoppingCart: state => state.shoppingCart.shoppingCart,
};

export default getters;
