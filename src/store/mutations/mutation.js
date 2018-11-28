export default {
  test(store) {
    return store.loginData;
  },
  setStorage(state, data) {
    state.loginData = data;
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
  },
  SETAddUserText(state, data) {
    state.addUserText = data;
  },
  SETPERMISION(state, data) {
    state.permissions = data;
  },
  /* 客户企业名称 */
  SETCustomOpts(state, data) {
    state.batCustomOpts = data;
  },
  /* 电池型号 */
  SETGroupModelOpts(state, data) {
    state.GroupModelOpts = data;
  },
  /* 设备编号 */
  SETdeviceIdOpts(state, data) {
    state.deviceIdOpts = data;
  },
  /* 电池组额定电压 */
  SETsingleBatteryOpts(state, data) {
    state.singleBatteryOpts = data;
  },
  /* 电池组规格 */
  SETbatGroupSpecifOpts(state, data) {
    state.batGroupSpecifOpts = data;
  },
  /* 电池详情 */
  SETBATTERYDETAIL(state, data) {
    state.batteryDetailsShow = data;
  },
  /* 电池详情 */
  SETBATTERYDETAILDATA(state, data) {
    state.batteryDetailsData = data;
  },
  /* 概览 统计数据 */
  SETCARDDATA(state, data) {
    state.cardData = data;
  },

  /* 获取公司列表 */
  SETCOMPANY(state, data) {
    state.companyArr = data;
  },
  /* 获取公司列表 */
  SETuserData(state, data) {
    state.userData = data;
  }
};
