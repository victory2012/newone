<template>
  <div class="bgFFF">
    <div class="btns">
      <el-button type="primary" icon="el-icon-remove-outline"></el-button>
      <el-button type="primary" icon="el-icon-circle-plus-outline"></el-button>
    </div>
    <div class="chartWarrp">
      <div class="chartInfo" id="echart1"></div>
      <div class="chartInfo" id="echart2"></div>
    </div>
    <div class="chartWarrp">
      <div class="chartInfo" id="echart3"></div>
      <div class="chartInfo" id="echart4"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import _ from "lodash";
import options from "@/config/echartOptions";

export default {
  props: {
    chartData: {
      type: Object,
      default() {
        return {};
      }
    },
    loading: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      myEcharts: null,
      isOptionAbnormal: false
    };
  },
  watch: {
    loading: {
      handler: function(curVal) {
        console.log(curVal);
        this.showLoading(curVal);
      },
      deep: true
    },
    chartData: {
      handler: function(curVal) {
        this.dataChange(curVal);
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
      this.myEcharts1 = echarts.init($echartsDOM1);
      this.myEcharts2 = echarts.init($echartsDOM2);
      this.myEcharts3 = echarts.init($echartsDOM3);
      this.myEcharts4 = echarts.init($echartsDOM4);
      echarts.connect([
        this.myEcharts1,
        this.myEcharts2,
        this.myEcharts3,
        this.myEcharts4
      ]);

      this.myEcharts1.on("datazoom", param => {
        console.log(param);
        // console.log(option.dataZoom.start);
        // console.log(myEcharts1.dataZoom.start);
      });
      window.onresize = () => {
        this.myEcharts1.resize();
        this.myEcharts2.resize();
        this.myEcharts3.resize();
        this.myEcharts4.resize();
      };
      this.showLoading();
      this.dataChange(this.chartData);
    },
    showLoading(curVal) {
      if (curVal) {
        this.myEcharts1.showLoading();
        this.myEcharts2.showLoading();
        this.myEcharts3.showLoading();
        this.myEcharts4.showLoading();
      } else {
        this.myEcharts1.hideLoading();
        this.myEcharts2.hideLoading();
        this.myEcharts3.hideLoading();
        this.myEcharts4.hideLoading();
      }
    },
    dataChange(datas) {
      options.xAxis.data = datas.timeArr;

      let voltageOptions = _.cloneDeep(options);
      voltageOptions.title.text = "电压";
      voltageOptions.yAxis.axisLabel = "{value} v";
      voltageOptions.series[0].data = datas.voltage;
      this.myEcharts1.setOption(voltageOptions);

      let singleVoltageOptions = _.cloneDeep(options);
      singleVoltageOptions.title.text = "单体电压";
      singleVoltageOptions.yAxis.axisLabel = "{value} v";
      singleVoltageOptions.series[0].data = datas.singleVoltage;
      this.myEcharts2.setOption(singleVoltageOptions);

      let currentOptions = _.cloneDeep(options);
      currentOptions.title.text = "电流";
      currentOptions.yAxis.axisLabel = "{value} A";
      currentOptions.series[0].data = datas.current;
      this.myEcharts3.setOption(currentOptions);

      let temperatureOptions = _.cloneDeep(options);
      temperatureOptions.title.text = "温度";
      temperatureOptions.yAxis.axisLabel = "{value} ℃";
      temperatureOptions.series[0].data = datas.temperature;
      this.myEcharts4.setOption(temperatureOptions);
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
