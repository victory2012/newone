export default {
  test(store) {
    return store.loginData;
  },
  setStorage(state, data) {
    state.loginData = data;
    sessionStorage.setItem('loginData', data);
  },
  removeStorage(state) {
    state.loginData = null;
    sessionStorage.removeItem('loginData');
  },
  setTokenStorage(state, token) {
    state.token = token;
    sessionStorage.setItem('token', token);
  },
  setUserRole(state, userRoles) {
    state.userRoles = userRoles;
    sessionStorage.setItem('userRoles', userRoles);
  },
  removeTokenStorage(state) {
    state.token = null;
    sessionStorage.removeItem('token');
  },
  GET_MAP_DATA(state, data) {
    state.mapData = data;
  },
  /* 控制创建公司的组件显示 */
  triggerManfictor(state) {
    state.manfictor = !state.manfictor;
  },
  /* 控制创建公司的组件显示 */
  triggerCustom(state) {
    state.custom = !state.custom;
  },
  /* 控制创建公司的组件显示 */
  triggerAddBattery(state) {
    state.addBattery = !state.addBattery;
  },
  SETBATTERYMODEL(state, data) {
    state.batteryModel = data;
  }
};
