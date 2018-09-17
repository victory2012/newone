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
      markerArr: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    positionChange(data) {
      if (!data || data.length < 1) {
        return;
      }
      if (this.markerArr.length > 0) {
        map.remove(this.markerArr);
      }
      pathSimplifierIns && pathSimplifierIns.hide();
      AMapUI.load(["ui/misc/PathSimplifier"], PathSimplifier => {
        // console.log(PathSimplifier);
        if (!PathSimplifier.supportCanvas) {
          alert("当前环境不支持 Canvas！");
          return;
        }
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
        // window.pathSimplifierIns = pathSimplifierIns;
        pathSimplifierIns.setData([
          {
            name: "轨迹",
            path: data
          }
        ]);
        navg = pathSimplifierIns.createPathNavigator(0, {
          loop: true,
          speed: 5000,
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
        let startPot = data[0];
        let endPot = data[data.length - 1];
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
      this.setData(data);
    },
    setData(data) {
      console.log(pathSimplifierIns);
      // pathSimplifierIns.setData({
      //   name: "轨迹",
      //   path: data
      // });
    },
    init() {
      map = new AMap.Map("historyContent", {
        resizeEnable: true,
        zoom: 10
      });
      this.positionChange();
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
    }
  },
  destroyed() {
    console.log("destroyed");
    pathSimplifierIns.clearPathNavigators();
    map.destroy();
    pathSimplifierIns = null;
    map = null;
  }
};
</script>
<style lang="scss" scoped>
.historyContent {
  width: 100%;
  height: 450px;
}
</style>

