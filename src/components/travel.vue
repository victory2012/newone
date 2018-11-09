<template>
  <div class="maps">
    <div class="date">
      <el-button v-show="!trajectory"
        size="mini"
        plain
        @click="startOnclick"
        :title="$t('history.start')">
        <i class="iconfont icon-ic_song_next"></i>
      </el-button>
      <el-button v-show="!trajectory"
        size="mini"
        plain
        @click="pauseOnclick"
        :title="$t('history.pause')">
        <i class="iconfont icon-artboard25copy"></i>
      </el-button>
      <el-button v-show="!trajectory"
        size="mini"
        plain
        @click="resumeOnclick"
        :title="$t('history.continue')">
        <i class="iconfont icon-icons-resume_button"></i>
      </el-button>
      <el-button v-show="!trajectory"
        size="mini"
        plain
        @click="stopOnclick"
        :title="$t('history.stop')">
        <i class="iconfont icon-stop"></i>
      </el-button>
      <!-- 活动热区 -->
      <el-button v-show="!trajectory"
        type="danger"
        size="small"
        @click="heat">{{$t('history.heatActive')}}</el-button>
      <!-- 轨迹回放 -->
      <el-button v-show="trajectory"
        type="primary"
        size="mini"
        @click="posi">{{$t('history.TrackReplay')}}</el-button>
    </div>
    <div class="timeRange"
      v-show="!trajectory">
      <span>{{$t('history.times')}}(s)</span>
      <el-slider v-model="timeSeconds"
        @change="speedChange"
        vertical
        height="200px">
      </el-slider>
    </div>
    <div id="historyContent"
      class="historyContent"></div>
  </div>
</template>
<script>
/* eslint-disable */
import AMap from "AMap";
import AMapUI from "AMapUI";
import utils from "@/utils/utils";
import t from "@/utils/translate";

