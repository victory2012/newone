<template>
  <div>
    <div class="date">

      <el-button size="mini" plain @click="startOnclick" title="开始">
        <i class="iconfont icon-ic_song_next"></i>
      </el-button>
      <el-button size="mini" plain @click="pauseOnclick" title="暂停">
        <i class="iconfont icon-artboard25copy"></i>
      </el-button>
      <el-button size="mini" plain @click="resumeOnclick" title="继续">
        <i class="iconfont icon-icons-resume_button"></i>
      </el-button>
      <el-button size="mini" plain @click="stopOnclick" title="停止">
        <i class="iconfont icon-stop"></i>
      </el-button>

    </div>
    <div class="timeRange">
      <span>时间(s)</span>
      <el-slider v-model="timeSeconds" @change="speedChange" vertical height="200px">
      </el-slider>
    </div>
    <div id="historyContent" class="historyContent"></div>
  </div>
</template>
<script>
/* eslint-disable */
import AMap from "AMap";
import AMapUI from "AMapUI";

let map;
let pathSimplifierIns;
let navg;
let infoWindow;
let heatmap;
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
        console.log("component map", vals);
        this.positionChange(vals);
      },
      deep: true
    }
  },
  data() {
    return {
      markerArr: [],
      timeSeconds: 50,
      alldistance: 0
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    /* 轨迹相关方法 */
    positionChange(travalData) {
      if (!travalData || travalData.length < 1) {
        return;
      }
      console.log(travalData);
      if (this.markerArr.length > 0) {
        map.remove(this.markerArr);
      }
      this.alldistance = 0;
      for (let i = 0; i < travalData.length; i++) {
        var distance, p1, p2;
        let key = travalData[i];
        if (i < travalData.length - 1) {
          p1 = new AMap.LngLat(key[0], key[1]);
          p2 = new AMap.LngLat(travalData[i + 1][0], travalData[i + 1][1]);
          distance = Math.round(p1.distance(p2));
        }
        this.alldistance += distance;
      }
      pathSimplifierIns && pathSimplifierIns.setData([]);
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
            // console.log("point=>>>>>>>>>>>>>>", point);
            let position = new AMap.LngLat(point[0], point[1]);
            positionPicker.start(position);
            positionPicker.on("success", result => {
              var info = [];
              info.push(`<div><div>时间：${utils.dateFomat(point[2])}</div>`);
              // info.push(
              //   `<div style="font-size:14px;">路口 :${
              //     result.nearestJunction
              //   }</div>`
              // );
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
              path: travalData
            }
          ]);
          console.log("this.lineArr", pathSimplifierIns);
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
        let startPot = travalData[0];
        let endPot = travalData[travalData.length - 1];
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
        this.markerArr.push(start);
        this.markerArr.push(end);
      });
    },
    init() {
      map = new AMap.Map("historyContent", {
        resizeEnable: true,
        zoom: 10
      });
      // this.positionChange();
    },
    // 开始运动
    startOnclick() {
      navg && navg.start();
    },
    // 暂停运动
    pauseOnclick() {
      navg && navg.pause();
    },
    // 继续运动
    resumeOnclick() {
      navg && navg.resume();
    },
    // 停止运动
    stopOnclick() {
      navg && navg.stop();
      // map.clearMap();
    },
    /* 设置速度 */
    speedChange() {
      if (this.timeSeconds < 1) {
        this.timeSeconds = 1;
      }
      let distance = Number(this.alldistance) / 1000;
      let times = Number(this.timeSeconds) / 3600;
      let speeds = Math.ceil(distance / times);
      navg.setSpeed(speeds);
    }
  }
  // destroyed() {
  //   console.log("destroyed");
  //   pathSimplifierIns.clearPathNavigators();
  //   map.destroy();
  //   pathSimplifierIns = null;
  //   map = null;
  // }
};
</script>
<style lang="scss" scoped>
.historyContent {
  width: 100%;
  height: 450px;
}
</style>

