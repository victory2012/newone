<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" align="center" label="序号" width="100">
      </el-table-column>
      <el-table-column prop="time" align="center" label="补水时间">
      </el-table-column>
      <el-table-column prop="temperature" align="center" label="补水温度">
      </el-table-column>
      <el-table-column prop="thresholdValue" align="center" label="距上次补水时长">
      </el-table-column>
      <el-table-column prop="hostCode" align="center" label="位置">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    liquidData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentPage: 2,
      tableData: this.liquidData
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
  methods: {
    // handleClick(data) {
    //   data.forEach(key => {
    //     // key.alarmtime = utils.fomats(key.time);
    //     key.levels = utils.level(key.level);
    //     key.hierarchy = key.hierarchy === "Group" ? "整组" : "单体";
    //     key.items = utils.item(key.item);
    //     this.alarmData.push(key);
    //   });
    // }
  }
};
</script>
<style lang="scss" scoped>
</style>
