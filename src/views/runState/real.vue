<template>
  <div class="center">
    <div class="dashboad">
      <div>
        <img src="../../assets/img/temp.png" alt="">
        <p class="info">47℃</p>
        <p>温度</p>
      </div>
      <div>
        <img src="../../assets/img/level.png" alt="">
        <p class="info">47℃</p>
        <p>液位</p>
      </div>
      <div>
        <img src="../../assets/img/voltage_total.png" alt="">
        <p class="info">47℃</p>
        <p>电压</p>
      </div>
      <div>
        <img src="../../assets/img/voltage.png" alt="">
        <p class="info">47℃</p>
        <p>单体电压</p>
      </div>
      <div>
        <img src="../../assets/img/current.png" alt="">
        <p class="info">47℃</p>
        <p>电流</p>
      </div>
    </div>
    <div class="warrp">
      <div class="map">
        <div class="mapCenter">
          <div class="mapContent" id="mapContent"></div>
        </div>
        <div class="timeCenter">
          <p class="map-time">11:29:17</p>
          <p class="map-date">2018-08-08</p>
          <p class="map-des">刷新时间</p>
          <p class="map-line">主动查询</p>
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
    <echart-map v-if="hasgetData" :chartData="dataObj"></echart-map>
  </div>
</template>
<script>
/* eslint-disable */
import AMap from "AMap";
import utils from "@/utils/utils";
import echartMap from "../../components/realTime";

export default {
  props: ["hostId", "propData"],
  components: {
    echartMap
  },
  data() {
    return {
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
    console.log(this.hostId);
    console.log("propData", this.propData);
    // this.companyInfo = this.propData;
    this.init();
    // this.getCompanyInfo();
  },
  methods: {
    init() {
      new AMap.Map("mapContent", {
        resizeEnable: true,
        zoom: 10
      });
      this.getData();
    },
    // getCompanyInfo() {
    //   this.$axios.get(`/battery_group/${this.hostId}/info`).then(res => {
    //     console.log(res);
    //     if (res.data && res.data.code === 0 && res.data.data) {
    //       this.companyInfo = res.data.data;
    //     }
    //   });
    // },
    getData() {
      // let startTime = utils.dateFomats(utils.getYestoday());
      // let endTime = utils.dateFomats(utils.getNowTime());
      let startTime = 20170101010101;
      let endTime = utils.dateFomats(utils.getNowTime());
      this.$axios
        .get(
          `/battery_group/${5}/data?startTime=${startTime}&endTime=${endTime}`
        )
        .then(res => {
          console.log(res);
          if (res.data && res.data.code === 0) {
            let result = res.data.data;
            result.forEach(key => {
              this.dataObj.timeArr.push(utils.fomats(key.time)); // 时间
              this.dataObj.singleVoltage.push(key.singleVoltage); // 单体电压
              this.dataObj.temperature.push(key.temperature); // 温度
              this.dataObj.voltage.push(key.voltage); // 电压
              this.dataObj.current.push(key.current); // 电流
            });
            this.hasgetData = true;
          }
        });
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
