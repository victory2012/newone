<template>
  <el-dialog title="详细信息" @close="closeDetails" :visible="getBatteryDetailShow" width="770px">
    <div class="detailCenter">
      <table>
        <tr>
          <td class="titles">电池组客户企业</td>
          <td>
            <p>{{BATTERYDETAILDATA.companyName}}</p>
          </td>
          <td class="titles">电池组编号</td>
          <td>
            <p>{{BATTERYDETAILDATA.code}}</p>
          </td>
        </tr>
        <tr>
          <td class="titles">电池组型号</td>
          <td>
            <p>{{BATTERYDETAILDATA.model}}</p>
          </td>
          <td class="titles">电池组规格</td>
          <td>
            <p>{{BATTERYDETAILDATA.norm}}</p>
          </td>
        </tr>
        <tr>
          <td class="titles">电池组额定电压</td>
          <td>
            <p>{{BATTERYDETAILDATA.voltage}}</p>
          </td>
          <td class="titles">电池组额定容量</td>
          <td>
            <p>{{BATTERYDETAILDATA.capacity}}</p>
          </td>
        </tr>
        <tr>
          <td class="titles">电池单体型号</td>
          <td colspan="3">
            <p>{{BATTERYDETAILDATA.singleModel}}</p>
          </td>
        </tr>
        <tr>
          <td class="titles">电池组生产日期</td>
          <td>
            <p>{{BATTERYDETAILDATA.manufacturerDate}}</p>
          </td>
          <td class="titles">电池组出厂日期</td>
          <td>
            <p>{{BATTERYDETAILDATA.productionDate}}</p>
          </td>
        </tr>
        <tr>
          <td class="titles">电池组质保期</td>
          <td>
            <p>{{BATTERYDETAILDATA.qualityGuaranteeDate}}</p>
          </td>
          <td class="titles">设备编号</td>
          <td>
            <p>{{BATTERYDETAILDATA.deviceCode || '无'}}</p>
          </td>
        </tr>
      </table>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="closeDetails">确 定</el-button>
      <!-- <el-button size="small" type="primary" @click="details = false">确 定</el-button> -->
    </div>
  </el-dialog>
</template>
<script>
/* eslint-disable */
import { mapGetters } from "vuex";

export default {
  props: {
    rowData: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(["getBatteryDetailShow", "BATTERYDETAILDATA"])
  },
  data() {
    return {
      rowObj: {}
    };
  },
  methods: {
    closeDetails() {
      this.$store.commit("SETBATTERYDETAIL", false);
    }
  }
};
</script>
<style lang="scss" scoped>
.detailCenter {
  width: 100%;
  .temp {
    text-align: right;
    margin-bottom: 10px;
  }
  table {
    width: 100%;
    tr {
      height: 56px;
    }
    td {
      p {
        background: #f2f2f2;
        height: 32px;
        line-height: 32px;
        border-radius: 3px;
        padding: 0 10px;
      }
      &.titles {
        padding-right: 15px;
        width: 110px;
        background: #ffffff;
        text-align: right;
      }
    }
  }
}
</style>
