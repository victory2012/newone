<template>
  <div class="history">
    <div class="timeBar">
      <span class="lables">从</span>
      <el-date-picker class="queryTime" :class="{'timeSelect': !defaultGray}" @focus="timeChanges" size="small" v-model="start" type="date" placeholder="选择日期"></el-date-picker>
      <span class="lable">至</span>
      <el-date-picker class="queryTime" :class="{'timeSelect': !defaultGray}" @focus="timeChanges" size="small" v-model="end" type="date" placeholder="选择日期"></el-date-picker>
      <el-select class="queryTime" :class="{'timeSelect': defaultGray}" size="small" @change="changeTime" @focus="selectTimeChanges" v-model="timevalue" placeholder="请选择">
        <el-option v-for="item in weekOption" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button @click="getChartData" class="queryBtn" size="small" type="primary">确定</el-button>
    </div>
    <div class="btns">
      <div class="btns-item">
        <el-button :type="btnTypeDown" :disabled="narrowBtn" plain @click="narrow" icon="el-icon-remove-outline"></el-button>
        <el-button :type="btnTypeUp" :disabled="enlargeBtn" plain @click="enlarge" icon="el-icon-circle-plus-outline"></el-button>
      </div>
      <div class="btns-item">
        <el-button type="primary" plain @click="exportExcel">导出Excel</el-button>
      </div>
    </div>
    <echart-map :chartData="dataObj" :loading="loading" @timeZoom="timeZoom"></echart-map>
    <div class="batteryChart">
      <div class="addbattery">
        <ul>
          <li>
            <p class="history_count_val">{{summary.cycle || 0}}</p>
            <p>电池循环次数</p>
          </li>
          <li>
            <p class="history_count_val">{{summary.chargeDuration || 0}}</p>
            <p>充电时间(h)</p>
          </li>
          <li>
            <p class="history_count_val">{{summary.dischargeDuration || 0}}</p>
            <p>放电时间(h)</p>
          </li>
          <li>
            <p class="history_count_val">{{summary.avgChargeDuration || 0}}</p>
            <p>平均充电时间(h)</p>
          </li>
          <li>
            <p class="history_count_val">{{summary.avgDischargeDuration || 0}}</p>
            <p>平均放电时间(h)</p>
          </li>
          <li>
            <p class="history_count_val">{{summary.fluidSupplementTimes || 0}}</p>
            <p>补水次数</p>
          </li>
          <li>
            <p class="history_count_val">{{summary.avgFluidSupplementDuration || 0}}</p>
            <p>平均补水时长(h)</p>
          </li>
        </ul>
      </div>
      <chart-pie :loading="loading" :peiData="peiObj"></chart-pie>
    </div>
    <div class="alarmTab">
      <div class="tabInfo">
        <a :class="{'active': active === 'alarm'}" @click="historAlarm">历史告警</a>
        <span class="divider"></span>
        <a :class="{'active': active === 'liquid'}" @click="historyLiquid">历史补水</a>
      </div>
    </div>
    <div class="tables">
      <i-alarm :alarmData="alarmData" v-show="active === 'alarm'"></i-alarm>
      <liquid :liquidData="liquidData" v-show="active === 'liquid'"></liquid>
      <div class="page">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" layout="prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </div>
    <div class="maps">
      <!-- <i-map :travelData="positions"></i-map> -->
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
  </div>
</template>
<script>
/* eslint-disable */
import AMap from "AMap";
import utils from "@/utils/utils";
import echartMap from "../../components/historyChart";
import iEchart from "../../components/echart";
import iAlarm from "../../components/alarm-data";
// import iMap from "../../components/travel";
import chartPie from "../../components/echartPie";
import liquid from "../../components/alarm-liquid";
import lnglatTrabsofor from "@/utils/longlatTransfor";

