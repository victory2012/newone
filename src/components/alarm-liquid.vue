<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <!-- 序号 -->
      <el-table-column type="index" align="center" :label="$t('alarmList.serial')" width="100">
      </el-table-column>
      <!-- 补水时间 -->
      <el-table-column prop="Replenishing" align="center" :label="$t('history.fluidTime')">
      </el-table-column>
      <!-- 补水温度 -->
      <el-table-column prop="temperature" align="center" :label="$t('history.fluidTemp')">
      </el-table-column>
      <!-- 距上次补水时长 -->
      <el-table-column prop="updateWater" align="center" :label="$t('history.LengthOfYime')">
      </el-table-column>
      <!-- <el-table-column v-if="hasAddress" prop="address" align="center" label="位置">
      </el-table-column> -->
      <el-table-column align="center" :label="$t('alarmList.latLng')" width="380">
        <template slot-scope="scope">
          <el-button @click.native.prevent="getAdress(scope.row)" :disabled="scope.row.disabled" type="text">
            {{scope.row.address}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import utils from "@/utils/utils";
import lnglatTrabsofor from "@/utils/longlatTransfor";

export default {
  props: {
    liquidData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      currentPage: 1,
      tableData: this.liquidData,
      total: 0
    };
  },
  watch: {
    liquidData: {
      handler: function (vals) {
        this.tableData = vals;
      },
      deep: true
    }
  },
  mounted () {
    // this.getliquidData();
  },
  methods: {
    getAdress (row) {
      console.log(row);
      if (Math.abs(Number(row.gcjLongitude)) > 1 && Math.abs(Number(row.gcjLatitude)) > 1) {
        lnglatTrabsofor(row.position, callRes => {
          row.address = callRes.formattedAddress;
          row.disabled = true;
        });
      } else {
        row.address = "--";
        row.disabled = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
