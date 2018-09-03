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
  props: ["chartData"],
  data() {
    return {
      myEcharts: null,
      isOptionAbnormal: false
    };
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
      let myEcharts1 = echarts.init($echartsDOM1);
      let myEcharts2 = echarts.init($echartsDOM2);
      let myEcharts3 = echarts.init($echartsDOM3);
      let myEcharts4 = echarts.init($echartsDOM4);

      echarts.connect([myEcharts1, myEcharts2, myEcharts3, myEcharts4]);

      myEcharts1.on("datazoom", param => {
        console.log(param);
        // console.log(option.dataZoom.start);
        // console.log(myEcharts1.dataZoom.start);
      });
      window.onresize = () => {
        myEcharts1.resize();
        myEcharts2.resize();
        myEcharts3.resize();
        myEcharts4.resize();
      };
      options.xAxis.data = this.chartData.timeArr;

      let voltageOptions = _.cloneDeep(options);
      voltageOptions.title.text = "电压";
      voltageOptions.yAxis.axisLabel = "{value} v";
      voltageOptions.series[0].data = this.chartData.voltage;
      myEcharts1.setOption(voltageOptions);

      let singleVoltageOptions = _.cloneDeep(options);
      singleVoltageOptions.title.text = "单体电压";
      singleVoltageOptions.yAxis.axisLabel = "{value} v";
      singleVoltageOptions.series[0].data = this.chartData.singleVoltage;
      myEcharts2.setOption(singleVoltageOptions);

      let currentOptions = _.cloneDeep(options);
      currentOptions.title.text = "电流";
      currentOptions.yAxis.axisLabel = "{value} A";
      currentOptions.series[0].data = this.chartData.current;
      myEcharts3.setOption(currentOptions);

      let temperatureOptions = _.cloneDeep(options);
      temperatureOptions.title.text = "温度";
      temperatureOptions.yAxis.axisLabel = "{value} ℃";
      temperatureOptions.series[0].data = this.chartData.temperature;
      myEcharts4.setOption(temperatureOptions);
      // myEcharts1.setOption({
      //   title: {
      //     text: "电压",
      //     subtext: "监测数据变化",
      //     textStyle: {
      //       color: "#484848"
      //     },
      //     subtextStyle: {
      //       color: "#484848"
      //     }
      //   },
      //   tooltip: {
      //     trigger: "axis"
      //   },
      //   grid: {
      //     left: "3%",
      //     right: "4%",
      //     bottom: "20%",
      //     containLabel: true
      //   },
      //   dataZoom: [
      //     {
      //       // show: true,
      //       type: "slider",
      //       start: 0,
      //       end: 100,
      //       startValue: "aaa",
      //       endValue: "bbb",
      //       fillerColor: "rgba(167,183,204,0.4)",
      //       backgroundColor: "rgba(0,0,0,0)"
      //     },
      //     {
      //       type: "inside",
      //       start: 0,
      //       end: 100,
      //       startValue: "aaa",
      //       endValue: "bbb"
      //     }
      //   ],
      //   xAxis: {
      //     type: "category",
      //     boundaryGap: false,
      //     data: this.chartData.timeArr,
      //     axisLine: {
      //       show: false
      //     },
      //     axisTick: {
      //       show: false
      //     },
      //     axisLabel: {
      //       fontSize: 11,
      //       color: "#484848"
      //     },
      //     splitLine: {
      //       show: false
      //     }
      //   },
      //   yAxis: {
      //     type: "value",
      //     axisLabel: {
      //       formatter: "{value} v"
      //     },
      //     axisLine: {
      //       show: false
      //     },
      //     axisTick: {
      //       show: false
      //     },
      //     splitLine: {
      //       show: false
      //     }
      //   },
      //   series: [
      //     {
      //       name: "电压",
      //       type: "line",
      //       smooth: true,
      //       lineStyle: {
      //         normal: {
      //           color: "#2491fc"
      //         }
      //       },
      //       areaStyle: {
      //         normal: {
      //           color: "rgba(36,145,252,0.25)"
      //         }
      //       },
      //       data: this.chartData.voltage
      //     }
      //   ]
      // });
      // myEcharts2.setOption({
      //   title: {
      //     text: "单体电压",
      //     subtext: "监测数据变化",
      //     textStyle: {
      //       color: "#484848"
      //     },
      //     subtextStyle: {
      //       color: "#484848"
      //     }
      //   },
      //   tooltip: {
      //     trigger: "axis"
      //   },
      //   grid: {
      //     left: "3%",
      //     right: "4%",
      //     bottom: "20%",
      //     containLabel: true
      //   },
      //   dataZoom: [
      //     {
      //       // show: true,
      //       type: "slider",
      //       start: 0,
      //       end: 100,
      //       startValue: "aaa",
      //       endValue: "bbb",
      //       fillerColor: "rgba(167,183,204,0.4)",
      //       backgroundColor: "rgba(0,0,0,0)"
      //     },
      //     {
      //       type: "inside",
      //       start: 0,
      //       end: 100,
      //       startValue: "aaa",
      //       endValue: "bbb"
      //     }
      //   ],
      //   xAxis: {
      //     type: "category",
      //     boundaryGap: false,
      //     data: this.chartData.timeArr,
      //     axisLine: {
      //       show: false
      //     },
      //     axisTick: {
      //       show: false
      //     },
      //     axisLabel: {
      //       fontSize: 11,
      //       color: "#484848"
      //     },
      //     splitLine: {
      //       show: false
      //     }
      //   },
      //   yAxis: {
      //     type: "value",
      //     axisLabel: {
      //       formatter: "{value} v"
      //     },
      //     axisLine: {
      //       show: false
      //     },
      //     axisTick: {
      //       show: false
      //     },
      //     splitLine: {
      //       show: false
      //     }
      //   },
      //   series: [
      //     {
      //       name: "单体电压",
      //       type: "line",
      //       smooth: true,
      //       lineStyle: {
      //         normal: {
      //           color: "#2491fc"
      //         }
      //       },
      //       areaStyle: {
      //         normal: {
      //           color: "rgba(36,145,252,0.25)"
      //         }
      //       },
      //       data: this.chartData.singleVoltage
      //     }
      //   ]
      // });
      // myEcharts3.setOption({
      //   title: {
      //     text: "电流",
      //     subtext: "监测数据变化",
      //     textStyle: {
      //       color: "#484848"
      //     },
      //     subtextStyle: {
      //       color: "#484848"
      //     }
      //   },
      //   tooltip: {
      //     trigger: "axis"
      //   },
      //   grid: {
      //     left: "3%",
      //     right: "4%",
      //     bottom: "20%",
      //     containLabel: true
      //   },
      //   dataZoom: [
      //     {
      //       // show: true,
      //       type: "slider",
      //       start: 0,
      //       end: 100,
      //       startValue: "aaa",
      //       endValue: "bbb",
      //       fillerColor: "rgba(167,183,204,0.4)",
      //       backgroundColor: "rgba(0,0,0,0)"
      //     },
      //     {
      //       type: "inside",
      //       start: 0,
      //       end: 100,
      //       startValue: "aaa",
      //       endValue: "bbb"
      //     }
      //   ],
      //   xAxis: {
      //     type: "category",
      //     boundaryGap: false,
      //     data: this.chartData.timeArr,
      //     axisLine: {
      //       show: false
      //     },
      //     axisTick: {
      //       show: false
      //     },
      //     axisLabel: {
      //       fontSize: 11,
      //       color: "#484848"
      //     },
      //     splitLine: {
      //       show: false
      //     }
      //   },
      //   yAxis: {
      //     type: "value",
      //     axisLabel: {
      //       formatter: "{value} A"
      //     },
      //     axisLine: {
      //       show: false
      //     },
      //     axisTick: {
      //       show: false
      //     },
      //     splitLine: {
      //       show: false
      //     }
      //   },
      //   series: [
      //     {
      //       name: "电流",
      //       type: "line",
      //       smooth: true,
      //       lineStyle: {
      //         normal: {
      //           color: "#2491fc"
      //         }
      //       },
      //       areaStyle: {
      //         normal: {
      //           color: "rgba(36,145,252,0.25)"
      //         }
      //       },
      //       data: this.chartData.current
      //     }
      //   ]
      // });
      // myEcharts4.setOption({
      //   title: {
      //     text: "温度",
      //     subtext: "监测数据变化",
      //     textStyle: {
      //       color: "#484848"
      //     },
      //     subtextStyle: {
      //       color: "#484848"
      //     }
      //   },
      //   tooltip: {
      //     trigger: "axis"
      //   },
      //   grid: {
      //     left: "3%",
      //     right: "4%",
      //     bottom: "20%",
      //     containLabel: true
      //   },
      //   dataZoom: [
      //     {
      //       // show: true,
      //       type: "slider",
      //       start: 0,
      //       end: 100,
      //       startValue: "aaa",
      //       endValue: "bbb",
      //       fillerColor: "rgba(167,183,204,0.4)",
      //       backgroundColor: "rgba(0,0,0,0)"
      //     },
      //     {
      //       type: "inside",
      //       start: 0,
      //       end: 100,
      //       startValue: "aaa",
      //       endValue: "bbb"
      //     }
      //   ],
      //   xAxis: {
      //     type: "category",
      //     boundaryGap: false,
      //     data: this.chartData.timeArr,
      //     axisLine: {
      //       show: false
      //     },
      //     axisTick: {
      //       show: false
      //     },
      //     axisLabel: {
      //       fontSize: 11,
      //       color: "#484848"
      //     },
      //     splitLine: {
      //       show: false
      //     }
      //   },
      //   yAxis: {
      //     type: "value",
      //     axisLabel: {
      //       formatter: "{value} ℃"
      //     },
      //     axisLine: {
      //       show: false
      //     },
      //     axisTick: {
      //       show: false
      //     },
      //     splitLine: {
      //       show: false
      //     }
      //   },
      //   series: [
      //     {
      //       name: "温度",
      //       type: "line",
      //       smooth: true,
      //       lineStyle: {
      //         normal: {
      //           color: "#2491fc"
      //         }
      //       },
      //       areaStyle: {
      //         normal: {
      //           color: "rgba(36,145,252,0.25)"
      //         }
      //       },
      //       data: this.chartData.temperature
      //     }
      //   ]
      // });
    },
    getData() {}
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
