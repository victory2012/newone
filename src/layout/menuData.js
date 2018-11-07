// import _ from "lodash";
import {
  deepClone
} from "@/utils/functions";
import permissionFun from "../utils/valated";


/* eslint-disable */
const menu = [{
    text: "overview", // 概览
    link: "/overview",
    icon: "iconfont icon-allnormal",
  },
  {
    text: "batteryManage", // 电池管理
    link: "1",
    icon: "iconfont icon-dashboard",
    children: [{
        text: "batteryInfo", // 电池信息
        link: "11",
        children: [{
            text: "batteryList", // 电池列表
            link: "/battery"
          },
          {
            text: "defriend", // 恢复拉黑设备
            link: "/battery/defriend"
          },
          {
            text: "runStatus", // 运行状况
            link: "/battery/run"
          },
        ]
      },
      {
        text: "compare", // 数据对比
        link: "/battery/compare"
      },
      {
        text: "alarm", // 告警数据
        link: "/battery/alarm"
      }
    ]
  },
  {
    text: "setting", // 配置管理
    link: "2",
    icon: "iconfont icon-seting",
    children: [{
        text: "threshold", // 报警阈值
        link: "22",
        children: [{
            text: "sortByModel", // 按电池型号分类
            link: "/set/model"
          },
          {
            text: "sortByCompany", // 按企业全局分类
            link: "/set/company"
          }
        ]
      },
      {
        text: "WarningNotice", // 告警通知
        link: "23",
        children: [{
            text: "receiveList", // 告警接收人
            link: "/set/receive"
          },
          {
            text: "addReceive", // 已添加接收人
            link: "/set/user"
          },
          {
            text: "OuterReceive", // 外部告警接收人
            link: "/set/outer"
          }
        ]
      }
    ],
  },
  {
    text: "userManage", // 用户管理
    link: "/user",
    icon: "iconfont icon-user"
  },
  {
    text: "device", // 设备管理
    link: "3",
    icon: "iconfont icon-device",
    children: [{
        text: "deviceList", // 设备列表
        link: "/device/list"
      },
      {
        text: "deviceDefriend", // 恢复拉黑设备
        link: "/device/defriend"
      },
      // {
      //   text: "设备升级",
      //   link: "/device/up"
      // }
    ]
  }
];
console.log(menu);
let listData1 = deepClone(menu); // 生产企业管理员\
let listData5 = deepClone(menu); // 生产企业用户
let listData2 = deepClone(menu); // 平台管理员
let listData3 = deepClone(menu); // 电池采购企业管理员
let listData4 = deepClone(menu); // 电池采购企业用户

const Allocation = {
  text: "Allocation", // 电池调配
  link: "/battery/stock",
}
/* 数据对比 */
const dataContrast = {
  text: "compare", // 数据对比
  link: "/battery/compare"
}
/* 告警数据 */
const alarmData = {
  text: "alarmData", // 告警数据
  link: "/battery/alarm"
}

/* 告警数据 */
const BatteryDefriend = {
  text: "deviceDefriend", // 恢复拉黑设备
  link: "/battery/defriend"
}
export default {
  getManifactor: () => {
    let personRole = {}
    // listData1[3] = "";
    listData1[4].children[1] = "";
    listData1[4].children[2] = "";
    listData1[1].children[0].children[3] = Allocation;
    personRole.data = listData1;
    personRole.permissions = permissionFun();
    return personRole;
  },
  /* 生产企业用户 */
  getManifactorCus: () => {
    let personRole = {}
    if (!permissionFun().sameAnalysis) {
      listData5[1].children[1] = "";
    } else {
      listData5[1].children[1] = dataContrast
    }
    if (!permissionFun().allocation) {
      listData5[1].children[0].children[3] = "";
    } else {
      listData5[1].children[0].children[3] = Allocation;
    }
    if (!permissionFun().alarm) {
      listData5[1].children[2] = "";
    } else {
      listData5[1].children[2] = alarmData
    }
    if (!permissionFun().addblack) {
      listData5[1].children[0].children[1] = "";
    } else {
      listData5[1].children[0].children[1] = BatteryDefriend;
    }
    listData5[2] = "";
    listData5[4].children[1] = "";
    listData5[4].children[2] = "";
    personRole.data = listData5;
    personRole.permissions = permissionFun();
    return personRole;
  },
  /* 平台 */
  getPlat: () => {
    let personRole = {}
    listData2[1].children[0].children[1] = "";
    listData2[2] = "";
    personRole.data = listData2;
    personRole.permissions = permissionFun();
    return personRole;
  },
  /* 电池采购企业管理员 */
  purchaseAdmin: () => {
    let personRole = {}
    if (!permissionFun().sameAnalysis) {
      listData3[1].children[1] = "";
    } else {
      listData3[1].children[1] = dataContrast
    }
    if (!permissionFun().alarm) {
      listData3[1].children[2] = "";
    } else {
      listData3[1].children[2] = alarmData
    }
    if (!permissionFun().addblack) {
      listData3[1].children[0].children[1] = "";
    } else {
      listData3[1].children[0].children[1] = BatteryDefriend;
    }
    listData3[4] = "";
    personRole.data = listData3;
    personRole.permissions = permissionFun();
    return personRole;
  },
  /* 电池采购企业用户 */
  purchaseCus: () => {
    // console.log(permissionFun());
    let personRole = {}
    if (!permissionFun().sameAnalysis) {
      listData4[1].children[1] = "";
    } else {
      listData4[1].children[1] = dataContrast
    }
    if (!permissionFun().addblack) {
      listData4[1].children[0].children[1] = "";
    } else {
      listData4[1].children[0].children[1] = BatteryDefriend;
    }
    if (!permissionFun().alarm) {
      listData4[1].children[2] = "";
    } else {
      listData4[1].children[2] = alarmData
    }
    listData4[2] = "";
    listData4[4] = "";
    personRole.data = listData4;
    personRole.permissions = permissionFun();
    return personRole;
  }
}
