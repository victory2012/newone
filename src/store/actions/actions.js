export default {
  updateCountAsync(store, data) {
    setTimeout(() => {
      store.commit('updateCount', data.num);
    }, data.time);
  },
  getBatteryModel() {
    this.$axios.get('/dic/user_dic?dicKey=model&categoryId=2').then(res => {
      console.log(res);
      if (res.data && res.data.code === 0) {
        // this.Modeloptions = res.data.data;
        this.commit('SETBATTERYMODEL', res.data.data);
      }
    });
  }
};
