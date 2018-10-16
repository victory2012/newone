import http from "./http";

export default {
  /* 登录 */
  login: (data) => {
    return http.post(`/login`, data);
  },
  /* 获取权限 */
  permissions: (data) => {
    return http.get(`/user/permissions/${data}`);
  },
  /* 获取短信验证码 */
  SMScode: (data) => {
    return http.post(`/login/sms/send`, data);
  },
  /* 验证短信验证的正确性 */
  SMSVertify: (data) => {
    return http.post(`/login/sms/verify`, data);
  },
  /* ----------------------------------- 电池列表 ---------------------------------------- */
  /* 电池拉黑 */
  betteryBlack: (data) => {
    return http.put(`device`, data);
  },
  /* 电池详情 */
  betteryDetails: (data) => {
    return http.get(`/battery_group/${data}`);
  },
  /* 电池绑定 */
  betteryBind: (data) => {
    return http.put(`/host/bind`, data);
  },
  /* 获取电池组规格列表 */
  batteryGroupSpecif: () => {
    return http.get("/dic?type=Norm&categoryId=2");
  },
  /* 获取电池单体型号列表 */
  batterySingleModel: () => {
    return http.get("/dic?type=SingleModel&categoryId=2");
  },
  /* 添加电池组型号、规格、单体规格 */
  batteryADDALL: (data) => {
    return http.post("/dic", data);
  },
  /* 删除电池 */
  batteryDetele: (data) => {
    return http.delete(`/host/${data}`);
  },
  /* 电池解绑 */
  batteryUnBind: (data) => {
    return http.put(`host/unbind/${data}`);
  },
  /* 电池批量上传 */
  batteryUpLoadAll: (data) => {
    return http.post(`/battery_group/batch`, data);
  },
  /* 电池列表 */
  batteryList: (data) => {
    return http.get("/battery_group", data);
  },

  /* 添加电池组 */
  batteryAddGroup: (data) => {
    return http.post("/battery_group", data);
  },

  /* 电池型号列表 */
  batteryModelList: () => {
    return http.get("/dic?type=Model&categoryId=2");
  },
  /* 获取电池组客户企业表 */
  purchaseNames: () => {
    return http.get("/company/purchase_names");
  },
  /* 获取未绑定设备 */
  DeviceList: () => {
    return http.get("/device/code?status=0&bindingStatus=0");
  },
  /* 获取生产企业列表 */
  manufacturerNames: () => {
    return http.get(`company/manufacturer_names`);
  },
  /* ----------------------------------- 电池列表结束 ---------------------------------------- */
  overviewCount: () => {
    return http.get(`/battery_group/count`);
  },
  overviewCompany: () => {
    return http.get(`/battery_group/sub_companies/count`);
  },
  overviewModel: () => {
    return http.get(`/battery_group/model/count`);
  },
  overviewProvence: () => {
    return http.get(`/battery_group/province/count`);
  },
  /* ----------------------------------- 概览结束 ---------------------------------------- */
  /* 获取所有设备的告警数据 */
  alarmData: (data) => {
    return http.get(`/battery_group_event`, data);
  },
  /* 获取设备的告警 详情 */
  allAlarmData: (data) => {
    return http.get(`/battery_group_event/${data}`);
  },
  /* 黑名单（设备 && 电池） */
  deviceBlackList: (data) => {
    return http.get("device", data);
  },
  /* 运行状况 */
  /* 获取电池 info 信息 */
  batteryGroupInfo: (data) => {
    return http.get(`/battery_group/${data}/info`);
  },
  /* 获取电量 */
  batteryCapacity: (data) => {
    return http.get(`/battery_group/${data}/capacity`);
  },
  /* 发送设备地址 到后台 */
  sendAddress: (data) => {
    return http.put(`battery_group/address`, data);
  },
  /* 实时页面 获取过去四个小时的数据 */
  realData: (hostId, device, startTime, endTime) => {
    return http.get(`/battery_group/${hostId}/${device}/data?startTime=${startTime}&endTime=${endTime}`);
  },
  /* 获取历史数据 */
  historyData: (hostId, device, startTime, endTime) => {
    return http.get(`/battery_group/${hostId}/${device}/data2?startTime=${startTime}&endTime=${endTime}`);
  },
  /* 历史告警 */
  historyAlarm: (hostId, startTime, endTime, data) => {
    return http.get(`/battery_group_event?hostId=${hostId}&startTime=${startTime}000000&endTime=${endTime}235959`, data);
  },
  /* 历史补水 */
  historyFluid: (hostId, device, data) => {
    return http.get(`/battery_group/${hostId}/${device}/fluid`, data);
  },
  /* 单个设备 告警数据 */
  singleAlarm: (hostId, pageData) => {
    return http.get(`/battery_group_event?hostId=${hostId}`, pageData);
  },

  /* 创建用户 */
  createUser: (data) => {
    return http.post("/user", data);
  },

  /* 创建管理员 */
  createCompany: (data) => {
    return http.post("/company/manufacturer", data);
  },

  /* 创建管理员 */
  createPurchaser: (data) => {
    return http.post("/company/purchaser", data);
  }
};
