<template>
  <div class="alarmTable">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="deviceId" align="center" label="设备编号">
      </el-table-column>
      <el-table-column prop="enterpriseName" align="center" label="企业名称">
      </el-table-column>
      <!-- <el-table-column prop="regState" align="center" label="设备注册状态">
      </el-table-column> -->
      <el-table-column prop="bindingName" align="center" label="电池绑定状态">
      </el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="recoverBlack(scope.row)" type="text">
            恢复
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="sizes, prev, pager, next" :total="1000">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage: 1,
      tableData: []
    };
  },
  methods: {
    handleClick() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    recoverBlack(row) {
      let deviceObj = {
        id: row.deviceId,
        status: 0
      };
      this.$api.betteryBlack(deviceObj).then(res => {
        console.log(res);
        if (res.data && res.data.code === 0) {
          this.$message({
            type: "success",
            message: res.data.msg
          });
          this.getBatteryList();
        }
      });
    },
    /* 获取电池列表 */
    getBatteryList() {
      let loginData = JSON.parse(utils.getStorage("loginData"));
      let options = {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        status: -1
      };
      this.$axios.get("/battery_group", options).then(res => {
        this.tableData = [];
        if (res.data && res.data.code === 0) {
          let result = res.data.data;
          this.total = result.total;
          // AdminRoles
          result.pageData.forEach(key => {
            key.onLine = key.onlineStatus === 0 || key.onlineStatus === null;
            if (key.deviceId) {
              key.hasbind = false;
              key.deviceCode = key.deviceCode;
              key.bindingName = "已绑定";
            } else {
              key.bindingName = "未绑定";
              key.hasbind = true;
              key.deviceCode = "无";
            }
            // if (loginData.type === 1) {
            //   key.isPlat = true;
            // } else {
            //   key.canDelete = false;
            //   if (this.AdminRoles.deleteBattery && key.hasbind) {
            //     key.canDelete = true;
            //   } else {
            //     key.canDelete = false;
            //   }
            // }
            this.tableData.push(key);
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.alarmTable {
  padding: 24px;
  background: #ffffff;
  .page {
    padding-top: 20px;
    text-align: right;
  }
}
</style>
