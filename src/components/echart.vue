<template>
  <div class="echarts" :id="randomId"></div>
</template>

<script>
/* eslint-disable */
import echarts from "echarts"; /* eslint-disable */
// import { isValidOption } from "../utils/valated";

export default {
  name: "echarts",
  props: {
    option: {
      type: Object,
      default() {
        return {};
      }
    },
    width: {
      type: String
    }
  },
  data() {
    return {
      myEcharts: null,
      isOptionAbnormal: false,
      randomId: `echarts-dom${Date.now() + Math.random()}`
    };
  },
  watch: {
    option() {
      this.checkAndSetOption();
    }
  },
  mounted() {
    this.checkAndSetOption();
  },
  methods: {
    checkAndSetOption() {
      let $echartsDOM = document.getElementById(this.randomId);
      if (!$echartsDOM) return;
      let myEcharts = echarts.init($echartsDOM);
      myEcharts.setOption(this.option);
      window.onresize = () => {
        myEcharts.resize();
      };
    }
  }
};
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
