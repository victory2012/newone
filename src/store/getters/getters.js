export default {
  getUserLoginData(state) {
    if (state.loginData) {
      return JSON.parse(state.loginData);
    }
    return '';
  },
  manfictor(state) {
    return state.manfictor;
  },
  getPermision(state) {
    if (state.permissions) {
      return JSON.parse(state.permissions);
    }
  },
  /* 获取用户角色类型 */
  getLayerName(state) {
    if (state.loginData) {
      return `${JSON.parse(state.loginData).layerName}`;
    }
    return '';
  },
  userText(state) {
    return state.addUserText;
  },
  /* 客户企业名称 */
  getCustomOpts(state) {
    if (state.batCustomOpts) {
      return JSON.parse(state.batCustomOpts);
    }
    return '';
  },
  /* 电池型号 */
  getGroupModelOpts(state) {
    if (state.GroupModelOpts) {
      return JSON.parse(state.GroupModelOpts);
    }
    return '';
  },
  /* 设备编号 */
  getDeviceIdOpts(state) {
    if (state.deviceIdOpts) {
      return JSON.parse(state.deviceIdOpts);
    }
    return '';
  },
  /* 电池组额定电压 */
  getSingleBatteryOpts(state) {
    if (state.singleBatteryOpts) {
      return JSON.parse(state.singleBatteryOpts);
    }
    return '';
  },
  /* 电池组规格 */
  getBatGroupSpecifOpts(state) {
    if (state.batGroupSpecifOpts) {
      return JSON.parse(state.batGroupSpecifOpts);
    }
    return '';
  },
  /* 电池组规格 */
  getBatteryDetailShow(state) {
    return state.batteryDetailsShow;
  },
  BATTERYDETAILDATA(state) {
    if (state.batteryDetailsData) {
      return JSON.parse(state.batteryDetailsData);
    }
    return {};
  },
  GETCARDDATA(state) {
    return state.cardData;
  },
  /* 生产企业列表 */
  COMPANYARRAY(state) {
    return state.companyArr;
  },
  /* 生产企业列表 */
  getUserData(state) {
    console.log('state', state);
    return state.userData;
  }
};
