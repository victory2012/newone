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
    <div class="chartWarrp">
      <div class="chartInfo" id="echart3"></div>
      <div class="chartInfo" id="echart4"></div>
    </div>
    <div class="chartWarrp">
      <div class="chartInfo">
        <div class="echartBarTimes1" id="echartBarTimes1"></div>
        <div class="echartBar1" id="echartBar1"></div>
      </div>
      <div class="chartInfo">
        <div class="echartBarTimes1" id="echartBarTimes2"></div>
        <div class="echartBar1" id="echartBar2"></div>
      </div>
    </div>
    <div class="chartWarrp">
      <div class="chartInfo" id="echartBar3"></div>
      <div class="chartInfo" id="echartBar4"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import echarts from "echarts"; /* eslint-disable */
import _ from "lodash";
import utils from "@/utils/utils";
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
        this.barTime(vals);
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
      let BarDOMTime1 = document.getElementById("echartBarTimes1");
      let BarDOMTime2 = document.getElementById("echartBarTimes2");
      this.myBarEcharts1 = echarts.init(BarDOM1);
      this.myBarEcharts2 = echarts.init(BarDOM2);
      this.myBarEcharts3 = echarts.init(BarDOM3);
      this.myBarEcharts4 = echarts.init(BarDOM4);
      this.lineEcharts1 = echarts.init($echartsDOM1);
      this.lineEcharts2 = echarts.init($echartsDOM2);
      this.lineEcharts3 = echarts.init($echartsDOM3);
      this.lineEcharts4 = echarts.init($echartsDOM4);
      this.berCharts1 = echarts.init(BarDOMTime1);
      this.berCharts2 = echarts.init(BarDOMTime2);

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
        this.berCharts1.resize();
        this.berCharts2.resize();
      };
      this.dataChange(this.chartData);
      this.showLoading(this.loading);
      this.barDataChange({
        now: {},
        last: {},
        last_eventSummary: {},
        now_eventSummary: {}
      });
      this.barTime({
        now: {},
        last: {}
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
      let name1;
      let name2;
      if (datas.battertCode) {
        name1 = datas.battertCode[0].code;
        name2 = datas.battertCode[1].code;
      } else {
        name1 = "本期";
        name2 = "上期";
      }
      options.series[0].name = name1;
      options.series[1].name = name2;
      options.legend.data = [name1, name2];
      options.xAxis.data = datas.dataObjFirst.timeArr;

      let voltageOptions = _.cloneDeep(options);
      voltageOptions.title.text = "电压";
      voltageOptions.yAxis.axisLabel.formatter = "{value} v";
      voltageOptions.series[0].data = datas.dataObjFirst.voltage;
      voltageOptions.series[1].data = datas.dataObjSecond.voltage;
      // if (!datas.battertCode) {
      //   voltageOptions.tooltip.formatter = p => {
      //     console.log(p);
      //     let item = "";
      //     // p.forEach(v => {
      //     //   item +=
      //     //     utils.dateFomat(v.value[0]) +
      //     //     "<br/>" +
      //     //     "温度" +
      //     //     " : " +
      //     //     v.value[1] +
      //     //     "<br/>";
      //     // });
      //     return item;
      //   };
      // }
      this.lineEcharts1.setOption(voltageOptions);

      let singleVoltageOptions = _.cloneDeep(options);
      singleVoltageOptions.title.text = "单体电压";
      singleVoltageOptions.yAxis.axisLabel.formatter = "{value} v";
      singleVoltageOptions.series[0].data = datas.dataObjFirst.singleVoltage;
      singleVoltageOptions.series[1].data = datas.dataObjSecond.singleVoltage;
      this.lineEcharts2.setOption(singleVoltageOptions);

      let currentOptions = _.cloneDeep(options);
      currentOptions.title.text = "电流";
      currentOptions.yAxis.axisLabel.formatter = "{value} A";
      currentOptions.series[0].data = datas.dataObjFirst.current;
      currentOptions.series[1].data = datas.dataObjSecond.current;
      this.lineEcharts3.setOption(currentOptions);

      let temperatureOptions = _.cloneDeep(options);
      temperatureOptions.title.text = "温度";
      temperatureOptions.yAxis.axisLabel.formatter = "{value} ℃";
      temperatureOptions.series[0].data = datas.dataObjFirst.temperature;
      temperatureOptions.series[1].data = datas.dataObjSecond.temperature;
      this.lineEcharts4.setOption(temperatureOptions);
    },
    barDataChange(datas) {
      // console.log(datas);legend
      let name1;
      let name2;
      if (datas.battertCode) {
        name1 = datas.battertCode[0].code;
        name2 = datas.battertCode[1].code;
      } else {
        name1 = "本期";
        name2 = "上期";
      }
      BarOptions.legend.data = [name1, name2];
      BarOptions.series[0].name = name1;
      BarOptions.series[1].name = name2;
      let voltageBarOptions = _.cloneDeep(BarOptions);
      // voltageBarOptions.title.text = "";
      voltageBarOptions.xAxis[0].data = [
        // "充电次数",
        "充电时间",
        "平均充电时间"
      ];
      voltageBarOptions.legend.show = false;
      voltageBarOptions.series[0].data = [
        // datas.now.chargeTimes,
        (datas.now.chargeDuration / 60).toFixed(2),
        (datas.now.avgChargeDuration / 60).toFixed(2)
      ];
      voltageBarOptions.series[1].data = [
        // datas.last.chargeTimes,
        (datas.last.chargeDuration / 60).toFixed(2),
        (datas.last.avgChargeDuration / 60).toFixed(2)
      ];
      this.myBarEcharts1.setOption(voltageBarOptions);

      let singleVoltageBarOptions = _.cloneDeep(BarOptions);
      // singleVoltageBarOptions.title.text = "放电情况";
      singleVoltageBarOptions.xAxis[0].data = [
        // "工作次数",
        "放电时间",
        "平均放电时间"
      ];
      singleVoltageBarOptions.legend.show = false;
      singleVoltageBarOptions.series[0].data = [
        // datas.now.dischargeTimes,
        (datas.now.dischargeDuration / 60).toFixed(2),
        (datas.now.avgDischargeDuration / 60).toFixed(2)
      ];
      singleVoltageBarOptions.series[1].data = [
        // datas.last.dischargeTimes,
        (datas.last.dischargeDuration / 60).toFixed(2),
        (datas.last.avgDischargeDuration / 60).toFixed(2)
      ];
      this.myBarEcharts2.setOption(singleVoltageBarOptions);

      let currentBarOptions = _.cloneDeep(BarOptions);
      currentBarOptions.title.text = "电池使用情况";
      currentBarOptions.xAxis[0].data = ["充电时间", "放电时间", "空截时间"];
      currentBarOptions.series[0].data = [
        (datas.now.chargeDuration / 60).toFixed(2),
        (datas.now.dischargeDuration / 60).toFixed(2),
        (datas.now.idleDuration / 60).toFixed(2)
      ];
      currentBarOptions.series[1].data = [
        (datas.last.chargeDuration / 60).toFixed(2),
        (datas.last.dischargeDuration / 60).toFixed(2),
        (datas.last.idleDuration / 60).toFixed(2)
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
    },
    barTime(datas) {
      let chargeTimesOption = _.cloneDeep(BarOptions);
      chargeTimesOption.title.text = "放电情况";
      chargeTimesOption.xAxis[0].data = ["工作次数"];
      chargeTimesOption.series[0].data = [datas.now.dischargeTimes];
      chargeTimesOption.series[1].data = [datas.last.dischargeTimes];
      this.berCharts1.setOption(chargeTimesOption);

      let DsiChargeTimesOption = _.cloneDeep(BarOptions);
      DsiChargeTimesOption.title.text = "放电情况";
      DsiChargeTimesOption.xAxis[0].data = ["工作次数"];
      DsiChargeTimesOption.series[0].data = [datas.now.dischargeTimes];
      DsiChargeTimesOption.series[1].data = [datas.last.dischargeTimes];
      this.berCharts2.setOption(DsiChargeTimesOption);
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
  padding-bottom: 50px;
  .chartInfo {
    padding: 0 15px;
    flex: 1;
    width: 100%;
    height: 400px;
    display: flex;
    .echartBarTimes1 {
      flex: 1;
    }
    .echartBar1 {
      flex: 2;
    }
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
