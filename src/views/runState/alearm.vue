<template>
  <div class="alarmTable">
    <div class="addBtns">
      <div class="items" @click="alarmSeting">
        <img src="../../../static/img/alarm-set.png" alt="">
        <p>告警设置</p>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="index" align="center" label="序号" width="100">
      </el-table-column>
      <el-table-column prop="alarmtime" align="center" label="告警发生时间" width="150">
      </el-table-column>
      <el-table-column prop="alarmProject" align="center" label="告警项目">
      </el-table-column>
      <el-table-column prop="batteryId" align="center" label="电池编号">
      </el-table-column>
      <el-table-column prop="batteryGroup" align="center" label="电池组编号">
      </el-table-column>
      <el-table-column prop="content" align="center" label="告警内容" width="200">
      </el-table-column>
      <el-table-column prop="hierarchy" align="center" label="告警层级">
      </el-table-column>
      <el-table-column prop="level" align="center" label="告警级别">
      </el-table-column>
      <el-table-column prop="address" align="center" label="详情" width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="handleClick(scope.row)" type="text">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="sizes, prev, pager, next" :total="100">
      </el-pagination>
    </div>
    <el-dialog title="详细信息" :visible.sync="details" width="770px">
      <div class="detailCenter">
        <table>
          <tr>
            <td class="titles">告警发生时间</td>
            <td>
              <p>$100</p>
            </td>
            <td class="titles">电池组编号</td>
            <td>
              <p>$100</p>
            </td>
          </tr>
          <tr>
            <td class="titles">电池编号</td>
            <td>
              <p>$100</p>
            </td>
            <td class="titles">告警项目</td>
            <td>
              <p>$100</p>
            </td>
          </tr>
          <tr>
            <td class="titles">告警层级</td>
            <td>
              <p>$100</p>
            </td>
            <td class="titles">告警级别</td>
            <td>
              <p>$100</p>
            </td>
          </tr>
          <tr>
            <td class="titles">告警内容 </td>
            <td colspan="3">
              <p>$100</p>
            </td>
          </tr>
          <tr>
            <td class="titles">客户</td>
            <td>
              <p>$100</p>
            </td>
            <td class="titles">位置</td>
            <td>
              <p>$100</p>
            </td>
          </tr>
          <tr>
            <td class="titles">液位</td>
            <td>
              <p>$100</p>
            </td>
            <td class="titles">温度</td>
            <td>
              <p>$100</p>
            </td>
          </tr>
          <tr>
            <td class="titles">电压</td>
            <td>
              <p>$100</p>
            </td>
            <td class="titles">电流</td>
            <td>
              <p>$100</p>
            </td>
          </tr>
        </table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="details = false">确 定</el-button>
        <!-- <el-button size="small" type="primary" @click="details = false">确 定</el-button> -->
      </div>
    </el-dialog>
    <el-dialog title="告警设置" :visible.sync="settings" width="600px">
      <div class="detailCenter">
        <el-form :model="batteryForm" :rules="batteryFormRules" ref="batteryForm">
          <el-row :gutter="60">
            <el-col :span="12">
              <el-form-item label="单体充电电压上限阈值(V)" prop="account">
                <el-input size="small" disabled v-model="batteryForm.account" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单体放电电压下限阈值(V)" prop="batCustom">
                <el-input size="small" v-model.number="batteryForm.batteryVoltage" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="12">
              <el-form-item label="整组充电电压上限阈值(V)" prop="groupNum">
                <el-input size="small" v-model="batteryForm.groupNum" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="整组放电电压下限阈值(V)" prop="batGroupModel">
                <el-input size="small" v-model.number="batteryForm.batteryVoltage" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="12">
              <el-form-item label="充电电流上限阈值系数" prop="batGroupSpecif">
                <el-input size="small" v-model.number="batteryForm.batteryVoltage" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="放电电流上限阈值系数" prop="batteryVoltage">
                <el-input size="small" v-model.number="batteryForm.batteryVoltage" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="12">
              <el-form-item label="充电温度上限阈值(℃)" prop="batteryCapacity">
                <el-input size="small" v-model.number="batteryForm.batteryCapacity" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="充电温度下限阈值(℃)" prop="singleBattery">
                <el-input size="small" v-model.number="batteryForm.batteryVoltage" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="12">
              <el-form-item label="放电温度上限阈值(℃)" prop="productDate">
                <el-date-picker size="small" style="width: 210px" v-model="batteryForm.productDate" type="date" placeholder="生产日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="放电温度下限阈值(℃)" prop="factoryDate">
                <el-date-picker size="small" style="width: 210px" v-model="batteryForm.factoryDate" type="date" placeholder="出厂日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="12">
              <el-form-item label="补水超限天数" prop="qualityDate">
                <el-date-picker size="small" style="width: 210px" v-model="batteryForm.qualityDate" type="date" placeholder="质保期">
                </el-date-picker>
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
              <el-form-item label="充电容量上限阈值系数" prop="qualityDate">
                <el-date-picker size="small" style="width: 210px" v-model="batteryForm.qualityDate" type="date" placeholder="质保期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="充电容量下限阈值系数" prop="deviceId">
                <el-input size="small" v-model.number="batteryForm.batteryVoltage" auto-complete="off"></el-input>
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
export default {
  data() {
    return {
      settings: false,
      batteryForm: {},
      batteryFormRules: {},
      details: false,
      currentPage: 1,
      tableData: [
        {
          index: "1",
          alarmtime: "2018-08-02 17:00:50",
          alarmProject: "液位",
          batteryId: "5F",
          batteryGroup: "200",
          content: "电解液位低，应该补水",
          hierarchy: "整组",
          level: "高"
        }
      ]
    };
  },
  methods: {
    handleClick() {
      this.details = true;
    },
    alarmSeting() {
      this.settings = true;
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>
<style lang="scss" scoped>
.detailCenter {
  width: 100%;
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
