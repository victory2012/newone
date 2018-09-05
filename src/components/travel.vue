<template>
  <div>
    <div id="historyContent" class="historyContent"></div>
  </div>
</template>
<script>
/* eslint-disable */
import AMap from "AMap";
import AMapUI from "AMapUI";

let map = null;
let pathSimplifierIns = null;
let navg = null;
export default {
  props: {
    travelData: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    travelData: {
      handler: function(vals) {
        this.positionChange(vals);
      },
      deep: true
    }
  },
  data() {
    return {
      map: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    positionChange(travelData) {
      // console.log(this.travelData);
      if (!travelData || travelData.length < 1) {
        return;
      }
      AMapUI.load(["ui/misc/PathSimplifier"], PathSimplifier => {
        if (!PathSimplifier.supportCanvas) {
          alert("当前环境不支持 Canvas！");
          return;
        }
        AMapUI.loadUI(["misc/PositionPicker"], PositionPicker => {
          let positionPicker = new PositionPicker({
            mode: "dragMarker",
            map: map,
            iconStyle: {
              url: "../../static/img/iocna.png",
              size: [1, 1],
              ancher: [1, 1]
            }
          });
          pathSimplifierIns = new PathSimplifier({
            zIndex: 100,
            map: map,
            getHoverTitle: function(pathData, pathIndex, pointIndex) {
              if (pointIndex >= 0) {
                return "第" + pointIndex + "个点";
              }
            },
            getPath: function(pathData, pathIndex) {
              return pathData.path;
            },
            renderOptions: {
              pathLineStyle: {
                strokeStyle: "rgb(193,21,52)",
                lineWidth: 6,
                dirArrowStyle: true
              },
              keyPointTolerance: 10,
              keyPointStyle: {
                radius: 3,
                fillStyle: "#20acff"
              }
            }
          });
          pathSimplifierIns.on("pointClick", function(e, info) {
            let pointIndex = info.pointIndex;
            let pathData = info.pathData;
            let point = pathData.path[pointIndex];
            let position = new AMap.LngLat(point[0], point[1]);
            positionPicker.start(position);
            positionPicker.on("success", result => {
              var info = [];
              info.push(`<div><div>时间：${trakTimeformat(point[2])}</div>`);
              info.push(
                `<div style="font-size:14px;">路口 :${
                  result.nearestJunction
                }</div>`
              );
              info.push(
                `<div style="font-size:14px;">地址 :${
                  result.address
                }</div></div>`
              );
              infoWindow = new AMap.InfoWindow({
                content: info.join("<br/>") // 使用默认信息窗体框样式，显示信息内容
              });
              infoWindow.open(map, position);
              map.on("click", () => {
                infoWindow.close();
              });
            });
          });
          window.pathSimplifierIns = pathSimplifierIns;
          pathSimplifierIns.setData([
            {
              name: "轨迹",
              path: travelData
            }
          ]);
          let distance = Number(this.alldistance) / 1000; // 米转成千米
          let times = Number(this.timeSeconds) / 3600; // 秒转成小时
          let speeds = Math.ceil(distance / times); // 最终得到的速度是 km/h
          navg = pathSimplifierIns.createPathNavigator(0, {
            loop: true,
            speed: speeds,
            pathNavigatorStyle: {
              width: 12,
              height: 18,
              strokeStyle: null,
              fillStyle: null,
              // 使用图片
              content: PathSimplifier.Render.Canvas.getImageContent(
                "../../../../static/img/car.png"
              )
            }
          });
        });
        let startPot = travelData[0];
        let endPot = travelData[travelData.length - 1];
        let start = new AMap.Marker({
          map: map,
          position: [startPot[0], startPot[1]], // 基点位置  开始位置
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/start.png",
          zIndex: 50
        });
        let end = new AMap.Marker({
          map: map,
          position: [endPot[0], endPot[1]], // 基点位置  结束位置
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/end.png",
          zIndex: 10
        });
      });
    },
    init() {
      map = new AMap.Map("historyContent", {
        resizeEnable: true,
        zoom: 10
      });
      this.positionChange();
    }
  },
  beforeDestroy() {
    map = null;
    pathSimplifierIns = null;
    navg = null;
  }
};
</script>
<style lang="scss" scoped>
.historyContent {
  width: 100%;
  height: 450px;
}
</style>

