export default {
  getUserLoginData(state) {
    if (state.loginData) {
      return JSON.parse(state.loginData);
    }
    return "";
  },
  manfictor(state) {
    return state.manfictor;
  },
  /* 获取用户角色类型 */
  getUserType(state) {
    if (state.loginData) {
      return JSON.parse(state.loginData).type;
    }
    return "";
  },
  /* 获取用户角色类型 */
  getLayerName(state) {
    if (state.loginData) {
      return `${JSON.parse(state.loginData).layerName}`;
    }
    return "";
  },
  userText(state) {
    return state.addUserText;
  }
};
