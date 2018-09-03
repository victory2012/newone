<template>
  <div class="bgFFF">
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
import options from "@/config/echartBarOptions";

export default {
  props: {
    chartBarData: {
      type: Object,
      default: () => {
        return {};
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
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let BarDOM1 = document.getElementById("echartBar1");
      let BarDOM2 = document.getElementById("echartBar2");
      let BarDOM3 = document.getElementById("echartBar3");
      let BarDOM4 = document.getElementById("echartBar4");
      let myBarEcharts1 = echarts.init(BarDOM1);
      let myBarEcharts2 = echarts.init(BarDOM2);
      let myBarEcharts3 = echarts.init(BarDOM3);
      let myBarEcharts4 = echarts.init(BarDOM4);

      window.onresize = () => {
        myBarEcharts1.resize();
        myBarEcharts2.resize();
        myBarEcharts3.resize();
        myBarEcharts4.resize();
      };

      let voltageOptions = _.cloneDeep(options);
      voltageOptions.title.text = "充电情况";
      voltageOptions.xAxis[0].data = ["充电次数", "充电时间", "平均充电时间"];
      voltageOptions.series[0].data = [10, 65, 15];
      voltageOptions.series[1].data = [30, 45, 15];
      myBarEcharts1.setOption(voltageOptions);

      let singleVoltageOptions = _.cloneDeep(options);
      singleVoltageOptions.title.text = "放电情况";
      singleVoltageOptions.xAxis[0].data = [
        "工作次数",
        "放电时间",
        "平均放电时间"
      ];
      singleVoltageOptions.series[0].data = [10, 65, 15];
      singleVoltageOptions.series[1].data = [30, 45, 15];
      myBarEcharts2.setOption(singleVoltageOptions);

      let currentOptions = _.cloneDeep(options);
      currentOptions.title.text = "电池使用情况";
      currentOptions.xAxis[0].data = ["充电时间", "放电时间", "空截时间"];
      currentOptions.series[0].data = [10, 65, 15];
      currentOptions.series[1].data = [30, 45, 15];
      myBarEcharts3.setOption(currentOptions);

      let temperatureOptions = _.cloneDeep(options);
      temperatureOptions.title.text = "告警情况";
      temperatureOptions.xAxis[0].data = ["告警次数", "温度", "液位", "电流"];
      temperatureOptions.series[0].data = [10, 65, 15, 20];
      temperatureOptions.series[1].data = [30, 45, 15, 60];
      myBarEcharts4.setOption(temperatureOptions);
    }
  }
};
</script>

<style scoped lang="scss">
.bgFFF {
  background: #ffffff;
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
