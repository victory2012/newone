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
  UTCTime: (str) => {
    let yy = str.substring(0, 4);
    let mm = str.substring(4, 6);
    let day = str.substring(6, 8);
    let hour = str.substring(8, 10);
    let minute = str.substring(10, 12);
    let seconds = str.substring(12, 14);
    let utc = `${yy}-${mm}-${day} ${hour}:${minute}:${seconds} UTC`;
    return this.a.dateFomat(utc);
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
    let nowTime = this.a.dateFomat(now);
    return this.a.toUTCTime(nowTime);
  },
  getFourHours: () => {
    let now = new Date().getTime();
    let yestoday = Number(now) - (4 * 60 * 60 * 1000);
    let yesTime = this.a.dateFomat(yestoday);
    return this.a.toUTCTime(yesTime);
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
    console.log(data);
    let res = data.toString();
    if (res.indexOf('年') > 0 || res.indexOf('月') > 0 || res.indexOf('日') > 0 || res.length < 7 || res.length > 11) {
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
  hhmmss: (str) => {
    let timeDate = new Date(str);
    let hours = timeDate.getHours();
    let minute = timeDate.getMinutes();
    let second = timeDate.getSeconds();
    hours = hours < 10 ? `0${hours}` : hours;
    minute = minute < 10 ? `0${minute}` : minute;
    second = second < 10 ? `0${second}` : second;
    return `${hours}:${minute}:${second}`;
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
  year2year: (start, end) => {
    let startdate = new Date(start);
    let enddate = new Date(end);

    let startyear = startdate.getFullYear() - 1;
    let startMonth = startdate.getMonth() + 1;
    let startday = startdate.getDate();

    let endyear = enddate.getFullYear() - 1;
    let endMonth = enddate.getMonth() + 1;
    let endday = enddate.getDate();

    endMonth = endMonth < 10 ? `0${endMonth}` : endMonth;
    endday = endday < 10 ? `0${endday}` : endday;
    startMonth = startMonth < 10 ? `0${startMonth}` : startMonth;
    startday = startday < 10 ? `0${startday}` : startday;
    return {
      startTime: `${startyear}${startMonth}${startday}000000`,
      endTime: `${endyear}${endMonth}${endday}235959`
    };
  },
  m2m: (start, end) => {
    let startdate = new Date(start).getTime();
    let enddate = new Date(end).getTime();
    let different = enddate - startdate;
    let prev = startdate - different;
    return {
      startTime: `${this.a.sortTime(prev)}000000`,
      endTime: `${this.a.sortTime(startdate)}235959`
    };
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
  },
  RexTime: (str) => {
    let start = str.replace(/-/g, "");
    let starts = start.replace(/:/g, "");
    let startss = starts.replace(/ /g, "");
    return startss;
  },
  toUTCTime: (data) => {
    let res = new Date(data).toISOString();
    let res1 = res.replace(/-/g, '');
    let res2 = res1.replace(/T/g, '');
    let res3 = res2.replace(/:/g, '');
    return res3.substr(0, 14);
  },
  TimeSconds: (str) => {
    let yy = str.substring(0, 4);
    let mm = str.substring(4, 6);
    let day = str.substring(6, 8);
    let hour = str.substring(8, 10);
    let minute = str.substring(10, 12);
    let seconds = str.substring(12, 14);
    let utc = `${yy}-${mm}-${day} ${hour}:${minute}:${seconds} UTC`;
    return new Date(utc).getTime();
  }
};
