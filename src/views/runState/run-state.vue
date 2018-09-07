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
        <el-autocomplete v-show="actived == 'real'" size="small" suffix-icon="el-icon-search" v-model="state" :fetch-suggestions="querySearchAsync" placeholder="请输入电池编号" @select="handleSelect"></el-autocomplete>
      </div>
    </div>
    <div v-show="hasHostId" class="tips">
      请先选择一个电池组！
    </div>
    <component :is="showCompontent"></component>
  </div>
</template>
<script>
import real from "./real";
import history from "./history";
import alearm from "./alearm";

export default {
  components: {
    "real-time": real,
    "i-history": history,
    "i-alarm": alearm
  },
  // components: {
  //   "real-time": () => import("./real.vue"),
  //   "i-history": () => import("./history.vue"),
  //   "i-alarm": () => import("./alearm.vue")
  // },
  data() {
    return {
      loading: false,
      state: "",
      actived: "real",
      showCompontent: "",
      hasHostId: false,
      tableData: [
        {
          id: "123",
          value: "aaa"
        },
        {
          id: "6558",
          value: "aaavvv"
        },
        {
          id: "12322",
          value: "bbbb"
        },
        {
          id: "12333",
          value: "cccc"
        },
        {
          id: "1231234",
          value: "dddd"
        },
        {
          id: "12asd3",
          value: "ffff"
        }
      ]
    };
  },
  mounted() {
    this.hostId = this.$route.query.hostId;
    if (this.hostId) {
      this.hasHostId = false;
      this.showCompontent = "real-time";
    } else {
      this.hasHostId = true;
      this.showCompontent = "";
    }
  },
  methods: {
    init() {
      if (this.hostId) {
        this.hasHostId = false;
        this.showCompontent = "real-time";
        // this.getData(deviceId);
      } else {
        this.hasHostId = true;
        this.showCompontent = "";
      }
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
    handleSelect(val) {
      console.log(val);
    },
    showRealData() {
      this.actived = "real";
      if (this.hostId) {
        this.hasHostId = false;
        this.showCompontent = "real-time";
      }
    },
    showHistoryData() {
      this.actived = "history";
      if (this.hostId) {
        this.hasHostId = false;
        this.showCompontent = "i-history";
      }
    },
    showAlarmData() {
      this.actived = "alarm";
      if (this.hostId) {
        this.hasHostId = false;
        this.showCompontent = "i-alarm";
      }
    },
    getBindBatteryList() {
      let options = {
        pageSize: 9999,
        pageNum: 1,
        companyName: "",
        batteryGroupOrDeviceCode: "",
        modelId: "",
        bindingStatus: 1
      };
      this.$axios.get("/battery_group", options).then(res => {
        console.log(res);
        this.tableData = [];
        if (res.data && res.data.code === 0) {
          let result = res.data.data;
          this.total = result.total;
          this.tableData = result.pageData;
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
  }
}
.tips {
  background: #ffffff;
  padding: 24px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 13px;
}
</style>
