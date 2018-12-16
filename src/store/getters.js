const getters = {
  isLogin: state => state.userInfo.isLogin,
  username: state => state.userInfo.username,

  shoppingCart: state => state.shoppingCart.shoppingCart,
};

export default getters;
