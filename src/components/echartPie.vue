<template>
  <div class="circel">
    <div class="circelInfo">
      <div class="pei" id="peiCharts1"></div>
    </div>
    <div class="circelInfo">
      <div class="item-history_alarm_divider">
        <p class="times">{{alarmTime ||0}}</p>
        <p>累计告警</p>
      </div>
    </div>
    <div class="circelInfo">
      <div class="pei" id="peiCharts2"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import echarts from "echarts";
// import _ from "lodash";
import { deepClone } from "@/utils/functions";

export default {
  props: {
    peiData: {
      type: Object,
      default: () => {
        return {
          summary: {},
          eventSummary: {}
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
      pieOption: {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {d}%"
        },
        legend: {
          // orient: "vertical",
          // x: "left",
          bottom: 10,
          left: "center",
          data: []
          // data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            type: "pie",
            radius: ["30%", "50%"],
            center: ["50%", "60%"],
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
      },
      alarmTime: 0
    };
  },
  watch: {
    peiData: {
      handler: function(vals) {
        this.dataChange(vals);
      },
      deep: true
    },
    loading: {
      handler: function(vals) {
        this.loadingChange(vals);
      },
      deep: true
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let BarDOM1 = document.getElementById("peiCharts1");
      let BarDOM2 = document.getElementById("peiCharts2");

      this.peiEcharts1 = echarts.init(BarDOM1);
      this.peiEcharts2 = echarts.init(BarDOM2);
      this.loadingChange(this.loading);
      this.dataChange(this.peiData);
    },
    loadingChange(loading) {
      if (loading) {
        this.peiEcharts1.showLoading();
        this.peiEcharts2.showLoading();
      } else {
        this.peiEcharts1.hideLoading();
        this.peiEcharts2.hideLoading();
      }
    },
    dataChange(peiData) {
      let voltageOptions = deepClone(this.pieOption);
      voltageOptions.legend.data = ["充电时间", "放电时间", "空载时间"];
      voltageOptions.tooltip.formatter = p => {
        let item = `${p.percent}%<br />${p.data.name}: ${p.data.value}h`;
        return item;
      };
      voltageOptions.series[0].data = [
        { value: peiData.summary.chargeDuration, name: "充电时间" },
        { value: peiData.summary.dischargeDuration, name: "放电时间" },
        { value: peiData.summary.idleDuration, name: "空载时间" }
      ];
      voltageOptions.series[0].label.normal.formatter = "{c}h";
      this.peiEcharts1.setOption(voltageOptions);

      this.alarmTime =
        Number(peiData.eventSummary.temperature) +
        Number(peiData.eventSummary.fluidLevel) +
        Number(peiData.eventSummary.voltage) +
        Number(peiData.eventSummary.current);
      let currentOptions = deepClone(this.pieOption);
      currentOptions.legend.data = ["温度", "液位", "电压", "电流"];
      currentOptions.series[0].data = [
        { value: peiData.eventSummary.temperature, name: "温度" },
        { value: peiData.eventSummary.fluidLevel, name: "液位" },
        { value: peiData.eventSummary.voltage, name: "电压" },
        { value: peiData.eventSummary.current, name: "电流" }
      ];
      this.peiEcharts2.setOption(currentOptions);
    }
  }
};
</script>

<style scoped lang="scss">
.circel {
  background: #ffffff;
  padding: 24px 0;
  display: flex;
  .circelInfo {
    flex: 1;
    height: 400px;
    .pei {
      height: 400px;
    }
    .item-history_alarm_divider {
      box-sizing: border-box;
      height: 200px;
      border-left: 1px solid #d7d7d7;
      margin: 163px auto 0;
      margin-left: 140px;
      padding-left: 70px;
      padding-top: 74px;
      p {
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        &.times {
          height: 24px;
          font-size: 18px;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
