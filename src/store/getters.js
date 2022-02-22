const getters = {
  sidebar: (state) => state.app.sidebar,
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  permission_addRoutes: (state) => state.permission.addRoutes
}
export default getters
