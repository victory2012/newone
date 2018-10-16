<template>
  <div class="alarmTable">
    <!-- <div class="addBtns">
      <div class="items" @click="alarmSeting">
        <img src="../../../static/img/alarm-set.png" alt="">
        <p>告警设置</p>
      </div>
    </div> -->
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column type="index" align="center" label="序号" width="50">
      </el-table-column>
      <el-table-column prop="createTime" align="center" label="告警发生时间" width="180">
      </el-table-column>
      <el-table-column prop="items" align="center" label="告警项目">
      </el-table-column>
      <el-table-column prop="thresholdValue" align="center" label="告警阈值">
      </el-table-column>
      <el-table-column prop="actualValue" align="center" label="实际值">
      </el-table-column>
      <el-table-column prop="hostCode" align="center" label="电池组编号">
      </el-table-column>
      <el-table-column prop="content" align="center" label="告警内容" width="190">
      </el-table-column>
      <el-table-column prop="hierarchy" align="center" label="告警层级">
      </el-table-column>
      <el-table-column prop="levels" align="center" label="告警级别">
      </el-table-column>
      <el-table-column align="center" label="详情" width="80">
        <template slot-scope="scope">
          <el-button @click.native.prevent="handleClick(scope.row)" type="text">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="sizes, prev, pager, next" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="详细信息" :visible.sync="details" width="770px">
      <div class="detailCenter">
        <table>
          <tr>
            <td class="titles">告警发生时间</td>
            <td>
              <p>{{rowObj.createTime}}</p>
            </td>
            <td class="titles">电池组编号</td>
            <td>
              <p>{{rowObj.hostCode}}</p>
            </td>
          </tr>
          <tr>
            <td class="titles">告警值</td>
            <td>
              <p>{{rowObj.actualValue}}</p>
            </td>
            <td class="titles">告警项目</td>
            <td>
              <p>{{rowObj.items}}</p>
            </td>
          </tr>
          <tr>
            <td class="titles">告警层级</td>
            <td>
              <p>{{rowObj.hierarchy}}</p>
            </td>
            <td class="titles">告警级别</td>
            <td>
              <p>{{rowObj.levels}}</p>
            </td>
          </tr>
          <tr>
            <td class="titles">告警内容 </td>
            <td colspan="3">
              <p>{{rowObj.content}}</p>
            </td>
          </tr>
          <tr>
            <td class="titles">客户</td>
            <td>
              <p>{{rowObj.companyName}}</p>
            </td>
            <td class="titles">位置</td>
            <td>
              <p>{{rowObj.address}}</p>
            </td>
          </tr>
          <tr>
            <td class="titles">液位</td>
            <td>
              <p>{{rowObj.fluidLevel}}</p>
            </td>
            <td class="titles">温度</td>
            <td>
              <p>{{rowObj.temperature}}</p>
            </td>
          </tr>
          <tr>
            <td class="titles">电压</td>
            <td>
              <p>{{rowObj.voltage}}</p>
            </td>
            <td class="titles">电流</td>
            <td>
              <p>{{rowObj.current}}</p>
            </td>
          </tr>
        </table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="details = false">确 定</el-button>
        <!-- <el-button size="small" type="primary" @click="details = false">确 定</el-button> -->
      </div>
    </el-dialog>

  </div>
</template>
<script>
import utils from "@/utils/utils";
import lnglatTrabsofor from "@/utils/longlatTransfor";

export default {
  props: ["hostObj"],
  data() {
    return {
      loading: true,
      total: 0,
      pageSize: 10,
      currentPage: 1,
      settings: false,
      batteryForm: {},
      batteryFormRules: {},
      details: false,
      rowObj: {},
      tableData: []
    };
  },
  mounted() {
    // console.log(this.hostId);
    // this.hostId = this.$route.query.hostId;
    this.getAlarmData();
  },
  methods: {
    handleClick(row) {
      this.rowObj = row;
      this.$api.allAlarmData(row.dataId).then(res => {
        console.log(res);
        if (res.data && res.data.code === 0) {
          let result = res.data.data;
          if (result) {
            let position = [result.gcjLongitude, result.gcjLatitude];
            lnglatTrabsofor(position, callRes => {
              this.rowObj.fluidLevel =
                result.fluidLevel === 0 ? "正常" : "异常";
              this.rowObj.temperature = result.temperature;
              this.rowObj.voltage = result.voltage;
              this.rowObj.current = result.current;
              this.rowObj.address = callRes.formattedAddress || "--";
              this.details = true;
            });
          }
        }
      });
    },
    alarmSeting() {
      this.settings = true;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getAlarmData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAlarmData();
    },
    getAlarmData() {
      this.loading = true;
      let pageObj = {
        pageSize: this.pageSize,
        pageNum: this.currentPage
      };
      this.$api.singleAlarm(this.hostObj.hostId, pageObj).then(res => {
        console.log(res);
        this.loading = false;
        if (res.data && res.data.code === 0) {
          let result = res.data.data;
          if (result) {
            this.total = result.total;
            this.tableData = [];
            if (result.pageData.length > 0) {
              result.pageData.forEach(key => {
                // key.alarmtime = utils.fomats(key.time);
                key.levels = utils.level(key.level);
                key.hierarchy = key.hierarchy === "Group" ? "整组" : "单体";
                key.items = utils.item(key.item);
                if (key.item === "Fluid") {
                  key.thresholdValue = "-";
                  key.actualValue = "异常";
                }
                this.tableData.push(key);
              });
            }
          }
        }
      });
    },
    dialogClosed() {
      this.batteryForm = {};
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
        width: 86px;
        background: #ffffff;
        text-align: right;
      }
    }
  }
}
.addBtns {
  text-align: right;
  padding-right: 40px;
  padding-bottom: 20px;
  .items {
    display: inline-block;
    width: 56px;
    text-align: center;
    font-size: 13px;
    cursor: pointer;
    img {
      margin-bottom: 10px;
    }
  }
}
.alarmTable {
  padding: 24px;
  background: #ffffff;
  .page {
    padding-top: 20px;
    text-align: right;
  }
}
</style>
