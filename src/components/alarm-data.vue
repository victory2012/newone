<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" align="center" label="序号" width="50">
      </el-table-column>
      <el-table-column prop="createTime" align="center" label="告警发生时间">
      </el-table-column>
      <el-table-column prop="items" align="center" label="告警项目">
      </el-table-column>
      <el-table-column prop="thresholdValue" align="center" label="告警阈值">
      </el-table-column>
      <el-table-column prop="actualValue" align="center" label="实际值">
      </el-table-column>
      <el-table-column prop="hostCode" align="center" label="电池组编号">
      </el-table-column>
      <el-table-column prop="content" align="center" label="告警内容">
      </el-table-column>
      <el-table-column prop="hierarchy" align="center" label="告警层级">
      </el-table-column>
      <el-table-column prop="levels" align="center" label="告警级别">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import utils from "@/utils/utils";

export default {
  props: {
    alarmData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentPage: 1,
      total: 0,
      tableData: this.alarmData
    };
  },
  watch: {
    alarmData: {
      handler: function(vals) {
        this.tableData = vals;
      },
      deep: true
    }
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>