let map;
let pathSimplifierIns;
let navg;
let infoWindow;
let heatmap;
export default {
  props: {
    travelData: {
      type: Object,
      default: () => {
        return {
          travel: [],
          heatmap: []
        };
      }
    }
  },
  watch: {
    travelData: {
      handler: function (vals) {
        if (this.trajectory) {
          this.heatMapFun(vals.heatmap);
        } else {
          this.positionChange(vals.travel);
        }
      },
      deep: true
    }
  },
  data () {
    return {
      trajectory: true,
      markerArr: [],
      timeSeconds: 50,
      alldistance: 0
    };
  },
  mounted () {
    this.mapInit();
  },
  methods: {
    mapInit () {
      const lang = localStorage.getItem('locale') === 'en' ? 'en' : 'zh_cn';
      map = new AMap.Map("historyContent", {
        resizeEnable: true,
        zoom: 10,
        lang: lang
      });
      AMap.plugin(["AMap.Heatmap"], () => {
        // 初始化heatmap对象
        heatmap = new AMap.Heatmap(map, {
          radius: 12, // 给定半径
          opacity: [0, 1] // 透明度
        });
      });
    },
    heat () {
      this.heatMapFun(this.travelData.heatmap);
    },
    posi () {
      this.positionChange(this.travelData.travel);
    },
    /* 热力图 方法 */
    heatMapFun (heatData) {
      this.trajectory = true;
      if (!heatData[0] || !heatData[0].lng) {
        return;
      }
      if (this.markerArr.length > 0) {
        // 显示热力图的时候 删除地图上的marker点
        map.remove(this.markerArr);
      }
      pathSimplifierIns && pathSimplifierIns.setData([]); // 同理 去除轨迹
      map.setCenter([heatData[0].lng, heatData[0].lat]); // 显示热力图的时候，把热力图的第一个的 作为地图中心点
      heatmap.setDataSet({
        data: heatData
      });
    },
    /* 轨迹相关方法 */
    positionChange (positions) {
      this.trajectory = false;
      heatmap && heatmap.setDataSet({ data: [] });
      if (!positions || positions.length < 1) {
        return;
      }
      if (this.markerArr.length > 0) {
        // 先删除地图上的marker点 然后在后面添加
        map.remove(this.markerArr);
      }
      this.alldistance = 0; // 两个点之间的距离
      for (let i = 0; i < positions.length; i++) {
        var distance, p1, p2;
        let key = positions[i];
        if (i < positions.length - 1) {
          p1 = new AMap.LngLat(key[0], key[1]);
          p2 = new AMap.LngLat(positions[i + 1][0], positions[i + 1][1]);
          distance = Math.round(p1.distance(p2));
        }
        this.alldistance += distance;
      }
      AMapUI.load(["ui/misc/PathSimplifier"], PathSimplifier => {
        AMapUI.loadUI(["misc/PositionPicker"], PositionPicker => {
          let positionPicker = new PositionPicker({
            mode: "dragMarker",
            map: map,
            iconStyle: {
              // url: "http://pfsm46mq4.bkt.clouddn.com/iocna.png",
              size: [1, 1],
              ancher: [1, 1]
            }
          });
          pathSimplifierIns = new PathSimplifier({
            zIndex: 100,
            map: map,
            getHoverTitle: function (pathData, pathIndex, pointIndex) {
              if (pointIndex >= 0) {
                return `${t("history.No")} ${pointIndex} ${t(
                  "history.point"
                )}`;
              }
            },
            getPath: function (pathData, pathIndex) {
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
          pathSimplifierIns.on("pointClick", function (e, info) {
            let pointIndex = info.pointIndex;
            let pathData = info.pathData;
            let point = pathData.path[pointIndex];
            let position = new AMap.LngLat(point[0], point[1]);
            positionPicker.start(position);
            positionPicker.on("success", result => {
              var info = [];
              info.push(
                `<div><div>${t("history.times")}：${utils.dateFomat(
                  point[2]
                )}</div>`
              );
              info.push(
                `<div style="font-size:14px;">${t("positions.address")} :${
                result.address
                }</div></div>`
              );
              infoWindow = new AMap.InfoWindow({
                content: info.join("<br/>")
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
              name: t("history.track"),
              path: positions
            }
          ]);
          // console.log("this.lineArr", this.lineArr);
          let distance = Number(this.alldistance) / 1000; // 米转成千米
          let times = Number(this.timeSeconds) / 3600; // 秒转成小时
          let speeds = Math.ceil(distance / times); // 最终得到的速度是 km/h
          let carUrl =
            process.env.pack_ENV === "test" || process.env.pack_ENV === "prod"
              ? "../../static/img/0181102120349.png"
              : "../../pc/static/img/0181102120349.png";
          navg = pathSimplifierIns.createPathNavigator(0, {
            loop: true,
            speed: speeds,
            pathNavigatorStyle: {
              width: 30,
              height: 30,
              strokeStyle: null,
              fillStyle: null,
              // 使用图片
              content: PathSimplifier.Render.Canvas.getImageContent(carUrl)
            }
          });
        });
        let startPot = positions[0];
        let endPot = positions[positions.length - 1];
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
    // 开始运动
    startOnclick () {
      navg && navg.start();
    },
    // 暂停运动
    pauseOnclick () {
      navg && navg.pause();
    },
    // 继续运动
    resumeOnclick () {
      navg && navg.resume();
    },
    // 停止运动
    stopOnclick () {
      navg && navg.stop();
      // map.clearMap();
    },
    /* 设置速度 */
    speedChange () {
      if (this.timeSeconds < 1) {
        this.timeSeconds = 1;
      }
      let distance = Number(this.alldistance) / 1000;
      let times = Number(this.timeSeconds) / 3600;
      let speeds = Math.ceil(distance / times);
      navg.setSpeed(speeds);
    }
  },
  destroyed () {
    map.destroy();
    pathSimplifierIns && pathSimplifierIns.setData();
  }
};
</script>
<style lang="scss" scoped>
.maps {
  position: relative;
  background: #ffffff;
  padding: 24px;
  height: 450px;
  .date {
    position: absolute;
    top: 25px;
    right: 25px;
    background: #ffffff;
    z-index: 10;
    padding: 5px;
    border-radius: 3px;
    border: 1px solid #e5e5e5;
  }
  .timeRange {
    position: absolute;
    top: 70px;
    right: 25px;
    background: #ffffff;
    z-index: 10;
    padding: 5px;
    font-size: 12px;
    border-radius: 3px;
    border: 1px solid #e5e5e5;
  }
  .historyContent {
    width: 100%;
    height: 450px;
  }
}
</style>

