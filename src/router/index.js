import Vue from 'vue';
/* eslint-disable */
import Router from 'vue-router';

/* eslint-disable */
Vue.use(Router);
const Login = () =>
  import(/* webpackChunkName: "login" */ `../login/login.vue`);
const Home = () => import(/* webpackChunkName: "home" */ `../layout/index.vue`);
const batteryList = () =>
  import(/* webpackChunkName: "User" */ `../views/batteryList/batteryList.vue`);
const Run = () =>
  import(/* webpackChunkName: "Run" */ `../views/runState/run-state.vue`);
const Contrast = () =>
  import(/* webpackChunkName: "Contrast" */ '../views/compare/contrast.vue');
const Alarm = () =>
  import(/* webpackChunkName: "Alarm" */ '../views/alarm/alarm.vue');
const User = () =>
  import(/* webpackChunkName: "User" */ '../views/user/user.vue');
const Devicelist = () =>
  import(/* webpackChunkName: "device" */ '../views/device/device-list.vue');
const deviceBlacklist = () =>
  import(/* webpackChunkName: "Black" */ '../views/deviceBlack/back-list.vue');
const batteryBlacklist = () =>
  import(/* webpackChunkName: "batteryBlack" */ '../views/batteryBlack/blackList.vue');
const LevelUp = () =>
  import(/* webpackChunkName: "Level" */ '../views/levelup/upgrading.vue');
// const batteryBlack = () => import(/* webpackChunkName: "batteryBlack" */ '../views/batteryBlack/blackList.vue');
const batteryModel = () =>
  import(/* webpackChunkName: "batteryModel" */ '../views/threshold/battery-model.vue');
const Company = () =>
  import(/* webpackChunkName: "Company" */ '../views/threshold/company.vue');
const Receive = () =>
  import(/* webpackChunkName: "Receive" */ '../views/notice/notice-person.vue');
const AddUser = () =>
  import(/* webpackChunkName: "AddUser" */ '../views/notice/addperson.vue');
const Outer = () =>
  import(/* webpackChunkName: "Outer" */ '../views/notice/outer.vue');
const UserInfo = () =>
  import(/* webpackChunkName: "UserInfo" */ '../views/user-info/user.vue');
const Password = () =>
  import(/* webpackChunkName: "Password" */ '../views/user-info/password.vue');
const deviceRealData = () =>
  import(/* webpackChunkName: "deviceRealData" */ '../views/device/deviceReal.vue');
const overviewComponent = () =>
  import(/* webpackChunkName: "overviewComponent" */ '../views/overview/overview.vue');
const StockComponent = () =>
  import(/* webpackChunkName: "StockComponent" */ '../views/Stock/stock.vue');
const RepairComponent = () =>
  import(/* webpackChunkName: "StockComponent" */ '../views/gps/repair.vue');

/* eslint-disable */
export default new Router({
  routes: [
    {
      path: '',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/overview',
      component: Home,
      children: [
        {
          path: '',
          component: overviewComponent
        },
        {
          path: '/battery/run',
          component: Run
        },
        {
          path: '/battery',
          component: batteryList
        },
        {
          path: '/overview',
          name: 'overview',
          component: overviewComponent
        },
        {
          path: '/battery/compare',
          component: Contrast
        },
        {
          path: '/battery/alarm',
          component: Alarm
        },
        {
          path: '/user',
          component: User
        },
        {
          path: '/device/list',
          component: Devicelist
        },
        {
          path: '/device/defriend',
          component: deviceBlacklist
        },
        {
          path: '/device/up',
          component: LevelUp
        },
        {
          path: '/battery/defriend',
          component: batteryBlacklist
        },
        {
          path: '/set/model',
          component: batteryModel
        },
        {
          path: '/set/company',
          component: Company
        },
        {
          path: '/set/receive',
          component: Receive
        },
        {
          path: '/set/user',
          component: AddUser
        },
        {
          path: '/set/outer',
          component: Outer
        },
        {
          path: '/user-info',
          component: UserInfo
        },
        {
          path: '/user-pwd',
          component: Password
        },
        {
          path: '/device-real',
          component: deviceRealData
        },
        {
          path: '/battery/stock',
          component: StockComponent
        },
        {
          path: '/gps/repair',
          component: RepairComponent
        }
      ]
    }
  ]
});
