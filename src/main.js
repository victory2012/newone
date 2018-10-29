// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import 'element-ui/lib/theme-chalk/index.css';
import XLSX from 'xlsx';
import '../static/icon/iconfont.css';
import './assets/css/iconfont.css';
import App from './App';
import router from './router';
import createStore from "./store/store";
import api from '@/api/index';
import i18n from "@/i18n";
import utils from "./utils/utils";
import ElementUI from './UI/element';
import {
  Message,
  MessageBox
} from "element-ui";

const isDebug_mode = process.env.NODE_ENV !== 'production'
Vue.config.debug = isDebug_mode
Vue.config.devtools = isDebug_mode
Vue.config.productionTip = isDebug_mode

/**
 * 导出数据报表xlsx文件
 * 已注入所有Vue实例，
 * template模板里调用 $$outputXlsxFile
 * 组件方法里调用 this.$outputXlsxFile
 * 例：this.$outputXlsxFile([['字段1', '字段2'], [1, 2]], [{wch: 10}, {wch: 50}], '测试导出') 得到 测试导出.xlsx 文件
 * 第一个参数是导出的数组对象，第二个参数是设置字段宽度，第三个参数是文件名
 */
// const outputXlsxFile = (data, wscols, xlsxName) => {
const outputXlsxFile = (data, xlsxName) => {
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, xlsxName);
  XLSX.writeFile(wb, `${xlsxName}.xlsx`);
};
ElementUI();
Vue.prototype.$outputXlsxFile = outputXlsxFile;
Vue.prototype.$api = api;
Vue.prototype.$message = Message;
Vue.prototype.$messageBox = MessageBox;

Vue.use(Vuex);
const store = createStore();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: {
    App
  },
  template: '<App/>',
  created() {
    let loginData = utils.getStorage('loginData') || "";
    let token = utils.getStorage('token') || "";
    let userRoles = utils.getStorage('userRoles') || "";
    this.$store.commit('setUserRole', userRoles);
    this.$store.commit('setStorage', loginData);
    this.$store.commit('setTokenStorage', token);
  }
});
