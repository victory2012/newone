<template>
  <div class="bgFFF">
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
/* eslint-disable */
import echarts from "echarts";
import _ from "lodash";
import utils from "@/utils/utils";
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
        // console.log(param);
        let opt = this.myEcharts1.getOption();
        let dz = opt.dataZoom[0];
        let tstart = opt.xAxis[0].rangeStart;
        let tend = opt.xAxis[0].rangeEnd;
        // console.log("tstart", dz);
        // console.log("tend", opt);
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
          this.$emit("timeZoom", { tstart, tend });
        }, 800);
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
      // options.xAxis.data = datas.timeArr;

      let voltageOptions = _.cloneDeep(options);
      voltageOptions.title.text = "电压";
      voltageOptions.yAxis.axisLabel.formatter = "{value} v";
      voltageOptions.series[0].data = datas.voltage;
      voltageOptions.tooltip.formatter = p => {
        let item = "";
        p.forEach(v => {
          item +=
            utils.dateFomat(v.value[0]) +
            "<br/>" +
            "电压" +
            " : " +
            v.value[1] +
            "<br/>";
        });
        return item;
      };
      this.myEcharts1.setOption(voltageOptions);

      let singleVoltageOptions = _.cloneDeep(options);
      singleVoltageOptions.title.text = "单体电压";
      singleVoltageOptions.yAxis.axisLabel.formatter = "{value} v";
      singleVoltageOptions.series[0].data = datas.singleVoltage;
      singleVoltageOptions.tooltip.formatter = p => {
        let item = "";
        p.forEach(v => {
          item +=
            utils.dateFomat(v.value[0]) +
            "<br/>" +
            "单体电压" +
            " : " +
            v.value[1] +
            "<br/>";
        });
        return item;
      };
      this.myEcharts2.setOption(singleVoltageOptions);

      let currentOptions = _.cloneDeep(options);
      currentOptions.title.text = "电流";
      currentOptions.yAxis.axisLabel.formatter = "{value} A";
      currentOptions.series[0].data = datas.current;
      currentOptions.tooltip.formatter = p => {
        let item = "";
        p.forEach(v => {
          item +=
            utils.dateFomat(v.value[0]) +
            "<br/>" +
            "电流" +
            " : " +
            v.value[1] +
            "<br/>";
        });
        return item;
      };
      this.myEcharts3.setOption(currentOptions);

      let temperatureOptions = _.cloneDeep(options);
      temperatureOptions.title.text = "温度";
      temperatureOptions.yAxis.axisLabel.formatter = "{value} ℃";
      temperatureOptions.series[0].data = datas.temperature;
      temperatureOptions.tooltip.formatter = p => {
        let item = "";
        p.forEach(v => {
          item +=
            utils.dateFomat(v.value[0]) +
            "<br/>" +
            "温度" +
            " : " +
            v.value[1] +
            "<br/>";
        });
        return item;
      };
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
  margin-bottom: 30px;
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
