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
</style>