let map;
let pathSimplifierIns;
let navg;
let infoWindow;
let geocoder;
let address;
export default {
  props: ["hostObj", "propData"],
  components: {
    chartPie,
    echartMap,
    iEchart,
    iAlarm,
    // iMap,
    liquid
  },
  data() {
    return {
      btnTypeDown: "info",
      btnTypeUp: "info",
      narrowBtn: true,
      enlargeBtn: true,
      alldistance: 0,
      timeSeconds: 50,
      markerArr: [],
      defaultGray: true,
      active: "alarm",
      hasgetData: false,
      loading: false,
      eventSummary: {},
      summary: {},
      peiObj: {
        eventSummary: {},
        summary: {}
      },
      dataObj: {
        timeArr: [],
        singleVoltage: [],
        temperature: [],
        voltage: [],
        current: []
      },
      positions: [],
      start: utils.getWeek(),
      end: new Date(),
      timevalue: "week",
      weekOption: [
        {
          value: "week",
          label: "最近一周"
        },
        {
          value: "mounth",
          label: "最近一月"
        },
        {
          value: "threemonth",
          label: "最近三个月"
        },
        {
          value: "sixmounth",
          label: "最近六个月"
        },
        {
          value: "year",
          label: "最近一年"
        },
        {
          value: "all",
          label: "全生命周期"
        }
      ],
      defaultGet: true,
      pageSize: 10,
      currentPage: 1,
      total: 0,
      alarmData: [],
      liquidData: [],
      zoomArr: [],
      waterLastOneTime: {},
      resultList: []
    };
  },
  mounted() {
    this.getChartData();
    this.mapInit();
  },
  destroyed() {
    map.destroy();
    pathSimplifierIns.setData([]);
    this.waterLastOneTime = {};
  },
  methods: {
    mapInit() {
      map = new AMap.Map("historyContent", {
        resizeEnable: true,
        zoom: 10
      });
      geocoder = new AMap.Geocoder({
        radius: 1000 // 范围，默认：500
      });
    },
    timeChanges() {
      this.defaultGray = true;
    },
    selectTimeChanges() {
      this.defaultGray = false;
    },
    /* 确认按钮 */
    getChartData() {
      // utils.endTime(new Date())
      let startTime = utils.toUTCTime(utils.startTime(this.start));
      let endTime = utils.toUTCTime(utils.endTime(this.end));
      // console.log(startTime);
      // console.log(endTime);
      this.getChartDatafun(startTime, endTime);
    },
    /* 获取Echart相关数据 以及 地图坐标 */
    getChartDatafun(startTime, endTime) {
      this.loading = true;
      let endTimes = `${endTime}`.length > 8 ? endTime : `${endTime}235959`;
      if (!this.hostObj.hostId || !this.hostObj.device) {
        return;
      }
      this.$axios
        .get(
          `/battery_group/${this.hostObj.hostId}/${
            this.hostObj.device
          }/data2?startTime=${startTime}&endTime=${endTimes}`
        )
        .then(res => {
          this.dataObj = {
            timeArr: [],
            singleVoltage: [],
            temperature: [],
            voltage: [],
            current: []
          };
          if (res.data && res.data.code === 0) {
            let result = res.data.data;
            this.exportData = result.list;
            // this.positions = [];
            let positions = [];
            this.resultList = result.list;
            if (this.resultList.length < 300) {
              this.btnTypeUp = "info";
              this.enlargeBtn = true;
            }
            this.resultList.forEach((key, index) => {
              let timeArr = utils.TimeSconds(key.time); // 时间
              this.dataObj.singleVoltage.push({
                name: timeArr,
                value: [timeArr, key.singleVoltage]
              });
              this.dataObj.temperature.push({
                name: timeArr,
                value: [timeArr, key.temperature]
              });
              this.dataObj.voltage.push({
                name: timeArr,
                value: [timeArr, key.voltage]
              });
              this.dataObj.current.push({
                name: timeArr,
                value: [timeArr, -key.current]
              });
              let gcjLongitude = Number(key.gcjLongitude);
              let gcjLatitude = Number(key.gcjLatitude);
              if (
                gcjLongitude > -180 &&
                gcjLatitude > -90 &&
                gcjLatitude <= 90 &&
                gcjLongitude <= 180 &&
                Math.abs(gcjLongitude) > 1 &&
                Math.abs(gcjLatitude) > 1
              ) {
                positions.push([key.gcjLongitude, key.gcjLatitude, timeArr]); // 坐标
              }
            });
            this.enlargeBtn = true; // 放大按钮禁止
            this.btnTypeUp = "info"; // 修改el-button的type
            this.loading = false;
            let sums = result.summary;
            this.eventSummary = result.eventSummary || {};
            this.summary = {
              chargeDuration: (sums.chargeDuration / 60).toFixed(2),
              dischargeDuration: (sums.dischargeDuration / 60).toFixed(2),
              cycle: sums.cycle,
              avgChargeDuration: (+sums.avgChargeDuration / 60).toFixed(2),
              avgDischargeDuration: (+sums.avgDischargeDuration / 60).toFixed(
                2
              ),
              fluidSupplementTimes: sums.fluidSupplementTimes,
              avgFluidSupplementDuration: (
                sums.avgFluidSupplementDuration / 60
              ).toFixed(2),
              idleDuration: (sums.idleDuration / 60).toFixed(2)
            };
            this.peiObj.eventSummary = result.eventSummary || {};
            this.peiObj.summary = this.summary || {};
            this.positionChange(positions);
          }
        });
      this.getAlarmData();
    },
    /* 轨迹相关方法 */
    positionChange(travalData) {
      if (!travalData || travalData.length < 1) {
        return;
      }
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
          // console.log("this.lineArr", this.lineArr);
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
    },
    /* 快速选择日期 */
    changeTime() {
      if (this.timevalue === "week") {
        this.start = utils.getWeek();
      }
      if (this.timevalue === "mounth") {
        this.start = utils.getMouth();
      }
      if (this.timevalue === "threemonth") {
        this.start = utils.getThreeMounth();
      }
      if (this.timevalue === "sixmounth") {
        this.start = utils.getSixMounth();
      }
      if (this.timevalue === "year") {
        this.start = utils.getYear();
      }
      if (this.timevalue === "all") {
        this.start = "2000-01-01";
      }
    },
    /* 分页方法 */
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.active === "alarm") {
        this.getAlarmData();
      } else {
        this.getliquidData();
      }
    },
    /* 历史补水 */
    getliquidData() {
      let startTime = utils.sortTime(this.start);
      let endTime = utils.sortTime(this.end);
      let pageObj = {
        pageSize: 10,
        pageNum: this.currentPage,
        startTime: `${startTime}000000`,
        endTime: `${endTime}235959`
      };
      this.$axios
        .get(
          `/battery_group/${this.hostObj.hostId}/${this.hostObj.device}/fluid`,
          pageObj
        )
        .then(res => {
          console.log(res);
          if (res.data && res.data.code === 0) {
            let result = res.data.data;
            if (result) {
              this.total = result.total;
              this.liquidData = [];
              if (result.pageData.length > 0) {
                result.pageData.forEach((key, index) => {
                  let position = new AMap.LngLat(
                    key.gcjLongitude,
                    key.gcjLatitude
                  );
                  lnglatTrabsofor(position, res => {
                    // console.log(res);
                    key.address = res || "-";
                    key.updateWater = utils.Days(
                      key.lastFluidSupplementDuration
                    );
                    key.temperature = `${key.temperature}°C`;
                    key.Replenishing = utils.UTCTime(key.time);

                    this.liquidData.push(key);
                  });
                });
              }
            }
          }
        });
    },
    /* 历史告警 */
    getAlarmData() {
      let startTime = utils.sortTime(this.start);
      let endTime = utils.sortTime(this.end);
      let pageObj = {
        pageSize: 10,
        pageNum: this.currentPage
      };
      this.$axios
        .get(
          `/battery_group_event?hostId=${
            this.hostObj.hostId
          }&startTime=${startTime}000000&endTime=${endTime}235959`,
          pageObj
        )
        .then(res => {
          // console.log(res);
          if (res.data && res.data.code === 0) {
            let result = res.data.data;
            if (result) {
              this.total = result.total;
              this.alarmData = [];
              if (result.pageData.length > 0) {
                // this.alarmData = result.pageData;
                result.pageData.forEach(key => {
                  // key.alarmtime = utils.fomats(key.time);
                  key.levels = utils.level(key.level);
                  key.hierarchy = key.hierarchy === "Group" ? "整组" : "单体";
                  key.items = utils.item(key.item);
                  if (key.item === "Fluid") {
                    key.thresholdValue = "-";
                    key.actualValue = "异常";
                  }
                  this.alarmData.push(key);
                });
              }
            }
          }
        });
    },
    historAlarm() {
      this.currentPage = 1;
      this.total = 0;
      this.active = "alarm";
    },
    historyLiquid() {
      this.active = "liquid";
      this.total = 0;
      this.currentPage = 1;
      this.getliquidData();
    },
    timeZoom(data) {
      // console.log(data);
      this.zoomBar = data;
      if (
        this.resultList.length >= 300 &&
        (data.batchStart !== 0 || data.batchEnd !== 100)
      ) {
        this.enlargeBtn = false;
        this.btnTypeUp = "primary";
      } else {
        this.enlargeBtn = true;
        this.btnTypeUp = "info";
      }
    },
    /* 缩小 */
    narrow() {
      if (!this.zoomBar || this.Timeindex < -2) {
        return;
      }
      if (this.Timeindex === -1) {
        // this.getChartDatafun(this.zoomArr[0].start, this.zoomArr[0].end);
        this.getChartData();
        this.zoomArr = [];
        this.btnTypeDown = "info";
        this.narrowBtn = true;
        this.btnTypeUp = "info";
        this.enlargeBtn = true;
        // this.Timeindex--;
      } else {
        let timeObj = this.zoomArr[this.Timeindex];
        this.getChartDatafun(timeObj.start, timeObj.end);
        this.zoomArr.pop();
        this.Timeindex--;
      }
      // console.log("this.zoomArr", this.zoomArr);
    },
    /* 放大 */
    enlarge() {
      if (
        !this.zoomBar &&
        (this.zoomBar.batchEnd === 100 && this.zoomBar.batchStart === 0)
      ) {
        return;
      }
      this.btnTypeDown = "primary";
      this.narrowBtn = false;
      // _m.utc().format()new Date("2018-09-11 15:12:05").toISOString()
      let obj = {
        start: utils.toUTCTime(this.zoomBar.tstart),
        end: utils.toUTCTime(this.zoomBar.tend)
      };
      this.zoomArr.push(obj);
      console.log("this.zoomArr", this.zoomArr);
      this.getChartDatafun(obj.start, obj.end);
      let len = this.zoomArr.length;
      this.Timeindex = len - 2;
    },
    /* 导出 Excel */
    exportExcel() {
      // console.log(this.exportData);
      let storage = JSON.parse(utils.getStorage("loginData"));
      let arr = [
        ["制表时间", new Date()],
        ["制表人", `${storage.companyName}-${storage.account}`],
        [
          "设备编号",
          this.propData.deviceCode,
          "电池组编号",
          this.propData.code
        ],
        ["时间", "温度", "电压", "电流", "单体电压"]
      ];
      this.$messageBox
        .prompt("请输入导出文件名", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
        .then(({ value }) => {
          if (!value) {
            this.$message("请输入文件名");
          } else {
            if (this.exportData.length < 1) return;
            this.exportData.forEach(key => {
              let opts = [
                utils.UTCTime(key.time),
                key.temperature,
                key.voltage,
                key.current,
                key.singleVoltage
              ];
              arr.push(opts);
            });
            this.$outputXlsxFile(arr, value);
          }
          // this.$outputXlsxFile(arr, value);
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss">
.history {
  box-sizing: border-box;
  border-radius: 5px;
  .timeBar {
    padding: 24px;
    background: #ffffff;
    // margin-bottom: 60px;
    .lables {
      display: inline-block;
      text-align: right;
      color: #484848;
      font-size: 13px;
      margin-right: 15px;
      width: 8.5%;
    }
    .lable {
      color: #484848;
      font-size: 13px;
      margin: 0 5px;
    }
    .queryTime {
      width: 21%;
    }
    .timeSelect {
      .el-input__inner {
        color: #e5e5e5;
      }
    }
    .queryBtn {
      margin-left: 20px;
    }
  }
  .charts {
    box-sizing: border-box;
    padding: 24px;
    background: #ffffff;
    // margin-bottom: 20px;
    width: 100%;
    display: flex;
    .info {
      flex: 1;
      height: 400px;
    }
  }
  .batteryChart {
    background: #ffffff;
    padding: 24px;
  }
  .addbattery {
    background: #ffffff;
    padding: 24px 0;
    ul {
      display: flex;
      li {
        flex: 1;
        text-align: center;
        p {
          height: 19px;
          font-size: 15px;
          font-weight: 600;
          color: #484848;
          &.history_count_val {
            height: 24px;
            font-size: 18px;
            margin-bottom: 8px;
          }
        }
      }
    }
  }
  .circel {
    background: #ffffff;
    padding: 24px 0;
    display: flex;
    .circelInfo {
      flex: 1;
      height: 400px;
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
  .alarmTab {
    margin: 20px;
    .tabInfo {
      width: 330px;
      background: #fff;
      padding: 15px 0;
      border-radius: 10px;
      margin: 0 auto;
      a {
        width: 152px;
        font-size: 14px;
        text-align: center;
        display: inline-block;
        cursor: pointer;
        color: #bfbfbf;
        &.active {
          color: #484848;
        }
      }
      .divider {
        margin: 0 6px;
        display: inline-block;
        height: 8px;
        width: 1px;
        background: #ccc;
      }
    }
  }
  .tables {
    background: #ffffff;
    padding: 24px;
    margin-bottom: 20px;
  }
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
  .pb {
    padding-bottom: 50px;
    border-bottom: 1px solid #d7d7d7;
    margin-bottom: 50px;
  }
  .pt {
    padding-top: 60px;
  }
  .page {
    padding-top: 20px;
    text-align: right;
  }
  .btns {
    display: flex;
    justify-content: space-between;
    .btns-item {
      flex: 1;
      padding-left: 50px;
      &:nth-last-child(1) {
        text-align: right;
        padding-right: 50px;
      }
    }
  }
}
</style>
