const daysInMonth = [
  [0],
  [31],
  [28],
  [31],
  [30],
  [31],
  [30],
  [31],
  [31],
  [30],
  [31],
  [30],
  [31]
];
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
    minute = minute < 10 ? `0${minute}` : minute;
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
    let yestoday = new Date(now - (7 * 24 * 3600 * 1000));
    return yestoday;
  },
  getMouth: () => {
    let date = new Date();
    let strYear = date.getFullYear();
    let strDay = date.getDate();
    let strMonth = date.getMonth() + 1;
    if (strYear % 4 === 0 && strYear % 100 !== 0) {
      daysInMonth[2] = 29;
    }
    if (strMonth - 1 === 0) {
      strYear -= 1;
      strMonth = 12;
    } else {
      strMonth -= 1;
    }
    strDay = daysInMonth[strMonth] >= strDay ? strDay : daysInMonth[strMonth];
    if (strMonth < 10) {
      strMonth = `0${strMonth}`;
    }
    if (strDay < 10) {
      strDay = `0${strDay}`;
    }
    return `${strYear}-${strMonth}-${strDay}`;
  },
  getThreeMounth: () => {
    let date = new Date();
    let strYear = date.getFullYear();
    let strDay = date.getDate();
    let strMonth = date.getMonth() + 1;
    if (strYear % 4 === 0 && strYear % 100 !== 0) {
      daysInMonth[2] = 29;
    }

    if (strMonth - 3 === 0) {
      strYear -= 1;
      strMonth = 12;
    } else if (strMonth - 3 === -1) {
      strYear -= 1;
      strMonth = 11;
    } else if (strMonth - 3 === -2) {
      strYear -= 1;
      strMonth = 10;
    } else {
      strMonth -= 3;
    }
    strDay = daysInMonth[strMonth] >= strDay ? strDay : daysInMonth[strMonth];
    if (strMonth < 10) {
      strMonth = `0${strMonth}`;
    }
    if (strDay < 10) {
      strDay = `0${strDay}`;
    }
    return `${strYear}-${strMonth}-${strDay}`;
  },
  getSixMounth: () => {
    let date = new Date();
    let strYear = date.getFullYear();
    let strDay = date.getDate();
    let strMonth = date.getMonth() + 1;
    if (strYear % 4 === 0 && strYear % 100 !== 0) {
      daysInMonth[2] = 29;
    }
    if (strMonth - 6 === 0) {
      strYear -= 1;
      strMonth = 12;
    } else if (strMonth - 6 === -1) {
      strYear -= 1;
      strMonth = 11;
    } else if (strMonth - 6 === -2) {
      strYear -= 1;
      strMonth = 10;
    } else if (strMonth - 6 === -3) {
      strYear -= 1;
      strMonth = 9;
    } else if (strMonth - 6 === -4) {
      strYear -= 1;
      strMonth = 8;
    } else if (strMonth - 6 === -5) {
      strYear -= 1;
      strMonth = 7;
    } else {
      strMonth -= 6;
    }
    strDay = daysInMonth[strMonth] >= strDay ? strDay : daysInMonth[strMonth];
    if (strMonth < 10) {
      strMonth = `0${strMonth}`;
    }
    if (strDay < 10) {
      strDay = `0${strDay}`;
    }
    return `${strYear}-${strMonth}-${strDay}`;
  },
  getYear: () => {
    let date = new Date();
    let strYear = date.getFullYear() - 1;
    let strDay = date.getDate();
    let strMonth = date.getMonth() + 1;
    if (strMonth < 10) {
      strMonth = `0${strMonth}`;
    }
    if (strDay < 10) {
      strDay = `0${strDay}`;
    }
    return `${strYear}-${strMonth}-${strDay}`;
  },
  checkDate: (data) => {
    if (data.indexOf('年') > 0 || data.indexOf('月') > 0 || data.indexOf('日') > 0 || data.length < 7 || data.length > 11) {
      return false;
    }
    return true;
  },
  yyyymmdd: (str) => {
    let timeDate = new Date(str);
    let year = timeDate.getFullYear();
    let mounth = timeDate.getMonth() + 1;
    let day = timeDate.getDate();
    mounth = mounth < 10 ? `0${mounth}` : mounth;
    day = day < 10 ? `0${day}` : day;
    return `${year}-${mounth}-${day}`;
  },
  level: (num) => {
    let Num = Number(num);
    switch (Num) {
      case 1:
        return "高";
      case 2:
        return "中";
      case 3:
        return "低";
      default:
        break;
    }
  },
  item: (str) => {
    switch (str) {
      case 'Voltage':
        return "电压";
      case 'Current':
        return "电流";
      case 'Temperature':
        return "温度";
      default:
        break;
    }
  },
  year2year: (end, type) => {
    let obj = {};
    // let startdate = new Date(start);
    let enddate = new Date(end);

    // let endyear = enddate.getFullYear();
    let endMonth = enddate.getMonth() + 1;

    let startMonth = enddate.getMonth() + 1;
    let startyear = enddate.getFullYear() - 1;
    let day = enddate.getDate();

    endMonth = endMonth < 10 ? `0${endMonth}` : endMonth;
    day = day < 10 ? `0${day}` : day;

    if (type === "week") {
      let result = `${startyear}-${startMonth}-${day}`;
      obj.start = this.a.sortTime(new Date(result).getTime() - (7 * 24 * 3600 * 1000));
      obj.end = this.a.sortTime(new Date(result).getTime());
    }
    if (type === "mounth") {
      if (startMonth === 0) {
        startyear -= 1;
        startMonth = 12;
      }
      startMonth = startMonth < 10 ? `0${startMonth}` : startMonth;
      obj.start = `${startyear}${startMonth}${day}`;
      obj.end = `${startyear}${endMonth}${day}`;
    }
    if (type === "threemonth") {
      if (startMonth - 2 === 0) {
        startyear -= 1;
        startMonth = 12;
      } else if (startMonth - 2 === -1) {
        startyear -= 1;
        startMonth = 11;
      } else if (startMonth - 2 === -2) {
        startyear -= 1;
        startMonth = 10;
      } else {
        startMonth -= 3;
      }
      startMonth = startMonth < 10 ? `0${startMonth}` : startMonth;
      obj.start = `${startyear}${startMonth}${day}`;
      obj.end = `${startyear}${endMonth}${day}`;
    }
    if (type === "sixmounth") {
      if (startMonth - 5 === 0) {
        startyear -= 1;
        startMonth = 12;
      } else if (startMonth - 5 === -1) {
        startyear -= 1;
        startMonth = 11;
      } else if (startMonth - 5 === -2) {
        startyear -= 1;
        startMonth = 10;
      } else if (startMonth - 5 === -3) {
        startyear -= 1;
        startMonth = 9;
      } else if (startMonth - 5 === -4) {
        startyear -= 1;
        startMonth = 8;
      } else if (startMonth - 5 === -5) {
        startyear -= 1;
        startMonth = 7;
      } else {
        startMonth -= 6;
      }
      startMonth = startMonth < 10 ? `0${startMonth}` : startMonth;

      obj.start = `${startyear}${startMonth}${day}`;
      obj.end = `${startyear}${endMonth}${day}`;
    }
    if (type === "year") {
      let startyears = startyear - 1;
      // let startMonths = startMonth;
      startMonth = startMonth < 10 ? `0${startMonth}` : startMonth;
      obj.start = `${startyears}${startMonth}${day}`;
      obj.end = `${startyear}${endMonth}${day}`;
    }
    return obj;
  },
  m2m: (start, end, type) => {
    let obj = {};
    let startdate = new Date(start);
    let enddate = new Date(end);

    let endyear = startdate.getFullYear();
    let endMonth = startdate.getMonth() + 1;

    let startMonth = startdate.getMonth();
    let startyear = startdate.getFullYear();
    let day = startdate.getDate();

    endMonth = endMonth < 10 ? `0${endMonth}` : endMonth;
    day = day < 10 ? `0${day}` : day;

    if (type === "week") {
      obj.start = this.a.sortTime(startdate.getTime() - (7 * 24 * 3600 * 1000));
      obj.end = this.a.sortTime(enddate.getTime() - (7 * 24 * 3600 * 1000));
    }
    if (type === "mounth") {
      if (startMonth === 0) {
        startyear -= 1;
        startMonth = 12;
      }
      startMonth = startMonth < 10 ? `0${startMonth}` : startMonth;
      obj.start = `${startyear}${startMonth}${day}`;
      obj.end = `${endyear}${endMonth}${day}`;
    }
    if (type === "threemonth") {
      if (startMonth - 2 === 0) {
        startyear -= 1;
        startMonth = 12;
      } else if (startMonth - 2 === -1) {
        startyear -= 1;
        startMonth = 11;
      } else if (startMonth - 2 === -2) {
        startyear -= 1;
        startMonth = 10;
      } else {
        startMonth -= 3;
      }
      startMonth = startMonth < 10 ? `0${startMonth}` : startMonth;
      obj.start = `${startyear}${startMonth}${day}`;
      obj.end = `${endyear}${endMonth}${day}`;
    }
    if (type === "sixmounth") {
      if (startMonth - 5 === 0) {
        startyear -= 1;
        startMonth = 12;
      } else if (startMonth - 5 === -1) {
        startyear -= 1;
        startMonth = 11;
      } else if (startMonth - 5 === -2) {
        startyear -= 1;
        startMonth = 10;
      } else if (startMonth - 5 === -3) {
        startyear -= 1;
        startMonth = 9;
      } else if (startMonth - 5 === -4) {
        startyear -= 1;
        startMonth = 8;
      } else if (startMonth - 5 === -5) {
        startyear -= 1;
        startMonth = 7;
      } else {
        startMonth -= 6;
      }
      startMonth = startMonth < 10 ? `0${startMonth}` : startMonth;

      obj.start = `${startyear}${startMonth}${day}`;
      obj.end = `${endyear}${endMonth}${day}`;
    }
    if (type === "year") {
      let startyears = startyear - 1;
      let startMonths = startMonth + 1;
      startMonths = startMonths < 10 ? `0${startMonths}` : startMonths;
      obj.start = `${startyears}${startMonths}${day}`;
      obj.end = `${endyear}${endMonth}${day}`;
    }
    return obj;
  },
  sortTime: (str) => {
    let timeDate = new Date(str);
    let year = timeDate.getFullYear();
    let mounth = timeDate.getMonth() + 1;
    let day = timeDate.getDate();
    mounth = mounth < 10 ? `0${mounth}` : mounth;
    day = day < 10 ? `0${day}` : day;
    return `${year}${mounth}${day}`;
  },
  zoomTime: (start, end) => {
    let startTime = new Date(start).getTime();
    let endTime = new Date(end).getTime();
    let days = endTime - startTime;
    return days;
  }
};
