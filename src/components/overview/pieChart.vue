<template>
  <div class="pieWarper">
    <div class="pieItme shadow">
      <p>{{$t("overview.effectiveRate")}}</p>
      <div class="chat"
        id="pieChart1"></div>
    </div>
    <div class="pieItme shadow">
      <p>{{$t("overview.RunNormal")}}</p>
      <div class="chat"
        id="pieChart2"></div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import echarts from "echarts";
// import _ from "lodash";
import utils from "@/utils/utils";
import options from "@/config/echartOptions";
import { deepClone, debounce } from "@/utils/functions";
import t from "@/utils/translate";

export default {
  props: {
    cardData: {
      type: Object,
      default: () => { }
    }
  },
  data () {
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
            detail: { formatter: "{value}%" },
            data: [],
            splitNumber: 10,
            axisLine: {
              lineStyle: {
                color: [[0.2, "#ff4500"], [0.8, "#48b"], [1, "#228b22"]],
                width: 10
              }
            },
            axisTick: {
              splitNumber: 10,
              length: 12,
              lineStyle: {
                color: "auto"
              }
            },
            splitLine: {
              show: true,
              length: 30,
              lineStyle: {
                color: "auto"
              }
            },
            pointer: {
              width: 8
            },
            title: {
              show: true,
              offsetCenter: [0, "-40%"],
              textStyle: {
                fontWeight: "bolder"
              }
            },
            detail: {
              formatter: "{value}%",
              textStyle: {
                color: "auto",
                fontWeight: "bolder"
              }
            }
          }
        ]
      }
    };
  },
  watch: {
    cardData: {
      handler: function (val) {
        this.dataChange(val);
      },
      deep: true
    }
  },
  mounted () {
    this.init();
    this._resizeHanlder = debounce(() => {
      this.pieChart1.resize();
      this.pieChart2.resize();
    }, 100);
    window.addEventListener("resize", this._resizeHanlder);
  },
  methods: {
    init () {
      let $pieChart1 = document.getElementById("pieChart1");
      let $pieChart2 = document.getElementById("pieChart2");
      this.pieChart1 = echarts.init($pieChart1);
      this.pieChart2 = echarts.init($pieChart2);
      this.dataChange(this.cardData);
    },
    dataChange (data) {
      console.log(data);
      let jiankongshu;
      let namals;
      let defrence = Number(data.activeTotal) - Number(data.alarmedTotal); // 运行正常数
      let runNomal = defrence < 0 ? 0 : defrence;

      if (!data.hasData) {
        data = {
          activeTotal: 0,
          alarmedTotal: 0,
          currentMonthTotal: 0,
          total: 100
        };
        jiankongshu = 0;
        namals = 0;
      }
      if (data.total === 0) {
        jiankongshu = 0;
        namals = 0;
      } else {
        let effective = Number(data.activeTotal) / Number(data.total); // 有效数
        jiankongshu = (effective * 100).toFixed(2);
        if (defrence > 0) {
          namals = ((defrence / Number(data.total)) * 100).toFixed(2);
        } else {
          namals = 0;
        }
      }
      let voltageOptions = deepClone(this.pieOption);
      voltageOptions.tooltip.formatter = p => {
        let item = `${this.$t("overview.total")}：${data.total}<br />${this.$t(
          "overview.effectiveRate"
        )}：${p.data.per || 0}<br />${p.data.value}%`;
        return item;
      };
      // voltageOptions.title.text = t("overview.valid");
      voltageOptions.series[0].data = [
        {
          per: data.activeTotal,
          value: jiankongshu || 0
          // name: "有效监控"
        }
      ];
      this.pieChart1.setOption(voltageOptions);
      let currentOptions = deepClone(this.pieOption);
      // currentOptions.title.text = t("overview.RunNormal");
      currentOptions.tooltip.formatter = p => {
        let item = `${this.$t("overview.total")}：${data.total}<br />${this.$t(
          "overview.RunNormal"
        )}：${p.data.per || 0}<br />${p.data.value}%`;
        return item;
      };
      currentOptions.series[0].data = [
        {
          value: namals || 0,
          per: runNomal
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
  overflow: hidden;
  justify-content: space-between;
  .pieItme {
    box-sizing: border-box;
    padding: 10px;
    flex: 0 0 49%;
    height: 350px;
    background: #ffffff;
    p {
      color: #484848;
      // font-weight: bolder;
      font-weight: 800;
      line-height: 26px;
      font-family: 'Helvetica Neue', sans-serif;
    }
    .chat {
      width: 100%;
      height: 304px;
    }
  }
  .shadow {
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  }
}
</style>
