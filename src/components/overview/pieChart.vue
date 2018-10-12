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
        legend: {
          bottom: 5,
          left: "center",
          data: []
        },
        series: [
          {
            type: "pie",
            radius: ["25%", "50%"],
            center: ["50%", "50%"],
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontWeight: 300,
                  fontSize: 16 // 文字的字体大小
                },
                formatter: "{c}"
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
      // window.onresize = () => {
      //   this.pieChart1.resize();
      //   this.pieChart2.resize();
      // };
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
      let voltageOptions = deepClone(this.pieOption);
      voltageOptions.legend.data = ["有效监控数", "电池总数"];
      voltageOptions.color = ["#F88860", "#62BEE7"];
      voltageOptions.tooltip.formatter = p => {
        // console.log(p);
        let item = `${p.data.name}：${p.data.value}<br />${p.percent}%`;
        return item;
      };
      voltageOptions.title.text = "有效监控仪表盘";
      voltageOptions.series[0].data = [
        { value: data.activeTotal, name: "有效监控数" },
        { value: data.total, name: "电池总数" }
      ];
      // voltageOptions.series[0].label.normal.formatter = "{c}h";
      this.pieChart1.setOption(voltageOptions);

      let currentOptions = deepClone(this.pieOption);
      currentOptions.color = ["#8DED81", "#E36568"];
      currentOptions.title.text = "正常运行仪表盘";
      currentOptions.legend.data = ["运行正常数", "有效监控数"];
      currentOptions.tooltip.formatter = p => {
        // console.log(p);
        let item = `${p.data.name}：${p.data.value}<br />${p.percent}%`;
        return item;
      };
      currentOptions.series[0].data = [
        {
          value: `${Number(data.activeTotal) - Number(data.alarmedTotal)}`,
          name: "运行正常数"
        },
        { value: data.activeTotal, name: "有效监控数" }
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
