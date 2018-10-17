<template>
  <div class="alarmTable">
    <div class="select">
      <div class="item">
        <el-button size="small" @click="search" type="primary">确定</el-button>
        <el-button size="small" @click="clearAll" plain>清空</el-button>
      </div>
      <div class="item">
        <el-select size="small" style="width:100%" v-model="alarm.level" placeholder="告警级别">
          <el-option v-for="item in levelArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="item">
        <el-select size="small" style="width:100%" v-model="alarm.hierarchy" placeholder="告警层级">
          <el-option v-for="item in hierarchyArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="item">
        <el-select size="small" style="width:100%" v-model="alarm.item" placeholder="告警项目">
          <el-option v-for="item in alarmArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="item">
        <el-input size="small" style="width:100%" v-model="alarm.code" placeholder="电池组编号"></el-input>
      </div>
      <div class="item">
        <el-date-picker size="small" style="width: 100%" v-model="alarm.endTime" type="date" placeholder="结束时间">
        </el-date-picker>
      </div>
      <div class="item">
        <el-date-picker size="small" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%" v-model="alarm.startTime" type="date" placeholder="开始时间">
        </el-date-picker>
      </div>

    </div>
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
      <el-table-column prop="content" align="center" label="告警内容" width="240">
      </el-table-column>
      <el-table-column prop="hierarchy" align="center" label="告警层级">
      </el-table-column>
      <el-table-column prop="levels" align="center" label="告警级别">
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
  data() {
    return {
      loading: true,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      rowObj: {},
      details: false,
      tableData: [],
      alarm: {},
      hierarchyArr: [
        {
          id: "",
          name: "全部"
        },
        {
          id: "Group",
          name: "整组"
        },
        {
          id: "Single",
          name: "单体"
        }
      ],
      levelArr: [
        {
          id: "",
          name: "全部"
        },
        {
          id: 1,
          name: "高"
        },
        {
          id: 2,
          name: "中"
        },
        {
          id: 3,
          name: "低"
        }
      ],
      alarmArr: [
        {
          id: "",
          name: "全部"
        },
        {
          id: "Voltage",
          name: "电压"
        },
        {
          id: "Current",
          name: "电流"
        },
        {
          id: "Temperature",
          name: "温度"
        },
        {
          id: "Fluid",
          name: "液位"
        }
      ]
    };
  },
  mounted() {
    this.getListData();
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
            // this.rowObj.fluidLevel = result.fluidLevel === 0 ? "正常" : "异常";
            // this.rowObj.temperature = result.temperature;
            // this.rowObj.voltage = result.voltage;
            // this.rowObj.current = result.current;
            // this.rowObj.address = lnglatTrabsofor(position);
            // this.details = true;
          }
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getListData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getListData();
    },
    search() {
      this.currentPage = 1;
      this.getListData();
    },
    clearAll() {
      this.currentPage = 1;
      this.alarm = {};
      this.getListData();
    },
    getListData() {
      this.loading = true;
      let pageObj = {
        pageSize: this.pageSize,
        pageNum: this.currentPage
      };
      if (this.alarm.startTime) {
        pageObj.startCreateTime = this.alarm.startTime;
      }
      if (this.alarm.endTime) {
        pageObj.endCreateTime = utils.creatTimeEnd(this.alarm.endTime);
      }
      if (this.alarm.item) {
        pageObj.item = this.alarm.item;
      }
      if (this.alarm.code) {
        pageObj.code = this.alarm.code;
      }

      if (this.alarm.level) {
        pageObj.level = this.alarm.level;
      }
      if (this.alarm.hierarchy) {
        pageObj.hierarchy = this.alarm.hierarchy;
      }
      this.$api.alarmData(pageObj).then(res => {
        this.loading = false;
        if (res.data && res.data.code === 0) {
          let result = res.data.data;
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
.select {
  margin-bottom: 30px;
  width: 85%;
  display: flex;
  flex-direction: row-reverse;
  .item {
    flex: 1;
    padding: 10px 5px;
  }
}
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
</style>
