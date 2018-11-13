// export default () => {
//   return [{
//     icon: '../../static/img/add-admin_not.png',
//     default: '../../static/img/add-admin.png',
//     text: '创建生产企业管理员',
//     role: '1'
//   }, {
//     icon: '../../static/img/add-user_not.png',
//     default: '../../static/img/add-user.png',
//     text: '添加客户企业管理员',
//     role: '2'
//   }, {
//     icon: '../../static/img/add-admin_not.png',
//     default: '../../static/img/add-admin.png',
//     text: '添加生产企业普通管理员',
//     role: '3'
//   }, {
//     icon: '../../static/img/add-user_not.png',
//     default: '../../static/img/add-user.png',
//     text: '添加普通管理员',
//     role: '4'
//   }];
// };
let addPlat = [
  {
    icon: '../../../static/img/add-admin_not.png',
    default: '../../../static/img/add-admin.png',
    text: 'useMsg.add.manufacturer', // '创建生产企业管理员',
    role: '1'
  }
];
/* eslint-disable */
let manfictor = [
  {
    icon: '../../../static/img/add-user_not.png',
    default: '../../../static/img/add-user.png',
    text: 'useMsg.add.customer', // '添加客户企业管理员',
    role: '2'
  },
  {
    icon: '../../../static/img/add-admin_not.png',
    default: '../../../static/img/add-admin.png',
    text: 'useMsg.add.cusNoraml', // '添加本企业用户',
    role: '3'
  }
];

let createUser = [
  {
    icon: '../../../static/img/add-admin_not.png',
    default: '../../../static/img/add-admin.png',
    text: 'useMsg.add.cusNoraml', // '添加本企业用户',
    role: '3'
  }
];
export default {
  getPlat: () => addPlat,
  getProduct: () => manfictor,
  getCreateUser: () => createUser
};
