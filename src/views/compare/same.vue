<template>
  <div>
    <div class="top">
      <h2 class="textAlain title">比较数据</h2>
      <div class="textAlain">
        <div class="compare-add addone" v-show="contrastData">
          <p>电池编号1: {{chooseObj.code}}</p><br />
        </div>
        <div class="compare-add addone" v-show="contrastDatas">
          <p v-for="(tag, index) in stacks1" :key="tag.hostId">电池编号{{index+1}}: {{tag.code}}</p>
          <!-- <p>电池编号2: {{stacks1[1].code}}</p> -->
        </div>
        <div @click="openTable" class="compare-add">
          添加比较
        </div>
      </div>
    </div>
    <div class="timeCenter">
      <div class="timeBar">
        <span class="lables">从</span>
        <el-date-picker class="queryTime" size="small" v-model="start" type="date" placeholder="选择日期"></el-date-picker>
        <span class="lable">至</span>
        <el-date-picker class="queryTime" size="small" v-model="end" type="date" placeholder="选择日期"></el-date-picker>
        <el-select class="timeSelect queryTime" @change="changeTime" size="small" v-model="timevalue" placeholder="请选择时间范围">
          <el-option v-for="item in weekOption" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-show="actived == 'same'" class="timeSelect queryTime" size="small" clearable v-model="contrastWay" placeholder="请选择对比方式">
          <el-option v-for="item in compare" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-button @click="sureBtnSearch" class="queryBtn" size="small" type="primary">确定</el-button>
      </div>
    </div>
    <div class="chart">
      <com-chart :loading="chartloading" :chartData="dataArr" :chartBarData="summary"></com-chart>
    </div>

    <el-dialog title="添加比较" width="800px" :visible.sync="tableVisible">
      <div class="TopWrapper">
        <div class="item">最多可选
          <span style="color:#71bfdb">{{chooseLen}}</span>项 设备ID：
          <el-tag v-for="tag in stacks1" :key="tag.hostId+new Date()" @close="closeTags(tag)" closable :type="''">
            {{tag.code}}
          </el-tag>
        </div>

        <div class="item2">
          <el-input size="small" @change="remoteMethod" placeholder="请输入内容" suffix-icon="el-icon-search" v-model="searchCont">
          </el-input>
          <!-- <el-select v-model="searchCont" filterable clearable remote placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading">
              <el-option v-for="item in searchList" :key="item.id" :label="item.code" :value="item.id">
              </el-option>
            </el-select> -->
        </div>
      </div>
      <el-table :data="gridData" v-loading="loading">
        <el-table-column property="code" label="电池编号"></el-table-column>
        <el-table-column property="model" label="电池型号"></el-table-column>
        <el-table-column property="norm" label="电池组规格"></el-table-column>
        <el-table-column property="deviceCode" label="监测设备编号"></el-table-column>
        <el-table-column label="操作" width="55">
          <template slot-scope="scope">
            <el-checkbox @change="toggleCheck(scope.row)" v-model="scope.row.checked"></el-checkbox>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="8" layout="prev, pager, next" :total="total">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="tableVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="sureBtn">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import utils from "@/utils/utils";
// import _ from "lodash";
import comChart from "@/components/compare/compare-chart";

