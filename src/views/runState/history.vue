<template>
  <div class="history">
    <div class="timeBar">
      <span class="lables">从</span>
      <el-date-picker class="queryTime" size="small" v-model="start" type="date" placeholder="选择日期"></el-date-picker>
      <span class="lable">至</span>
      <el-date-picker class="queryTime" size="small" v-model="end" type="date" placeholder="选择日期"></el-date-picker>
      <el-select class="timeSelect queryTime" size="small" @change="changeTime" v-model="timevalue" placeholder="请选择">
        <el-option v-for="item in weekOption" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button @click="getChartData" class="queryBtn" size="small" type="primary">确定</el-button>
    </div>
    <echart-map :chartData="dataObj" :loading="loading"></echart-map>
    <div class="batteryChart">
      <div class="addbattery">
        <ul>
          <li>
            <p class="history_count_val">{{summary.cycle || 0}}</p>
            <p>电池循环次数</p>
          </li>
          <li>
            <p class="history_count_val">{{summary.chargeTimes || 0}}h</p>
            <p>充电时间</p>
          </li>
          <li>
            <p class="history_count_val">{{summary.dischargeTimes || 0}}h</p>
            <p>放电时间</p>
          </li>
          <li>
            <p class="history_count_val">{{summary.avgChargeDuration || 0}}h</p>
            <p>平均充电时间</p>
          </li>
          <li>
            <p class="history_count_val">{{summary.avgDischargeDuration || 0}}h</p>
            <p>平均放电时间</p>
          </li>
          <li>
            <p class="history_count_val">{{summary.fluidSupplementTimes || 0}}</p>
            <p>补水次数</p>
          </li>
          <li>
            <p class="history_count_val">{{summary.avgFluidSupplementDuration || 0}}h</p>
            <p>平均补水时长</p>
          </li>
        </ul>
      </div>
      <chart-pie :loading="loading" :peiData="peiObj"></chart-pie>
    </div>
    <div class="alarmTab">
      <div class="tabInfo">
        <a :class="{'active': active === 'alarm'}" @click="historAlarm">历史告警</a>
        <span class="divider"></span>
        <a :class="{'active': active === 'liquid'}" @click="historyLiquid">历史补水</a>
      </div>
    </div>
    <div class="tables">
      <i-alarm :alarmData="alarmData" v-show="active === 'alarm'"></i-alarm>
      <liquid :liquidData="liquidData" v-show="active === 'liquid'"></liquid>
      <div class="page">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" layout="prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </div>
    <div class="maps">
      <i-map :travelData="dataObj.positions"></i-map>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import AMap from "AMap";
import utils from "@/utils/utils";
import echartMap from "../../components/historyChart";
import iEchart from "../../components/echart";
import iAlarm from "../../components/alarm-data";
import iMap from "../../components/travel";
import chartPie from "../../components/echartPie";
import liquid from "../../components/alarm-liquid";

