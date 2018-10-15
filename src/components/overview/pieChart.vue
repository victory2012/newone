<template>
  <div class="pieWarper">
    <div class="pieItme shadow" id="pieChart1"></div>
    <div class="pieItme shadow" id="pieChart2"></div>
  </div>
</template>
<script>
/* eslint-disable */
import echarts from "echarts";
// import _ from "lodash";
import utils from "@/utils/utils";
import options from "@/config/echartOptions";
import { deepClone, debounce } from "@/utils/functions";

export default {
  props: {
    cardData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      pieChart1: "",
      pieChart2: "",
      pieOption: {
        title: {
          text: "",
          subtext: "",
          textStyle: {
            color: "#484848"
          },
          subtextStyle: {
            color: "#484848"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}: {d}%"
        },
        series: [
          {
            type: "gauge",
            center: ["50%", "60%"], // 仪表位置
            radius: "90%", //仪表大小
            startAngle: 200, //开始角度
            endAngle: -20, //结束角度
            detail: { formatter: "{value}" },
            data: [],
            axisLine: {
              show: true,
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [
                  //表盘颜色
                  [0.2, "#DA462C"], // 0-50%处的颜色
                  [0.5, "#FF9618"], // 51%-70%处的颜色
                  // [0.6, "#FFED44"], // 70%-90%处的颜色
                  [1, "#20AE51"] // 90%-100%处的颜色
                ],
                width: 30 //表盘宽度
              }
            }
          }
        ]
      }
    };
  },
  watch: {
    cardData: {
      handler: function(val) {
        this.dataChange(val);
      },
      deep: true
    }
  },
  mounted() {
    this.init();
    this._resizeHanlder = debounce(() => {
      this.pieChart1.resize();
      this.pieChart2.resize();
    }, 100);
    window.addEventListener("resize", this._resizeHanlder);
  },
  methods: {
    init() {
      let $pieChart1 = document.getElementById("pieChart1");
      let $pieChart2 = document.getElementById("pieChart2");
      this.pieChart1 = echarts.init($pieChart1);
      this.pieChart2 = echarts.init($pieChart2);
      this.dataChange(this.cardData);
    },
    showLoading(curVal) {
      if (curVal) {
        this.pieChart1.showLoading();
        this.pieChart2.showLoading();
      } else {
        this.pieChart1.hideLoading();
        this.pieChart2.hideLoading();
      }
    },
    dataChange(data) {
      if (!data.hasData) {
        data = {
          activeTotal: 0,
          alarmedTotal: 0,
          currentMonthTotal: 0,
          total: 100
        };
      }
      this.pieOption.series[0].max = data.total;
      let defrence = Number(data.activeTotal) - Number(data.alarmedTotal); // 运行正常数
      let runNomal = defrence < 0 ? 0 : defrence;
      let effective = Number(data.activeTotal) / Number(data.total); // 有效数
      let jiankongshu = (effective * 100).toFixed(2);

      let namals = ((runNomal / Number(data.total)) * 100).toFixed(2);

      let voltageOptions = deepClone(this.pieOption);
      voltageOptions.tooltip.formatter = p => {
        let item = `有效监控数：${p.data.value}<br />${jiankongshu}%`;
        return item;
      };
      voltageOptions.title.text = "有效监控数";
      voltageOptions.series[0].data = [
        {
          value: data.activeTotal
          // name: "有效监控"
        }
      ];
      this.pieChart1.setOption(voltageOptions);

      let currentOptions = deepClone(this.pieOption);
      currentOptions.color = ["#8DED81", "#E36568"];
      currentOptions.title.text = "正常运行数";
      currentOptions.tooltip.formatter = p => {
        let item = `正常运行数：${p.data.value}<br />${namals}%`;
        return item;
      };
      currentOptions.series[0].data = [
        {
          value: runNomal
          // name: "运行正常"
        }
      ];
      this.pieChart2.setOption(currentOptions);
    }
  }
};
</script>
<style lang="scss" scoped>
.pieWarper {
  display: flex;
  justify-content: space-between;
  .pieItme {
    box-sizing: border-box;
    padding: 10px;
    flex: 0 0 49%;
    height: 350px;
    background: #ffffff;
  }
  .shadow {
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  }
}
</style>
