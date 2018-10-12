export default {
  /* 采购企业管理员 */
  custormAdmin: () => {
    let permis = {
      info: true,
      runState: true,
      recovery: true,
      alarmDatas: true,
      historyData: true,
      alarm: true
    };
    return permis;
  },
  /* 采购企业用户 */
  custormPer: () => {
    let permis = {
      info: true,
      runState: true,
      recovery: true,
      alarmDatas: true,
      historyData: true
    };
    return permis;
  },
  /* 生产企业用户 */
  productPer: () => {
    let permis = {
      info: true,
      runState: true,
      recovery: false,
      alarmDatas: true,
      historyData: true
    };
    return permis;
  },
};
