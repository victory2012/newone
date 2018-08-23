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

export default {
  data() {
    return {
      myEcharts: null,
      isOptionAbnormal: false,
      option: {
        title: {
          text: "电压",
          subtext: "监测数据变化",
          textStyle: {
            color: "#484848"
          },
          subtextStyle: {
            color: "#484848"
          }
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "20%",
          containLabel: true
        },
        dataZoom: [
          {
            // show: true,
            type: "slider",
            start: 0,
            end: 100,
            startValue: "aaa",
            endValue: "bbb",
            fillerColor: "rgba(167,183,204,0.4)",
            backgroundColor: "rgba(0,0,0,0)"
          },
          {
            type: "inside",
            start: 0,
            end: 100,
            startValue: "aaa",
            endValue: "bbb"
          }
        ],
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 11,
            color: "#484848"
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} v"
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: "",
            type: "line",
            smooth: true,
            lineStyle: {
              normal: {
                color: "#2491fc"
              }
            },
            areaStyle: {
              normal: {
                color: "rgba(36,145,252,0.25)"
              }
            },
            data: [10, 20, 30, 80, 20, 50, 90]
          }
        ]
      }
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
      myEcharts1.setOption(this.option);
      myEcharts2.setOption(this.option);
      myEcharts3.setOption(this.option);
      myEcharts4.setOption(this.option);
      echarts.connect([myEcharts1, myEcharts2, myEcharts3, myEcharts4]);
      console.log(myEcharts1);
      console.log(echarts);
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
