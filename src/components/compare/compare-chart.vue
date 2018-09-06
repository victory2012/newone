<template>
  <div class="bgFFF">
    <!-- <div class="btns">
      <el-button type="primary" icon="el-icon-remove-outline"></el-button>
      <el-button type="primary" icon="el-icon-circle-plus-outline"></el-button>
    </div> -->
    <div class="chartWarrp">
      <div class="chartInfo" id="echart1"></div>
      <div class="chartInfo" id="echart2"></div>
    </div>
    <div class="chartWarrp" style="margin-bottom: 50px;">
      <div class="chartInfo" id="echart3"></div>
      <div class="chartInfo" id="echart4"></div>
    </div>
    <div class="chartWarrp">
      <div class="chartInfo" id="echartBar1"></div>
      <div class="chartInfo" id="echartBar2"></div>
    </div>
    <div class="chartWarrp">
      <div class="chartInfo" id="echartBar3"></div>
      <div class="chartInfo" id="echartBar4"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import _ from "lodash";
// import utils from "@/utils/utils";
import options from "@/config/moreLine";
import BarOptions from "@/config/echartBarOptions";

export default {
  props: {
    chartData: {
      type: Object,
      default: () => {
        return {
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
        };
      }
    },
    chartBarData: {
      type: Object,
      default: () => {
        return {
          now: {},
          last: {},
          last_eventSummary: {},
          now_eventSummary: {}
        };
      }
    },
    loading: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  data() {
    return {
      timeArr: [],
      singleVoltage: [],
      temperature: [],
      voltage: [],
      current: [],
      myEcharts: null,
      isOptionAbnormal: false
    };
  },
  watch: {
    chartData: {
      handler: function(vals) {
        // console.log(vals);
        this.dataChange(vals);
      },
      deep: true
    },
    loading: {
      handler: function(vals) {
        this.showLoading(vals);
        console.log(vals);
      },
      deep: true
    },
    chartBarData: {
      handler: function(vals) {
        this.barDataChange(vals);
        console.log(vals);
      },
      deep: true
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let $echartsDOM1 = document.getElementById("echart1");
      let $echartsDOM2 = document.getElementById("echart2");
      let $echartsDOM3 = document.getElementById("echart3");
      let $echartsDOM4 = document.getElementById("echart4");
      let BarDOM1 = document.getElementById("echartBar1");
      let BarDOM2 = document.getElementById("echartBar2");
      let BarDOM3 = document.getElementById("echartBar3");
      let BarDOM4 = document.getElementById("echartBar4");
      this.myBarEcharts1 = echarts.init(BarDOM1);
      this.myBarEcharts2 = echarts.init(BarDOM2);
      this.myBarEcharts3 = echarts.init(BarDOM3);
      this.myBarEcharts4 = echarts.init(BarDOM4);
      this.lineEcharts1 = echarts.init($echartsDOM1);
      this.lineEcharts2 = echarts.init($echartsDOM2);
      this.lineEcharts3 = echarts.init($echartsDOM3);
      this.lineEcharts4 = echarts.init($echartsDOM4);

      echarts.connect([
        this.lineEcharts1,
        this.lineEcharts2,
        this.lineEcharts3,
        this.lineEcharts4
      ]);
      // console.log(myEcharts1);
      // console.log(echarts);
      this.lineEcharts1.on("datazoom", param => {
        console.log(param);
        // console.log(option.dataZoom.start);
        // console.log(myEcharts1.dataZoom.start);
      });
      window.onresize = () => {
        this.lineEcharts1.resize();
        this.lineEcharts2.resize();
        this.lineEcharts3.resize();
        this.lineEcharts4.resize();
        this.myBarEcharts1.resize();
        this.myBarEcharts2.resize();
        this.myBarEcharts3.resize();
        this.myBarEcharts4.resize();
      };
      this.dataChange(this.chartData);
      this.showLoading(this.loading);
      this.barDataChange({
        now: {},
        last: {},
        last_eventSummary: {},
        now_eventSummary: {}
      });
    },
    showLoading(curVal) {
      if (curVal) {
        this.lineEcharts1.showLoading();
        this.lineEcharts2.showLoading();
        this.lineEcharts3.showLoading();
        this.lineEcharts4.showLoading();
        this.myBarEcharts1.showLoading();
        this.myBarEcharts2.showLoading();
        this.myBarEcharts3.showLoading();
        this.myBarEcharts4.showLoading();
      } else {
        this.lineEcharts1.hideLoading();
        this.lineEcharts2.hideLoading();
        this.lineEcharts3.hideLoading();
        this.lineEcharts4.hideLoading();
        this.myBarEcharts1.hideLoading();
        this.myBarEcharts2.hideLoading();
        this.myBarEcharts3.hideLoading();
        this.myBarEcharts4.hideLoading();
      }
    },
    dataChange(datas) {
      console.log(datas);
      options.xAxis.data = datas.dataObjFirst.timeArr;

      let voltageOptions = _.cloneDeep(options);
      voltageOptions.title.text = "电压";
      // voltageOptions.series[0].name = "电压";
      // voltageOptions.series[1].name = "电压";
      voltageOptions.yAxis.axisLabel = "{value} v";
      voltageOptions.series[0].data = datas.dataObjFirst.voltage;
      voltageOptions.series[1].data = datas.dataObjSecond.voltage;
      this.lineEcharts1.setOption(voltageOptions);

      let singleVoltageOptions = _.cloneDeep(options);
      singleVoltageOptions.title.text = "单体电压";
      // singleVoltageOptions.series[0].name = "单体电压";
      // singleVoltageOptions.series[1].name = "单体电压";
      singleVoltageOptions.yAxis.axisLabel = "{value} v";
      singleVoltageOptions.series[0].data = datas.dataObjFirst.singleVoltage;
      singleVoltageOptions.series[1].data = datas.dataObjSecond.singleVoltage;
      this.lineEcharts2.setOption(singleVoltageOptions);

      let currentOptions = _.cloneDeep(options);
      currentOptions.title.text = "电流";
      // currentOptions.series[0].name = "电流";
      // currentOptions.series[1].name = "电流";
      currentOptions.yAxis.axisLabel = "{value} A";
      currentOptions.series[0].data = datas.dataObjFirst.current;
      currentOptions.series[1].data = datas.dataObjSecond.current;
      this.lineEcharts3.setOption(currentOptions);

      let temperatureOptions = _.cloneDeep(options);
      temperatureOptions.title.text = "温度";
      // temperatureOptions.series[0].name = "温度";
      // temperatureOptions.series[1].name = "温度";
      temperatureOptions.yAxis.axisLabel = "{value} ℃";
      temperatureOptions.series[0].data = datas.dataObjFirst.temperature;
      temperatureOptions.series[1].data = datas.dataObjSecond.temperature;
      this.lineEcharts4.setOption(temperatureOptions);
    },
    barDataChange(datas) {
      console.log(datas);
      let voltageBarOptions = _.cloneDeep(BarOptions);
      voltageBarOptions.title.text = "充电情况";
      voltageBarOptions.xAxis[0].data = [
        "充电次数",
        "充电时间",
        "平均充电时间"
      ];
      voltageBarOptions.series[0].data = [
        datas.now.chargeTimes,
        datas.now.chargeDuration,
        datas.now.avgChargeDuration
      ];
      voltageBarOptions.series[1].data = [
        datas.last.chargeTimes,
        datas.last.chargeDuration,
        datas.last.avgChargeDuration
      ];
      this.myBarEcharts1.setOption(voltageBarOptions);

      let singleVoltageBarOptions = _.cloneDeep(BarOptions);
      singleVoltageBarOptions.title.text = "放电情况";
      singleVoltageBarOptions.xAxis[0].data = [
        "工作次数",
        "放电时间",
        "平均放电时间"
      ];
      singleVoltageBarOptions.series[0].data = [
        datas.now.dischargeTimes,
        datas.now.dischargeDuration,
        datas.now.avgDischargeDuration
      ];
      singleVoltageBarOptions.series[1].data = [
        datas.last.dischargeTimes,
        datas.last.dischargeDuration,
        datas.last.avgDischargeDuration
      ];
      this.myBarEcharts2.setOption(singleVoltageBarOptions);

      let currentBarOptions = _.cloneDeep(BarOptions);
      currentBarOptions.title.text = "电池使用情况";
      currentBarOptions.xAxis[0].data = ["充电时间", "放电时间", "空截时间"];
      currentBarOptions.series[0].data = [
        datas.now.chargeDuration,
        datas.now.dischargeDuration,
        datas.now.idleDuration
      ];
      currentBarOptions.series[1].data = [
        datas.last.chargeDuration,
        datas.last.dischargeDuration,
        datas.last.idleDuration
      ];
      this.myBarEcharts3.setOption(currentBarOptions);

      let result1 =
        Number(datas.now_eventSummary.temperature) +
        Number(datas.now_eventSummary.fluidLevel) +
        Number(datas.now_eventSummary.current) +
        Number(datas.now_eventSummary.voltage);
      let result2 =
        Number(datas.last_eventSummary.temperature) +
        Number(datas.last_eventSummary.fluidLevel) +
        Number(datas.last_eventSummary.current) +
        Number(datas.last_eventSummary.voltage);
      let temperatureBarOptions = _.cloneDeep(BarOptions);
      temperatureBarOptions.title.text = "告警情况";
      temperatureBarOptions.xAxis[0].data = [
        "告警次数",
        "温度",
        "液位",
        "电流"
      ];
      temperatureBarOptions.series[0].data = [
        result1,
        datas.now_eventSummary.temperature,
        datas.now_eventSummary.fluidLevel,
        datas.now_eventSummary.current
      ];
      temperatureBarOptions.series[1].data = [
        result2,
        datas.last_eventSummary.temperature,
        datas.last_eventSummary.fluidLevel,
        datas.last_eventSummary.current
      ];
      this.myBarEcharts4.setOption(temperatureBarOptions);
    }
  }
};
</script>

<style scoped lang="scss">
.bgFFF {
  background: #ffffff;
  padding-top: 30px;
}
.chartWarrp {
  display: flex;
  .chartInfo {
    padding: 0 15px;
    flex: 1;
    width: 100%;
    height: 400px;
  }
}
.btns {
  padding-left: 22px;
  margin-bottom: 20px;
}
// .echarts {
//   width: 100%;
//   height: 100%;
// }
</style>
