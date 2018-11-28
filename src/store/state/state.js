const userData = sessionStorage.getItem('loginData');
export default {
  loginData: null, // 用户登录信息
  token: null, // 用户的token
  userData: userData ? JSON.parse(userData) : {},
  mapData: '',
  manfictor: false,
  custom: false,
  addBattery: false,
  batteryModel: null,
  userRoles: null,
  cardData: '', // 概览 统计数据
  batteryDetailsShow: false, // 是否显示电池详情框
  batteryDetailsData: '', // 电池详情 数据
  addUserText: '',
  batCustomOpts: '', // 客户企业名称
  GroupModelOpts: '', // 电池型号
  deviceIdOpts: '', // 设备编号
  singleBatteryOpts: '', // 电池组额定电压
  batGroupSpecifOpts: '', // 电池组规格
  permissions: '', // 用户权限,
  companyArr: []
};
