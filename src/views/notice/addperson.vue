<template>
  <div class="container">
    <p class="tips">（最多添加128人）</p>
    <el-table v-loading="loading" :data="tableData" style="width: 100%" :highlight-current-row="true">
      <el-table-column prop="account" align="center" label="用户名">
      </el-table-column>
      <el-table-column prop="role" align="center" label="账户身份">
      </el-table-column>
      <el-table-column prop="createTime" align="center" label="创建时间">
      </el-table-column>
      <el-table-column prop="state" align="center" label="状态">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click.native.prevent="cancleClick(scope.row)" type="text" size="small">
            取消
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="sizes, prev, pager, next" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import utils from "@/utils/utils";

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: true,
      tableData: []
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    handleClick() {},
    /* 取消添加 */
    cancleClick(row) {
      console.log(row);
      this.$axios
        .delete(`/company_global_internal_notice/${row.id}`)
        .then(res => {
          if (res.data && res.data.code === 0) {
            this.$message({
              type: "success",
              message: res.data.msg
            });
            this.personList();
          }
        });
    },
    personList() {
      let pageObj = {
        pageSize: this.pageSize,
        pageNum: this.currentPage
      };
      this.$axios.get("/company_global_internal_notice", pageObj).then(res => {
        console.log(res);
        this.loading = false;
        if (res.data && res.data.code === 0) {
          let result = res.data.data;
          this.total = result.total;
          this.tableData = [];
          result.pageData.forEach(key => {
            key.role = utils.accountType(key.type);
            key.state = "已添加";
            this.tableData.push(key);
          });
        }
      });
    }
  },
  mounted() {
    this.personList();
  }
};
</script>
<style lang="scss" scoped>
.container {
  padding: 24px;
  background: #ffffff;
}
.page {
  padding-top: 20px;
  text-align: right;
}
.tips {
  font-size: 14px;
  color: #484848;
}
</style>
