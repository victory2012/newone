<template>
  <div class="alarmTable">
    <!-- <div class="addBtns">
      <div class="items" @click="alarmSeting">
        <img src="../../../static/img/alarm-set.png" alt="">
        <p>告警设置</p>
      </div>
    </div> -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" align="center" label="序号" width="50">
      </el-table-column>
      <el-table-column prop="createTime" align="center" label="告警发生时间" width="150">
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
              <p>{{rowObj.voltage}}</p>
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
    <el-dialog title="告警设置" :visible.sync="settings" @closed="dialogClosed" width="600px">
      <div class="detailCenter">
        <div class="temp">
          <el-button type="primary" plain size="small">恢复模板</el-button>
        </div>
        <el-form :model="batteryForm" :rules="batteryFormRules" ref="batteryForm">
          <el-row :gutter="60">
            <el-col :span="12">
              <el-form-item label="单体充电电压上限阈值(V)" prop="singleMaxChargeVoltage">
                <el-input-number controls-position="right" size="small" v-model="batteryForm.singleMaxChargeVoltage" style="width:194px;"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单体放电电压下限阈值(V)" prop="singleMinDischargeVoltage">
                <el-input-number controls-position="right" size="small" v-model.number="batteryForm.singleMinDischargeVoltage" style="width:194px;"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="12">
              <el-form-item label="整组充电电压上限阈值(V)" prop="maxChargeVoltage">
                <el-input-number controls-position="right" size="small" v-model="batteryForm.maxChargeVoltage" style="width:194px;"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="整组放电电压下限阈值(V)" prop="minDischargeVoltage">
                <el-input-number controls-position="right" size="small" v-model.number="batteryForm.minDischargeVoltage" style="width:194px;"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="12">
              <el-form-item label="充电电流上限阈值系数" prop="maxChargeCurrent">
                <el-input-number controls-position="right" size="small" v-model.number="batteryForm.maxChargeCurrent" style="width:194px;"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="放电电流上限阈值系数" prop="minChargeCurrent">
                <el-input-number controls-position="right" size="small" v-model.number="batteryForm.minChargeCurrent" style="width:194px;"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="12">
              <el-form-item label="充电温度上限阈值(℃)" prop="maxChargeTemperature">
                <el-input-number controls-position="right" size="small" v-model.number="batteryForm.maxChargeTemperature" style="width:194px;"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="充电温度下限阈值(℃)" prop="minChargeTemperature">
                <el-input-number controls-position="right" size="small" v-model.number="batteryForm.minChargeTemperature" style="width:194px;"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="12">
              <el-form-item label="放电温度上限阈值(℃)" prop="maxDischargeTemperature">
                <el-input-number controls-position="right" size="small" v-model.number="batteryForm.maxDischargeTemperature" style="width:194px;"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="放电温度下限阈值(℃)" prop="minDischargeTemperature">
                <el-input-number controls-position="right" size="small" v-model.number="batteryForm.minDischargeTemperature" style="width:194px;"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="12">
              <el-form-item label="补水超限天数" prop="maxFluidOverDays">
                <el-input-number controls-position="right" size="small" v-model.number="batteryForm.maxFluidOverDays" style="width:194px;"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- <el-form-item label="监测设备编号（选填）" prop="deviceId">
                <el-input size="small" v-model.number="batteryForm.batteryVoltage" auto-complete="off"></el-input>
              </el-form-item> -->
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="12">
              <el-form-item label="充电容量上限阈值系数" prop="maxChargeCapacity">
                <el-input-number controls-position="right" size="small" v-model.number="batteryForm.maxChargeCapacity" style="width:194px;"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="充电容量下限阈值系数" prop="minChargeCapacity">
                <el-input-number controls-position="right" size="small" v-model.number="batteryForm.minChargeCapacity" style="width:194px;"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="settings = false">确 定</el-button>
        <el-button size="small" type="primary" @click="settings = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import utils from "@/utils/utils";

export default {
  data() {
    return {
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
    this.deviceId = this.$route.query.deviceId;
    this.getAlarmData();
  },
  methods: {
    handleClick(row) {
      this.details = true;
      this.rowObj = row;
      this.$axios.get(`/battery_group_event/${row.dataId}`).then(res => {
        console.log(res);
        if (res.data && res.data.code === 0) {
          let result = res.data.data;
          if (result) {
            this.rowObj.fluidLevel = result.fluidLevel;
            this.rowObj.temperature = result.temperature;
            this.rowObj.voltage = result.voltage;
            this.rowObj.current = result.current;
          }
        }
      });
    },
    alarmSeting() {
      this.settings = true;
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    getAlarmData() {
      let pageObj = {
        pageSize: this.pageSize,
        pageNum: this.currentPage
      };
      this.$axios
        .get(`/battery_group_event/${this.deviceId}`, pageObj)
        .then(res => {
          console.log(res);
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
        width: 120px;
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
