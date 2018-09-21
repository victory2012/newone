export default function permissionFun() {
  let role = JSON.parse(JSON.parse(sessionStorage.getItem('userRoles')));
  let userData = JSON.parse(sessionStorage.getItem("loginData"));
  let permissions = {
    type: "",
    AddBatteries: true, // 电池登记
    info: true, // 基础信息
    runState: true, // 运行状况
    monitoring: true, // 主动监测
    historyData: true, // 历史数据
    alarmDatas: true, // 告警数据 （单个电池的告警）
    alarm: true, // 告警事件（全部的电池告警）
    deleteBattery: true, // 删除电池
    addblack: true, // 添加黑名单
    recovery: true, // 回复拉黑电池,
    sameAnalysis: true, // 同一电池单元的数据分析
    sameBatch: true, // 同批次不同电池单元的数据分析
    personalInfo: true, // 个人信息维护
    threshold: true, // 告警阈值
    notice: true, // 告警通知,
    addCompany: true, // 创建企业用户
    deleteCompany: true, // 删除企业用户
    modifyPermissions: true, // 修改权限，
    addAdmin: true, // 添加管理员
    deleteAdmin: true, // 删除管理员
  };
  if (role == null) {
    if (userData.type === 1) {
      permissions.type = "plat";
      permissions.AddBatteries = false;
      permissions.info = false;
      permissions.runState = false;
      permissions.recovery = false;
      permissions.deleteBattery = false;
      permissions.addCompany = false;
      permissions.deleteCompany = false;
      permissions.addAdmin = false;
      permissions.deleteAdmin = false;
      permissions.notice = false;
      permissions.threshold = false;
    }
    if (userData.type === 2 && userData.layerName === "生产企业") {
      permissions.type = "manufactur";
    }
    if (userData.type === 2 && userData.layerName === "采购企业") {
      permissions.type = "purchase";
      permissions.AddBatteries = false;
      permissions.alarmSetting = false;
      permissions.addblack = false;
      permissions.recovery = false;
      permissions.sameAnalysis = false; // 同一电池单元的数据分析
      permissions.sameBatch = false; // 同批次不同电池单元的数据分析
      permissions.addAdmin = false;
      permissions.deleteAdmin = false;
    }
    if (userData.type === 3 && userData.layerName === "生产企业") {
      permissions.type = "manufacturUser";
      permissions.alarmSetting = false;
      permissions.addblack = false;
      permissions.recovery = false;
      permissions.notice = false;
      permissions.threshold = false;
      permissions.addCompany = false;
      permissions.deleteCompany = false;
      permissions.modifyPermissions = false;
      permissions.addAdmin = false;
      permissions.deleteAdmin = false;
    }
    if (userData.type === 3 && userData.layerName === "采购企业") {
      permissions.type = "purchaseUser";
      permissions.AddBatteries = false;
      permissions.alarmSetting = false;
      permissions.alarm = false;
      permissions.addblack = false;
      permissions.recovery = false;
      permissions.sameAnalysis = false; // 同一电池单元的数据分析
      permissions.sameBatch = false; // 同批次不同电池单元的数据分析
      permissions.threshold = false;
      permissions.addCompany = false;
      permissions.deleteCompany = false;
      permissions.modifyPermissions = false;
      permissions.addAdmin = false;
      permissions.deleteAdmin = false;
    }
  } else {
    // permissions.type = "purchaseUser";
    permissions.AddBatteries = role.AddBatteries;
    permissions.info = role.info;
    permissions.runState = role.runState;
    permissions.monitoring = role.monitoring;
    permissions.historyData = role.historyData;
    permissions.alarm = role.alarm;
    permissions.sameAnalysis = role.sameAnalysis;
    permissions.sameBatch = role.sameBatch;
    permissions.personalInfo = role.personalInfo;
    permissions.alarmDatas = role.alarmDatas;
  }
  console.log(permissions);
  return permissions;
}
