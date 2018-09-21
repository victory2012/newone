import _ from "lodash";
import permissionFun from "../utils/valated";

/* eslint-disable */
const menu = [{
    text: "电池管理",
    link: "1",
    icon: "iconfont icon-dashboard",
    children: [{
        text: "电池信息",
        link: "11",
        children: [{
            text: "电池列表",
            link: "/battery"
          },
          {
            text: "恢复拉黑设备",
            link: "/battery/defriend"
          },
          {
            text: "运行状况",
            link: "/battery/run"
          }
        ]
      },
      {
        text: "数据对比",
        link: "/battery/compare"
      },
      {
        text: "告警数据",
        link: "/battery/alarm"
      }
    ]
  },
  {
    text: "配置管理",
    link: "2",
    icon: "iconfont icon-manage",
    children: [{
        text: "报警阈值",
        link: "22",
        children: [{
            text: "按电池型号分类",
            link: "/set/model"
          },
          {
            text: "按企业全局分类",
            link: "/set/company"
          }
        ]
      },
      {
        text: "告警通知",
        link: "23",
        children: [{
            text: "告警接收人",
            link: "/set/receive"
          },
          {
            text: "已添加接收人",
            link: "/set/user"
          },
          {
            text: "外部告警接收人",
            link: "/set/outer"
          }
        ]
      }
    ],
  },
  {
    text: "用户管理",
    link: "/user",
    icon: "iconfont icon-user"
  },
  {
    text: "设备管理",
    link: "3",
    icon: "iconfont icon-device",
    children: [{
        text: "设备列表",
        link: "/device/list"
      },
      {
        text: "恢复拉黑设备",
        link: "/device/defriend"
      },
      {
        text: "设备升级",
        link: "/device/up"
      }
    ]
  }
];

let listData1 = _.cloneDeep(menu); // 生产企业管理员\
let listData5 = _.cloneDeep(menu); // 生产企业用户
let listData2 = _.cloneDeep(menu); // 平台管理员
let listData3 = _.cloneDeep(menu); // 电池采购企业管理员
let listData4 = _.cloneDeep(menu); // 电池采购企业用户

// let rolesData = permissionFun();
console.log("202222222222", menu);
export default {
  getManifactor: () => {
    let personRole = {}
    // listData1[3] = "";
    listData1[3].children[1] = "";
    listData1[3].children[2] = "";
    personRole.data = listData1;
    personRole.permissions = permissionFun();
    return personRole;
  },
  /* 生产企业用户 */
  getManifactorCus: () => {
    let personRole = {}
    if (!permissionFun().sameAnalysis && !permissionFun().sameBatch) {
      listData5[0].children[1] = "";
    }
    if (!permissionFun().runState) {
      listData5[0].children[0].children[2] = "";
    }
    if (!permissionFun().alarm) {
      listData5[0].children[2] = "";
    }
    listData5[1] = "";
    listData5[3].children[1] = "";
    listData5[3].children[2] = "";
    personRole.data = listData5;
    personRole.permissions = permissionFun();
    return personRole;
  },
  /* 平台 */
  getPlat: () => {
    let personRole = {}
    listData2[0].children[0].children[1] = "";
    listData2[1] = "";
    personRole.data = listData2;
    personRole.permissions = permissionFun();
    return personRole;
  },
  /* 电池采购企业管理员 */
  purchaseAdmin: () => {
    let personRole = {}
    if (!permissionFun().sameAnalysis && !permissionFun().sameBatch) {
      listData3[0].children[1] = "";
    }
    if (!permissionFun().alarm) {
      listData3[0].children[2] = "";
    }
    listData3[3] = "";
    personRole.data = listData3;
    personRole.permissions = permissionFun();
    return personRole;
  },
  /* 电池采购企业用户 */
  purchaseCus: () => {
    let personRole = {}
    if (!permissionFun().sameAnalysis && !permissionFun().sameBatch) {
      listData4[0].children[1] = "";
    }
    if (!permissionFun().alarm) {
      listData4[0].children[2] = "";
    }
    listData4[1] = "";
    listData4[3] = "";
    personRole.data = listData4;
    personRole.permissions = permissionFun();
    return personRole;
  }
}
