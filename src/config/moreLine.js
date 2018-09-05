export default {
  title: {
    text: "",
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
  /* eslint-disable */
  dataZoom: [{
      // show: true,
      type: "slider",
      start: 0,
      end: 100,
      fillerColor: "rgba(167,183,204,0.4)",
      backgroundColor: "rgba(0,0,0,0)"
    },
    {
      type: "inside",
      start: 0,
      end: 100
    }
  ],
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: "",
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
  animation: false,
  yAxis: {
    type: "value",
    axisLabel: {
      formatter: ""
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
  series: [{
    name: "",
    type: "line",
    smooth: true,
    lineStyle: {
      normal: {
        color: "#65D7FA"
      }
    },
    // areaStyle: {
    //   normal: {
    //     color: "rgba(36,145,252,0.25)"
    //   }
    // },
    data: ""
  }, {
    name: "",
    type: "line",
    smooth: true,
    lineStyle: {
      normal: {
        color: "#6B769E"
      }
    },
    // areaStyle: {
    //   normal: {
    //     color: "rgba(36,145,252,0.25)"
    //   }
    // },
    data: ""
  }]
};
