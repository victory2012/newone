<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" align="center" label="序号" width="100">
      </el-table-column>
      <el-table-column prop="Replenishing" align="center" label="补水时间">
      </el-table-column>
      <el-table-column prop="temperature" align="center" label="补水温度">
      </el-table-column>
      <el-table-column prop="updateWater" align="center" label="距上次补水时长">
      </el-table-column>
      <el-table-column prop="address" align="center" label="位置">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import utils from "@/utils/utils";

export default {
  props: {
    liquidData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentPage: 1,
      tableData: this.liquidData,
      total: 0
    };
  },
  watch: {
    liquidData: {
      handler: function(vals) {
        this.tableData = vals;
      },
      deep: true
    }
  },
  mounted() {
    // this.getliquidData();
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>
