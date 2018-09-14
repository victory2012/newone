<template>
  <div>
    <div class="titleTab">
      <div class="tabInfo">
        <a @click="showSameData" :class="{'active': actived == 'same'}">同一电池单元</a>
        <span class="divider"></span>
        <a @click="showDiffData" :class="{'active': actived == 'diff'}">不同电池单元</a>
      </div>
    </div>
    <component :is="activeComponent"></component>

  </div>
</template>
<script>
import sameCompent from "./same";
import diffCompent from "./different";
// import comChart from "../../components/compare/compare-chart";

export default {
  components: {
    sameCompent,
    diffCompent
  },
  data() {
    return {
      actived: "same",
      activeComponent: "sameCompent"
    };
  },
  methods: {
    showSameData() {
      this.activeComponent = "sameCompent";
      this.actived = "same";
    },
    showDiffData() {
      this.activeComponent = "diffCompent";
      this.actived = "diff";
    }
  }
};
</script>
<style lang="scss" scoped>
.textAlain {
  text-align: center;
}
.tabInfo {
  width: 330px;
  // height: 50px;
  background: #ffffff;
  font-size: 0;
  // line-height: 50px;
  padding: 15px 0;
  border-radius: 5px;
  margin: 0 auto;
  a {
    width: 158px;
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
.titleTab {
  margin-bottom: 20px;
}
.top {
  margin-bottom: 15px;
  .title {
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 16px;
  }
  .compare-add {
    border: 1px dashed #898989;
    width: 232px;
    height: 120px;
    border-radius: 10px;
    font-weight: 550;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    cursor: pointer;
    margin: 0 24px;
    font-size: 12px;
    &.addone {
      border: none;
      flex-direction: column;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      vertical-align: middle;
      background: #ffffff;
    }
  }
}
.timeCenter {
  margin-bottom: 20px;
}
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
    width: 16%;
  }
  .queryBtn {
    margin-left: 20px;
  }
}
.page {
  padding-top: 20px;
  text-align: right;
}
.TopWrapper {
  display: flex;
  justify-content: space-between;
  height: 32px;
  line-height: 32px;
  margin-bottom: 20px;
  .item {
    flex: 1;
  }
  .item2 {
    flex: 0 0 200px;
  }
}
</style>
