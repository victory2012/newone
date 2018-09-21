<template>
  <div class="runCenter">
    <div class="title">
      <div class="titleCenter">
        <a @click="showRealData" :class="{'active': actived == 'real'}">实时数据</a>
        <span class="divider"></span>
        <a @click="showHistoryData" :class="{'active': actived == 'history'}">历史数据</a>
        <span class="divider"></span>
        <a @click="showAlarmData" :class="{'active': actived == 'alarm'}">告警数据</a>
      </div>
      <div class="search">
        <!-- <el-autocomplete v-show="actived === 'real'" size="small" suffix-icon="el-icon-search" v-model="state" :fetch-suggestions="querySearchAsync" placeholder="请输入电池编号" @select="handleSelect"></el-autocomplete> -->
        <el-select v-show="actived === 'real'" v-model="state" filterable placeholder="请输入电池编号" clearable @change="changeBatteryCode">
          <el-option v-for="item in tableData" :key="item.value" :label="item.value" :value="item">
          </el-option>
        </el-select>
        <div v-show="actived !== 'real'" class="devicecode">
          <p><img src="../../assets/img/battery.png" alt="" srcset="">{{companyInfo.code}}</p>
          <p><img src="../../assets/img/device.png" alt="" srcset="">{{companyInfo.deviceCode}}</p>
        </div>
      </div>
    </div>
    <div v-show="hasHostId" class="tips">
      请先选择一个电池组！
    </div>
    <component :is="showCompontent" :hostObj="IdObj" :deviceId="deviceId" :propData="companyInfo"></component>
  </div>
</template>
<script>
import utils from "@/utils/utils";
import permissionFun from "@/utils/valated";
// import real from "./real";
// import history from "./history";
// import alearm from "./alearm";

export default {
  // components: {
  //   "real-time": real,
  //   "i-history": history,
  //   "i-alarm": alearm
  // },
  components: {
    "real-time": () => import("./real.vue"),
    "i-history": () => import("./history.vue"),
    "i-alarm": () => import("./alearm.vue")
  },
  data() {
    return {
      permision: permissionFun(),
      companyInfo: "",
      loading: false,
      propData: {},
      state: "",
      actived: "real",
      hostId: "",
      showCompontent: "",
      hasHostId: false,
      tableData: [],
      deviceId: "",
      IdObj: {},
      code: ""
    };
  },
  mounted() {
    this.hostId = this.$route.query.hostId;
    this.deviceId = this.$route.query.deviceId;
    this.deviceCode = this.$route.query.deviceCode;
    this.id = this.$route.query.id;
    this.init();
    if (this.hostId && this.deviceId) {
      this.IdObj = {
        hostId: this.hostId,
        device: this.deviceId,
        deviceCode: this.deviceCode,
        id: this.id
      };
      this.getCompanyInfo();
    }
  },
  methods: {
    init() {
      if (this.hostId) {
        this.hasHostId = false;
        this.showCompontent = "real-time";
      } else {
        this.hasHostId = true;
        this.showCompontent = "";
      }
      this.batteryId = "";
      this.getBatteryList();
    },
    querySearchAsync(queryString, callback) {
      let restaurants = this.tableData;
      let results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        callback(results);
      }, 80);
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    changeBatteryCode() {
      console.log(this.state);
      if (this.state) {
        this.IdObj = this.state;
        this.getCompanyInfo();
      }
    },
    showRealData() {
      this.actived = "real";
      if (this.IdObj.hostId) {
        this.hasHostId = false;
        this.showCompontent = "real-time";
      }
    },
    showHistoryData() {
      this.actived = "history";
      if (this.IdObj.hostId) {
        this.hasHostId = false;
        this.showCompontent = "i-history";
      }
    },
    showAlarmData() {
      this.actived = "alarm";
      if (this.IdObj.hostId) {
        this.hasHostId = false;
        this.showCompontent = "i-alarm";
      }
    },
    /* 获取电池列表 */
    getBatteryList() {
      let options = {
        pageSize: 99999,
        pageNum: 1,
        bindingStatus: 1
      };
      this.$axios.get("/battery_group", options).then(res => {
        console.log(res);
        this.tableData = [];
        if (res.data && res.data.code === 0) {
          let result = res.data.data;
          result.pageData.forEach(key => {
            let obj = {
              id: key.id,
              value: key.code,
              hostId: key.hostId,
              device: key.deviceId,
              deviceCode: key.deviceCode
            };
            this.tableData.push(obj);
          });
        }
      });
    },
    getCompanyInfo() {
      this.$axios.get(`/battery_group/${this.IdObj.hostId}/info`).then(res => {
        console.log(res);
        this.companyInfo = "";
        if (res.data && res.data.code === 0 && res.data.data) {
          let result = res.data.data;
          this.companyInfo = result;
          this.companyInfo.fluid = result.fluidLevel === 0 ? "正常" : "异常";
          this.companyInfo.yyddmm = utils.yyyymmdd(new Date());
          this.companyInfo.hhmmss = utils.hhmmss(new Date());
          this.showRealData();
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.title {
  padding: 24px;
  position: relative;
  margin-bottom: 40px;
  // text-align: center;
  .titleCenter {
    width: 330px;
    // height: 50px;
    background: #ffffff;
    font-size: 0;
    // line-height: 50px;
    padding: 15px 0;
    border-radius: 5px;
    margin: 0 auto;
    a {
      width: 101px;
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
  .search {
    position: absolute;
    top: 32px;
    right: 20px;
    .devicecode {
      background: #ffffff;
      width: 182px;
      height: 70px;
      font-size: 13px;
      p {
        padding-left: 5px;
        height: 25px;
        line-height: 25px;
        padding: 5px 0;
        img {
          margin-right: 20px;
          vertical-align: top;
        }
      }
    }
  }
}
.tips {
  background: #ffffff;
  padding: 24px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 13px;
}
</style>
