// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import XLSX from 'xlsx';
import '../static/icon/iconfont.css';
import App from './App';
import router from './router';
import createStore from "./store/store";
import axios from './api/http';
/**
 * 导出数据报表xlsx文件
 * 已注入所有Vue实例，
 * template模板里调用 $$outputXlsxFile
 * 组件方法里调用 this.$outputXlsxFile
 * 例：this.$outputXlsxFile([['字段1', '字段2'], [1, 2]], [{wch: 10}, {wch: 50}], '测试导出') 得到 测试导出.xlsx 文件
 * 第一个参数是导出的数组对象，第二个参数是设置字段宽度，第三个参数是文件名
 */
const outputXlsxFile = (data, wscols, xlsxName) => {
  /* convert state to workbook */
  const ws = XLSX.utils.aoa_to_sheet(data);
  // ws['!cols'] = wscols;
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, xlsxName);
  /* generate file and send to client */
  XLSX.writeFile(wb, `${xlsxName}.xlsx`);
};

Vue.prototype.$outputXlsxFile = outputXlsxFile;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Vuex);
const store = createStore();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  created() {
    this.$store.state.loginData = sessionStorage.getItem('loginData') || "";
    this.$store.state.token = sessionStorage.getItem('token') || "";
  }
});
