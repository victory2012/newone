<template>
  <div>
    <edit-card :cardData="cardData"></edit-card>
    <div class="warper">
      <el-row :gutter="10">
        <el-col :span="14">
          <div class="chart">
            <div class="warperItme">
              <pie-chart :cardData="cardData"></pie-chart>
              <div class="tables shadow">
                <el-table v-loading="loading" :data="tableData" style="width: 100%">
                  <!-- <el-table-column type="index" align="center" label="序号" width="50">
              </el-table-column> -->
                  <el-table-column prop="createTime" align="center" label="告警发生时间">
                  </el-table-column>
                  <el-table-column prop="items" align="center" label="告警项目">
                  </el-table-column>
                  <!-- <el-table-column prop="thresholdValue" align="center" label="告警阈值">
              </el-table-column> -->
                  <!-- <el-table-column prop="actualValue" align="center" label="实际值">
              </el-table-column> -->
                  <!-- <el-table-column prop="hostCode" align="center" label="电池组编号">
              </el-table-column> -->
                  <el-table-column prop="content" align="center" label="告警内容">
                  </el-table-column>
                  <el-table-column prop="hierarchy" align="center" label="告警层级">
                  </el-table-column>
                  <el-table-column prop="levels" align="center" label="告警级别">
                  </el-table-column>
                  <!-- <el-table-column prop="address" align="center" label="详情" width="120">
                <template slot-scope="scope">
                  <el-button @click.native.prevent="handleClick(scope.row)" type="text">
                    查看
                  </el-button>
                </template>
              </el-table-column> -->
                </el-table>
                <p class="more"><a @click="ToMore">更多</a><i class="iconfont icon-more"></i></p>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="list">
            <div class="listItme shadow">
              <el-table v-loading="company" :data="custormTable" style="">
                <el-table-column prop="company" align="center" label="客户">
                </el-table-column>
                <el-table-column prop="total" align="center" label="电池数">
                </el-table-column>
                <el-table-column prop="activeTotal" align="center" label="有效电池数">
                </el-table-column>
                <el-table-column prop="alarmedTotal" align="center" label="告警电池数">
                </el-table-column>
              </el-table>
            </div>
            <div class="listItme shadow">
              <el-table :data="provenceTable" style="">
                <el-table-column prop="createTime" align="center" label="省份">
                </el-table-column>
                <el-table-column prop="total" align="center" label="电池数">
                </el-table-column>
                <el-table-column prop="activeTotal" align="center" label="有效电池数">
                </el-table-column>
                <el-table-column prop="alarmedTotal" align="center" label="告警电池数">
                </el-table-column>
              </el-table>
            </div>
            <div class="listItme shadow">
              <el-table v-loading="models" :data="modelTable" style="">
                <el-table-column prop="models" align="center" label="型号">
                </el-table-column>
                <el-table-column prop="total" align="center" label="电池数">
                </el-table-column>
                <el-table-column prop="activeTotal" align="center" label="有效电池数">
                </el-table-column>
                <el-table-column prop="alarmedTotal" align="center" label="告警电池数">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import utils from "@/utils/utils";
import editCard from "@/components/overview/card";
import pieChart from "@/components/overview/pieChart";

export default {
  components: {
    editCard,
    pieChart
  },
  data() {
    return {
      cardData: {},
      loading: false,
      models: false,
      company: false,
      tableData: [],
      custormTable: [],
      provenceTable: [],
      modelTable: [],
      pageSize: 10
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getCardData();
      this.getListData();
      this.getCampanyData();
      this.getModelData();
    },
    /* 统计数据 */
    getCardData() {
      this.$axios.get(`/battery_group/count`).then(res => {
        if (res.data && res.data.code === 0) {
          // console.log("getCardData", res);
          this.cardData = res.data.data;
        }
      });
    },
    getCampanyData() {
      this.company = true;
      this.$axios.get(`/battery_group/sub_companies/count`).then(res => {
        // console.log("getCampanyData", res);
        this.company = false;
        if (res.data && res.data.code === 0) {
          let resultKey = Object.keys(res.data.data);
          let resultValue = Object.values(res.data.data);
          resultValue.forEach((key, index) => {
            key.company = resultKey[index];
            this.custormTable.push(key);
          });
        }
      });
    },
    getModelData() {
      this.models = true;
      this.$axios.get(`/battery_group/model/count`).then(res => {
        // console.log("型号", res);
        this.models = false;
        if (res.data && res.data.code === 0) {
          let resultKey = Object.keys(res.data.data);
          let resultValue = Object.values(res.data.data);
          resultValue.forEach((key, index) => {
            key.models = resultKey[index];
            this.modelTable.push(key);
          });
        }
      });
    },
    /* 告警数据 */
    getListData() {
      this.loading = true;
      let pageObj = {
        pageSize: this.pageSize,
        pageNum: 1
      };
      this.$axios.get("/battery_group_event", pageObj).then(res => {
        console.log(res);
        this.loading = false;
        if (res.data && res.data.code === 0) {
          let result = res.data.data;
          this.tableData = [];
          if (result.pageData.length > 0) {
            result.pageData.forEach(key => {
              // key.alarmtime = utils.fomats(key.time);
              key.levels = utils.level(key.level);
              key.hierarchy = key.hierarchy === "Group" ? "整组" : "单体";
              key.items = utils.item(key.item);
              if (key.item === "Fluid") {
                key.thresholdValue = "-";
                key.actualValue = "异常";
              }
              this.tableData.push(key);
            });
          }
        }
      });
    },
    ToMore() {
      this.$router.push("/battery/alarm");
    }
  }
};
</script>
<style lang="scss" scoped>
.warper {
  padding: 0 10px;
}
.chart {
  flex: 1;
  margin-right: 15px;
}
.list {
  flex: 0 0 500px;
  .listItme {
    box-sizing: border-box;
    margin-bottom: 20px;
    padding: 10px;
    padding-top: 0;
    background: #ffffff;
  }
}
.shadow {
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
}
.tables {
  padding: 15px;
  margin-top: 20px;
  background: #ffffff;
}
.more {
  text-align: right;
  margin-top: 15px;
  color: #409eff;
  font-size: 14px;
  cursor: pointer;
  i {
    vertical-align: middle;
  }
}
// @media only screen and (max-width: 1300px) {
//   .listWarper {
//     flex-wrap: wrap;
//     .chart {
//       flex: 1;
//       margin-bottom: 20px;
//     }
//     .list {
//       flex: 1;
//     }
//   }
// }
</style>
