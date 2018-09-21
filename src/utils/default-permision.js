export default {
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
  productPer: () => {
    let permis = {
      info: true,
      runState: true,
      recovery: true,
      alarmDatas: true,
      historyData: true
    };
    return permis;
  },
};
