<template>
  <div class="center">
    <div class="dashboad">
      <div>
        <img src="../../assets/img/temp.png" alt="">
        <p class="info">{{propData.temperature}}℃</p>
        <p>温度</p>
      </div>
      <div>
        <img src="../../assets/img/level.png" alt="">
        <p class="info">{{propData.fluid}}</p>
        <p>液位</p>
      </div>
      <div>
        <img src="../../assets/img/voltage_total.png" alt="">
        <p class="info">{{propData.voltage}}V</p>
        <p>电压</p>
      </div>
      <div>
        <img src="../../assets/img/voltage.png" alt="">
        <p class="info">{{propData.singleVoltage}}V</p>
        <p>单体电压</p>
      </div>
      <div>
        <img src="../../assets/img/current.png" alt="">
        <p class="info">{{propData.current}}A</p>
        <p>电流</p>
      </div>
    </div>
    <div class="warrp">
      <div class="map">
        <div class="mapCenter">
          <div class="mapContent" id="mapContent"></div>
        </div>
        <div class="timeCenter">
          <p class="map-time">{{propData.hhmmss}}</p>
          <p class="map-date">{{propData.yyddmm}}</p>
          <p class="map-des">刷新时间</p>
          <p @click="activeQuery" class="map-line">主动查询</p>
        </div>
      </div>
      <div class="address">
        <div>
          <img width="21px" src="../../assets/img/me.png" alt="">
          <span>{{propData.companyName}}</span>
        </div>
        <div>
          <img width="22px" src="../../assets/img/address.png" alt="">
          <span>{{propData.address}}</span>
        </div>
        <div>
          <img width="25px" src="../../assets/img/battery.png" alt="">
          <span>{{propData.code}}</span>
        </div>
        <div>
          <img width="26px" src="../../assets/img/device.png" alt="">
          <span>{{propData.deviceCode}}</span>
        </div>
        <div>
          <img width="25px" src="../../assets/img/device-flesh.png" alt="">
          <span>{{propData.version}}</span>
        </div>
      </div>
    </div>
    <div class="my-map-divider">
      <span>过去24小时监测数据</span>
      <el-checkbox v-model="checked">是否自动更新数据</el-checkbox>
    </div>
    <echart-map v-if="hasgetData" :chartData="dataObj" :mqttData="ReceiveObj"></echart-map>
  </div>
</template>
<script>
/* eslint-disable */
import AMap from "AMap";
import Paho from "Paho";
import utils from "@/utils/utils";
import echartMap from "../../components/realTime";
import mqttConfig from "@/api/mqtt.config";