export default {
  components: {
    chartPie,
    echartMap,
    iEchart,
    iAlarm,
    iMap,
    liquid
  },
  data() {
    return {
      active: "alarm",
      hasgetData: false,
      loading: false,
      eventSummary: {},
      summary: {},
      peiObj: {
        eventSummary: {},
        summary: {}
      },
      dataObj: {
        timeArr: [],
        singleVoltage: [],
        temperature: [],
        voltage: [],
        current: [],
        positions: []
      },
      start: utils.getWeek(),
      end: new Date(),
      timevalue: "week",
      weekOption: [
        {
          value: "week",
          label: "最近一周"
        },
        {
          value: "mounth",
          label: "最近一月"
        },
        {
          value: "threemonth",
          label: "最近三个月"
        },
        {
          value: "sixmounth",
          label: "最近六个月"
        },
        {
          value: "year",
          label: "最近一年"
        },
        {
          value: "all",
          label: "全生命周期"
        }
      ],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      alarmData: [],
      liquidData: []
    };
  },
  mounted() {
    this.hostId = this.$route.query.hostId;
    // this.getChartData();
  },
  methods: {
    getChartData() {
      let startTime = utils.sortTime(this.start);
      let endTime = utils.sortTime(this.end);
      this.loading = true;
      this.$axios
        .get(
          `/battery_group/${
            this.hostId
          }/data2?startTime=${startTime}&endTime=${endTime}`
        )
        .then(res => {
          console.log(res);
          this.dataObj = {
            timeArr: [],
            singleVoltage: [],
            temperature: [],
            voltage: [],
            current: [],
            positions: []
          };
          if (res.data && res.data.code === 0) {
            let result = res.data.data;
            result.list.forEach(key => {
              // console.log(key);
              this.dataObj.timeArr.push(utils.fomats(key.time)); // 时间
              this.dataObj.singleVoltage.push(key.singleVoltage); // 单体电压
              this.dataObj.temperature.push(key.temperature); // 温度
              this.dataObj.voltage.push(key.voltage); // 电压
              this.dataObj.current.push(key.current); // 电流
              this.dataObj.positions.push([key.gcjLongitude, key.gcjLatitude]); // 电流
            });
            this.peiObj.eventSummary = result.eventSummary || {};
            this.peiObj.summary = result.summary || {};
            this.loading = false;

            this.eventSummary = result.eventSummary || {};
            this.summary = result.summary || {};
          }
        });
      this.getAlarmData();
    },
    changeTime() {
      console.log(this.timevalue);
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
    getAlarmData() {
      let startTime = utils.sortTime(this.start);
      let endTime = utils.sortTime(this.end);
      let pageObj = {
        pageSize: this.pageSize,
        pageNum: this.currentPage
      };
      this.$axios
        .get(
          `/battery_group_event?hostId=${
            this.hostId
          }&startTime=${startTime}&endTime=${endTime}`,
          pageObj
        )
        .then(res => {
          console.log(res);
          if (res.data && res.data.code === 0) {
            let result = res.data.data;
            if (result) {
              this.total = result.total;
              this.liquidData = [];
              if (result.pageData.length > 0) {
                this.liquidData = result.pageData;
              }
            }
          }
        });
    },
    getliquidData() {
      let startTime = utils.sortTime(this.start);
      let endTime = utils.sortTime(this.end);
      let pageObj = {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        startTime,
        endTime
      };
      this.$axios
        .get(`/battery_group/${this.hostId}/fluid`, pageObj)
        .then(res => {
          console.log(res);
          if (res.data && res.data.code === 0) {
            let result = res.data.data;
            if (result) {
              this.total = result.total;
              this.alarmData = [];
              if (result.pageData.length > 0) {
                this.liquidData = result.pageData;
              }
            }
          }
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAlarmData();
    },
    historAlarm() {
      this.active = "alarm";
    },
    historyLiquid() {
      this.active = "liquid";
      this.currentPage = 1;
      this.getliquidData();
    }
  }
};
</script>
<style lang="scss" scoped>
.history {
  box-sizing: border-box;
  border-radius: 5px;
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
      width: 21%;
    }
    .queryBtn {
      margin-left: 20px;
    }
  }
  .charts {
    box-sizing: border-box;
    padding: 24px;
    background: #ffffff;
    // margin-bottom: 20px;
    width: 100%;
    display: flex;
    .info {
      flex: 1;
      height: 400px;
    }
  }
  .batteryChart {
    background: #ffffff;
    padding: 24px;
  }
  .addbattery {
    background: #ffffff;
    padding: 24px 0;
    ul {
      display: flex;
      li {
        flex: 1;
        text-align: center;
        p {
          height: 19px;
          font-size: 15px;
          font-weight: 600;
          color: #484848;
          &.history_count_val {
            height: 24px;
            font-size: 18px;
            margin-bottom: 8px;
          }
        }
      }
    }
  }
  .circel {
    background: #ffffff;
    padding: 24px 0;
    display: flex;
    .circelInfo {
      flex: 1;
      height: 400px;
      .item-history_alarm_divider {
        box-sizing: border-box;
        height: 200px;
        border-left: 1px solid #d7d7d7;
        margin: 163px auto 0;
        margin-left: 140px;
        padding-left: 70px;
        padding-top: 74px;
        p {
          color: rgba(0, 0, 0, 0.65);
          font-size: 14px;
          &.times {
            height: 24px;
            font-size: 18px;
            font-weight: 600;
          }
        }
      }
    }
  }
  .alarmTab {
    margin: 20px;
    .tabInfo {
      width: 330px;
      background: #fff;
      padding: 15px 0;
      border-radius: 10px;
      margin: 0 auto;
      a {
        width: 152px;
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
  }
  .tables {
    background: #ffffff;
    padding: 24px;
    margin-bottom: 20px;
  }
  .maps {
    background: #ffffff;
    padding: 24px;
    height: 450px;
    .mapContent {
      width: 100%;
      height: 100%;
    }
  }
}
.pb {
  padding-bottom: 50px;
  border-bottom: 1px solid #d7d7d7;
  margin-bottom: 50px;
}
.pt {
  padding-top: 60px;
}
.page {
  padding-top: 20px;
  text-align: right;
}
</style>