export default {
  components: {
    comChart
  },
  data() {
    return {
      contrastDatas: false,
      contrastWay: "",
      loading: false,
      chartloading: false,
      contrastData: false,
      total: 0,
      dataArr: {
        dataObjFirst: {
          timeArr: [],
          singleVoltage: [],
          temperature: [],
          voltage: [],
          current: []
        },
        dataObjSecond: {
          timeArr: [],
          singleVoltage: [],
          temperature: [],
          voltage: [],
          current: []
        }
      },
      chooseObj: {},
      dataObjFirst: {
        timeArr: [],
        singleVoltage: [],
        temperature: [],
        voltage: [],
        current: []
      },
      dataObjSecond: {
        timeArr: [],
        singleVoltage: [],
        temperature: [],
        voltage: [],
        current: []
      },
      batteryGroup: "",
      chooseLen: 1,
      searchCont: "",
      tableVisible: false,
      summary: {},
      now_eventSummary: {},
      last_eventSummary: {},
      now: {},
      last: {},
      currentPage: 1,
      actived: "same",
      start: utils.getWeek(),
      end: new Date(),
      timevalue: "week",
      compare: [
        {
          label: "同比",
          value: "year"
        },
        {
          label: "环比",
          value: "mounth"
        }
      ],
      weekOption: [
        {
          label: "最近一周",
          value: "week"
        },
        {
          label: "最近一月",
          value: "mounth"
        },
        {
          label: "最近三个月",
          value: "threemonth"
        },
        {
          label: "最近六个月",
          value: "sixmounth"
        },
        {
          label: "最近一年",
          value: "year"
        },
        {
          label: "全生命周期",
          value: "all"
        }
      ],
      searchList: [],
      gridData: [],
      stacks1: [],
      stacks2: [],
      compareTime: "" // 对比时间
    };
  },
  methods: {
    sureBtnSearch() {
      if (JSON.stringify(this.chooseObj) === "{}") {
        this.$message.error("请选择电池组");
        return;
      }
      if (this.stacks1.length !== 2 && this.actived === "diff") {
        this.$message.error("请选择电池组");
        return;
      }
      if (!this.start) {
        this.$message.error("请选择开始时间");
        return;
      }
      if (!this.end) {
        this.$message.error("请选择结束时间");
        return;
      }

      if (!this.contrastWay) {
        this.$message.error("请选择对比方式");
        return;
      }

      let nowStart = `${utils.sortTime(this.start)}000000`;
      let nowEnd = `${utils.sortTime(this.end)}235959`;

      if (this.contrastWay === "year") {
        this.compareTime = utils.year2year(this.start, this.end);
      } else {
        this.compareTime = utils.m2m(this.start, this.end);
      }
      this.getDataNow(nowStart, nowEnd);
    },
    changeTime() {
      if (this.timevalue === "week") {
        this.start = utils.getWeek();
      }
      if (this.timevalue === "mounth") {
        this.start = utils.getMouth();
      }
      if (this.timevalue === "threemonth") {
        this.start = utils.getThreeMounth();
      }
      if (this.timevalue === "sixmounth") {
        this.start = utils.getSixMounth();
      }
      if (this.timevalue === "year") {
        this.start = utils.getYear();
      }
      if (this.timevalue === "all") {
        this.start = "2000-01-01";
      }
    },
    getDataNow(startTime, endTime) {
      let deviceId = this.chooseObj.hostId;
      this.chartloading = true;
      this.$axios
        .get(
          `/battery_group/${deviceId}/data2?startTime=${startTime}&endTime=${endTime}`
        )
        .then(res => {
          console.log(res);
          this.dataObjFirst = {
            timeArr: [],
            singleVoltage: [],
            temperature: [],
            voltage: [],
            current: []
          };
          if (res.data && res.data.code === 0) {
            let result = res.data.data;
            result.list.forEach(key => {
              let timeArr = utils.TimeSconds(key.time); // 时间
              this.dataObjFirst.singleVoltage.push({
                name: timeArr,
                value: [timeArr, key.singleVoltage]
              }); // 单体电压
              this.dataObjFirst.temperature.push({
                name: timeArr,
                value: [timeArr, key.temperature]
              }); // 温度
              this.dataObjFirst.voltage.push({
                name: timeArr,
                value: [timeArr, key.voltage]
              }); // 电压
              this.dataObjFirst.current.push({
                name: timeArr,
                value: [timeArr, -key.current]
              }); // 电流
            });
            this.now = result.summary || {};
            this.now_eventSummary =
              result.eventSummary === null ? {} : result.eventSummary;
            if (this.compareTime.startTime && this.compareTime.endTime) {
              this.getDataPrev(
                this.compareTime.startTime,
                this.compareTime.endTime,
                deviceId
              );
            }
          }
        });
    },
    getDataPrev(startTime, endTime, id) {
      this.$axios
        .get(
          `/battery_group/${id}/data2?startTime=${startTime}&endTime=${endTime}`
        )
        .then(res => {
          console.log(res);
          this.dataObjSecond = {
            timeArr: [],
            singleVoltage: [],
            temperature: [],
            voltage: [],
            current: []
          };
          if (res.data && res.data.code === 0) {
            let result = res.data.data;
            result.list.forEach(key => {
              let timeArr = utils.TimeSconds(key.time); // 时间
              this.dataObjSecond.singleVoltage.push({
                name: timeArr,
                value: [timeArr, key.singleVoltage]
              }); // 单体电压
              this.dataObjSecond.temperature.push({
                name: timeArr,
                value: [timeArr, key.temperature]
              }); // 温度
              this.dataObjSecond.voltage.push({
                name: timeArr,
                value: [timeArr, key.voltage]
              }); // 电压
              this.dataObjSecond.current.push({
                name: timeArr,
                value: [timeArr, -key.current]
              }); // 电流
            });
            this.chartloading = false;
            this.last = result.summary || {};
            this.last_eventSummary =
              result.eventSummary === null ? {} : result.eventSummary;
            this.dataArr = {
              dataObjFirst: this.dataObjFirst,
              dataObjSecond: this.dataObjSecond
            };
            this.summary = {
              now: this.now,
              last: this.last,
              now_eventSummary: this.now_eventSummary,
              last_eventSummary: this.last_eventSummary
            };
            console.log(this.summary);
          }
        });
    },
    remoteMethod() {
      this.batteryGroup = this.searchCont;
      this.getBatteryList();
    },
    sureBtn() {
      this.tableVisible = false;
      if (this.actived === "same") {
        this.contrastData = true;
      }
      if (this.actived === "diff") {
        this.contrastDatas = true;
      }
    },
    handleCurrentChange() {},
    openTable() {
      this.stacks1 = [];
      this.tableVisible = true;
      this.gridData.forEach(key => {
        key.checked = false;
      });
    },
    toggleCheck(data) {
      // console.log(data);
      this.stacks1 = [];
      this.gridData.forEach(key => {
        key.checked = false;
      });
      data.checked = !data.checked;
      if (data.checked) {
        // this.chooseObj.push();
        this.stacks1.push(data);
        this.chooseObj = data;
        this.chooseLen = 1;
      }
    },
    closeTags(tag) {
      this.stacks1.splice(this.stacks1.indexOf(tag), 1);
    },
    /* 获取电池列表 */
    getBatteryList() {
      this.loading = true;
      let options = {
        pageSize: 8,
        pageNum: this.currentPage,
        companyName: "",
        batteryGroupOrDeviceCode: this.batteryGroup,
        modelId: "",
        bindingStatus: 1
      };
      this.$axios.get("/battery_group", options).then(res => {
        console.log(res);
        this.loading = false;
        this.gridData = [];
        if (res.data && res.data.code === 0) {
          let result = res.data.data;
          this.total = result.total;
          result.pageData.forEach(key => {
            key.checked = false;
            this.gridData.push(key);
          });
        }
      });
    }
  },
  mounted() {
    this.getBatteryList();
  }
};
</script>
<style lang="scss" scoped>
.textAlain {
  text-align: center;
}
.tabInfo {
  width: 330px;
  // height: 50px;
  background: #ffffff;
  font-size: 0;
  // line-height: 50px;
  padding: 15px 0;
  border-radius: 5px;
  margin: 0 auto;
  a {
    width: 158px;
    font-size: 14px;
    text-align: center;
    display: inline-block;
    cursor: pointer;
    color: #bfbfbf;
    &.active {
      color: #484848;
    }
  }
  .divider {
    margin: 0 6px;
    display: inline-block;
    height: 8px;
    width: 1px;
    background: #ccc;
  }
}
.titleTab {
  margin-bottom: 20px;
}
.top {
  margin-bottom: 15px;
  .title {
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 16px;
  }
  .compare-add {
    border: 1px dashed #898989;
    width: 232px;
    height: 120px;
    border-radius: 10px;
    font-weight: 550;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    cursor: pointer;
    margin: 0 24px;
    font-size: 12px;
    &.addone {
      border: none;
      flex-direction: column;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      vertical-align: middle;
      background: #ffffff;
    }
  }
}
.timeCenter {
  margin-bottom: 20px;
}
.timeBar {
  padding: 24px;
  background: #ffffff;
  // margin-bottom: 60px;
  .lables {
    display: inline-block;
    text-align: right;
    color: #484848;
    font-size: 13px;
    margin-right: 15px;
    width: 8.5%;
  }
  .lable {
    color: #484848;
    font-size: 13px;
    margin: 0 5px;
  }
  .queryTime {
    width: 16%;
  }
  .queryBtn {
    margin-left: 20px;
  }
}
.page {
  padding-top: 20px;
  text-align: right;
}
.TopWrapper {
  display: flex;
  justify-content: space-between;
  height: 32px;
  line-height: 32px;
  margin-bottom: 20px;
  .item {
    flex: 1;
  }
  .item2 {
    flex: 0 0 200px;
  }
}
</style>
