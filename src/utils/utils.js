export default {
  accountType: (type) => {
    let str = type.toString();
    switch (str) {
      case "1":
        return "平台管理员";
      case "2":
        return "管理员";
      case "3":
        return "用户";
      default:
        return "未知";
    }
  },
  fomats: (str) => {
    let yy = str.substring(0, 4);
    let mm = str.substring(4, 6);
    let day = str.substring(6, 8);
    let hour = str.substring(8, 10);
    let minute = str.substring(10, 12);
    let seconds = str.substring(12, 14);
    return `${yy}-${mm}-${day} ${hour}:${minute}:${seconds}`;
  },
  dateFomat: (str) => {
    let timeDate = new Date(str);
    let year = timeDate.getFullYear();
    let mounth = timeDate.getMonth() + 1;
    let day = timeDate.getDate();
    let hours = timeDate.getHours();
    let minute = timeDate.getMinutes();
    let second = timeDate.getSeconds();
    mounth = mounth < 10 ? `0${mounth}` : mounth;
    day = day < 10 ? `0${day}` : day;
    hours = hours < 10 ? `0${hours}` : hours;
    minute = minute < 10 ? `0${second}` : second;
    second = second < 10 ? `0${second}` : second;
    return `${year}-${mounth}-${day} ${hours}:${minute}:${second}`;
  },
  setStorage: (key, data) => {
    sessionStorage.setItem(key, data);
  },
  getStorage: (key) => {
    return sessionStorage.getItem(key);
  },
  removeStorage: (key) => {
    sessionStorage.removeItem(key);
  },
  removeStorageAll: () => {
    sessionStorage.clear();
  },
  dateFomats: (str) => {
    let timeDate = new Date(str);
    let year = timeDate.getFullYear();
    let mounth = timeDate.getMonth() + 1;
    let day = timeDate.getDate();
    let hours = timeDate.getHours();
    let minute = timeDate.getMinutes();
    let second = timeDate.getSeconds();
    mounth = mounth < 10 ? `0${mounth}` : mounth;
    day = day < 10 ? `0${day}` : day;
    hours = hours < 10 ? `0${hours}` : hours;
    minute = minute < 10 ? `0${second}` : second;
    second = second < 10 ? `0${second}` : second;
    return `${year}${mounth}${day}${hours}${minute}${second}`;
  },
  getNowTime: () => {
    let now = new Date().getTime();
    return now;
  },
  getYestoday: () => {
    let now = new Date().getTime();
    let yestoday = Number(now) - 86400000;
    return yestoday;
  },
  getWeek: () => {
    let now = new Date().getTime();
    let yestoday = new Date(now.getTime() - (7 * 24 * 3600 * 1000));
    return yestoday;
  },
  getMouth: () => {
    let now = new Date().getTime();
    let yestoday = new Date(now.getTime() - (7 * 24 * 3600 * 1000));
    return yestoday;
  }
};
