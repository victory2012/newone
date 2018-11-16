<template>
  <router-view></router-view>
</template>
<script>
export default {
  methods: {}
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  list-style: none;
  font-style: normal;
  text-decoration: none;
  border: none;
  font-weight: normal;
  font-family: 'Helvetica Neue For Number', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
    'Helvetica Neue', Helvetica, Arial, sans-serif;
  outline: none;
}
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
.el-dialog__body {
  padding: 10px 40px;
}
// .el-form-item__label {
//   line-height: 30px;
// }
// .el-form-item {
//   margin-bottom: 10px;
// }
// .el-menu-item.is-active {
//   background-color: #71bfdb;
//   color: #ffffff;
// }
</style>