let mqttClient;
let map;
export default {
  props: ["hostId", "propData"],
  components: {
    echartMap
  },
  data() {
    return {
      ReceiveObj: {},
      hasgetData: false,
      checked: true,
      mapData: null,
      dataObj: {
        timeArr: [],
        singleVoltage: [],
        temperature: [],
        voltage: [],
        current: []
      },
      companyInfo: {}
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    if (mqttClient) {
      mqttClient.disconnect();
    }
  },
  methods: {
    init() {
      map = new AMap.Map("mapContent", {
        resizeEnable: true,
        // center: [this.propData.gcjLongitude, this.propData.gcjLatitude],
        zoom: 10
      });
      setTimeout(() => {
        if (this.propData.gcjLongitude) {
          let marker = new AMap.Marker({
            icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            position: [this.propData.gcjLongitude, this.propData.gcjLatitude]
          });
          map.on("zoomend", () => {
            map.getCity(data => {
              console.log(data);

              // if (data["province"] && typeof data["province"] === "string") {
              //   document.getElementById("info").innerHTML =
              //     "城市：" + (data["city"] || data["province"]);
              // }
            });
          });
          marker.setMap(map);
          map.setFitView();
        }
      }, 800);
      // map.setCenter();
      this.getData();
    },
    connectMqtt() {
      mqttClient = new Paho.MQTT.Client(
        mqttConfig.hostname,
        mqttConfig.port,
        mqttConfig.clientId
      );
      mqttClient.connect({
        onSuccess: this.onConnect
      });
      mqttClient.onConnectionLost = responseObject => {
        console.log("onConnectionLost:", responseObject);
      };
      mqttClient.onMessageArrived = message => {
        console.log("message:", message);
        let payload = message.payloadString;
        if (payload) {
          console.log(payload);
          let payloadType = payload.toString().split("]");
          if (payloadType[1]) {
            console.log("有ccid");
            // console.log("payloadType", payloadType);
          } else {
            let payloadString = JSON.parse(payload);
            this.ReceiveObj = {
              times: utils.TimeSconds(payloadString[1]), // 时间
              singleVoltage: payloadString[3], // 单体电压
              voltage: payloadString[4], // 电压
              current: payloadString[5], // 电流
              temperature: payloadString[6], // 温度
              liquid: payloadString[7], // 液位
              longitude: payloadString[8], // 经度
              latitude: payloadString[9], // 纬度
              loop: payloadString[10], // 循环次数
              chargeingTime: payloadString[11], // 充电时间
              chargeTimes: payloadString[12], // 充电次数
              disChargeingTime: payloadString[13], // 放电时间
              disChargeTimes: payloadString[14], // 放电次数
              emptyTime: payloadString[15], // 空截时间
              addLiquidingTime: payloadString[16], // 补水时间
              addLiquidTimes: payloadString[17], // 补水次数
              addLiquidTimeOut: payloadString[18], //补水超限时间
              battery: payloadString[19], // 充电电量
              version: payloadString[20], // 版本号
              batteryCode: payloadString[21] // 电池编号
            };
          }
        }
      };
    },
    onConnect() {
      console.log(`onConnect====>dev/${this.propData.deviceCode}`);
      mqttClient.subscribe(`dev/${this.propData.deviceCode}`);
      // let message = new Paho.MQTT.Message("Hello");
      // message.destinationName = "World";
      // mqttClient.send(message);
    },
    getData() {
      let startTime = utils.getYestoday();
      let endTime = utils.getNowTime();
      this.$axios
        .get(
          `/battery_group/${
            this.hostId
          }/data?startTime=${startTime}&endTime=${endTime}`
        )
        .then(res => {
          console.log(res);
          if (res.data && res.data.code === 0) {
            let result = res.data.data;
            result.forEach(key => {
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
            });
            this.hasgetData = true;
            this.connectMqtt();
          }
        });
    },
    activeQuery() {
      if (mqttClient.isConnected()) {
        // console.log('isConnected')
        let message = new Paho.MQTT.Message("c:get");
        message.destinationName = `cmd/${this.propData.deviceCode}`;
        mqttClient.send(message);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
$fontColor: rgba(0, 0, 0, 0.65);
.center {
  background: #ffffff;
  padding: 24px;
}
.dashboad {
  display: flex;
  margin-bottom: 20px;
  div {
    flex: 1;
    text-align: center;
    color: $fontColor;
    img {
      width: 56px;
      height: auto;
    }
    p {
      &.info {
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
}
.warrp {
  display: flex;
  height: 250px;
  .map {
    flex: 0 0 59%;
    display: flex;
    .mapCenter {
      flex: 0 0 67%;
      .mapContent {
        width: 100%;
        height: 100%;
      }
    }
    .timeCenter {
      flex: 1;
      padding-left: 24px;
      p {
        font-weight: 600;
        margin-bottom: 16px;
        color: $fontColor;
      }
      .map-time {
        height: 24px;
        font-size: 20px;
        margin-top: 100px;
      }
      .map-date {
        height: 20px;
        font-size: 17px;
      }
      .map-des {
        height: 19px;
        font-size: 15px;
      }
      .map-line {
        height: 20px;
        font-size: 17px;
        color: #71bfdb;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
  .address {
    flex: 1;
    border-left: 1px solid #d7d7d7;
    div {
      padding-left: 50px;
      height: 50px;
      line-height: 50px;
      img {
        height: auto;
        vertical-align: middle;
        margin-right: 15px;
      }
      span {
        color: $fontColor;
        font-size: 13px;
      }
    }
  }
}
.my-map-divider {
  margin: 40px 0;
  height: 38px;
  line-height: 38px;
  border-top: 1px solid #d7d7d7;
  span {
    margin-right: 15px;
  }
}
.chartWarrp {
  display: flex;
  .chartInfo {
    padding: 0 15px;
    flex: 1;
    height: 400px;
  }
}
</style>
