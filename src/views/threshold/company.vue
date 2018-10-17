<template>
  <div class="container">
    <div class="search">
      <el-button @click="modifyThreshold" size="small" type="primary">修改阈值</el-button>
      <el-button @click="getTemplate" size="small" plain>恢复模板</el-button>
    </div>
    <div class="warrp">
      <el-form :model="batteryForm" :rules="batteryFormRules" ref="batteryForm">
        <el-row :gutter="80">
          <el-col :span="12">
            <el-form-item label="单体充电电压上限阈值(V)" prop="singleMaxChargeVoltage">
              <el-input-number controls-position="right" size="small" v-model="batteryForm.singleMaxChargeVoltage" style="width:200px;"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单体放电电压下限阈值(V)" prop="singleMinDischargeVoltage">
              <el-input-number controls-position="right" size="small" v-model.number="batteryForm.singleMinDischargeVoltage" style="width:200px;"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="80">
          <el-col :span="12">
            <el-form-item label="整组充电电压上限阈值(V)" prop="maxChargeVoltage">
              <el-input-number controls-position="right" size="small" v-model="batteryForm.maxChargeVoltage" style="width:200px;"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="整组放电电压下限阈值(V)" prop="minDischargeVoltage">
              <el-input-number controls-position="right" size="small" v-model.number="batteryForm.minDischargeVoltage" style="width:200px;"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="80">
          <el-col :span="12">
            <el-form-item label="充电电流上限阈值系数" prop="maxChargeCurrent">
              <el-input-number controls-position="right" size="small" v-model.number="batteryForm.maxChargeCurrent" style="width:200px;"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="放电电流上限阈值系数" prop="maxDischargeCurrent">
              <el-input-number controls-position="right" size="small" v-model.number="batteryForm.maxDischargeCurrent" style="width:200px;"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="80">
          <el-col :span="12">
            <el-form-item label="充电温度上限阈值(℃)" prop="maxChargeTemperature">
              <el-input-number controls-position="right" size="small" v-model.number="batteryForm.maxChargeTemperature" style="width:200px;"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="充电温度下限阈值(℃)" prop="minChargeTemperature">
              <el-input-number controls-position="right" size="small" v-model.number="batteryForm.minChargeTemperature" style="width:200px;"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="80">
          <el-col :span="12">
            <el-form-item label="放电温度上限阈值(℃)" prop="maxDischargeTemperature">
              <el-input-number controls-position="right" size="small" v-model.number="batteryForm.maxDischargeTemperature" style="width:200px;"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="放电温度下限阈值(℃)" prop="minDischargeTemperature">
              <el-input-number controls-position="right" size="small" v-model.number="batteryForm.minDischargeTemperature" style="width:200px;"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="80">
          <el-col :span="12">
            <el-form-item label="补水超限天数" prop="maxFluidOverDays">
              <el-input-number controls-position="right" size="small" v-model.number="batteryForm.maxFluidOverDays" style="width:200px;"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- <el-form-item label="监测设备编号（选填）" prop="deviceId">
                <el-input size="small" v-model.number="batteryForm.batteryVoltage" auto-complete="off"></el-input>
              </el-form-item> -->
          </el-col>
        </el-row>
        <el-row :gutter="80">
          <el-col :span="12">
            <el-form-item label="充电容量上限阈值系数" prop="maxChargeCapacity">
              <el-input-number controls-position="right" size="small" v-model.number="batteryForm.maxChargeCapacity" style="width:200px;"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="充电容量下限阈值系数" prop="minChargeCapacity">
              <el-input-number controls-position="right" size="small" v-model.number="batteryForm.minChargeCapacity" style="width:200px;"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import { Message } from "element-ui";

export default {
  data() {
    return {
      setings: {},
      batteryForm: {},
      batteryFormRules: {
        singleMaxChargeVoltage: [
          {
            required: true,
            message: "请输入单体充电电压上限阈值",
            trigger: "change"
          }
        ],
        singleMinDischargeVoltage: [
          {
            required: true,
            message: "请输入单体放电电压下限阈值",
            trigger: "change"
          }
        ],
        maxChargeVoltage: [
          {
            required: true,
            message: "请输入整组充电电压上限阈值",
            trigger: "change"
          }
        ],
        minDischargeVoltage: [
          {
            required: true,
            message: "请输入整组放电电压下限阈值",
            trigger: "change"
          }
        ],
        maxChargeCurrent: [
          {
            required: true,
            message: "请输入充电电流上限阈值系数",
            trigger: "change"
          }
        ],
        maxDischargeCurrent: [
          {
            required: true,
            message: "请输入放电电流上限阈值系数",
            trigger: "change"
          }
        ],
        maxChargeTemperature: [
          {
            required: true,
            message: "请输入充电温度上限阈值",
            trigger: "change"
          }
        ],
        minChargeTemperature: [
          {
            required: true,
            message: "请输入充电温度下限阈值",
            trigger: "change"
          }
        ],
        maxDischargeTemperature: [
          {
            required: true,
            message: "请输入放电温度上限阈值",
            trigger: "change"
          }
        ],
        minDischargeTemperature: [
          {
            required: true,
            message: "请输入放电温度下限阈值",
            trigger: "change"
          }
        ],
        maxFluidOverDays: [
          { required: true, message: "请输入补水超限天数", trigger: "change" }
        ],
        maxChargeCapacity: [
          {
            required: true,
            message: "请输入充电容量上限阈值系数",
            trigger: "change"
          }
        ],
        minChargeCapacity: [
          {
            required: true,
            message: "请输入充电容量下限阈值系数",
            trigger: "change"
          }
        ]
      }
    };
  },
  mounted() {
    this.getCampany();
  },
  methods: {
    getTemplate() {
      this.$api.getSituationTempPolicy().then(res => {
        console.log(res);
        if (res.data && res.data.code === 0) {
          let result = res.data;
          this.batteryForm = result.data;
        }
      });
    },
    getCampany() {
      this.$api.getTempPolicy().then(res => {
        console.log(res);
        if (res.data && res.data.code === 0) {
          let result = res.data;
          if (result.data === null) {
            Message({
              message: "暂未设置全局阈值",
              type: "warning"
            });
            this.hasTemp = false;
          } else {
            this.hasTemp = true;
            this.batteryForm = result.data;
            this.dataId = result.data.id;
          }
        }
      });
    },
    modifyThreshold() {
      this.$refs.batteryForm.validate(valid => {
        if (valid) {
          let params = {
            modelId: 0,
            singleMaxChargeVoltage: this.batteryForm.singleMaxChargeVoltage,
            singleMinDischargeVoltage: this.batteryForm
              .singleMinDischargeVoltage,
            maxChargeVoltage: this.batteryForm.maxChargeVoltage,
            minDischargeVoltage: this.batteryForm.minDischargeVoltage,
            maxChargeCurrent: this.batteryForm.maxChargeCurrent,
            maxDischargeCurrent: this.batteryForm.maxDischargeCurrent,
            maxChargeTemperature: this.batteryForm.maxChargeTemperature,
            minChargeTemperature: this.batteryForm.minChargeTemperature,
            maxDischargeTemperature: this.batteryForm.maxDischargeTemperature,
            minDischargeTemperature: this.batteryForm.minDischargeTemperature,
            maxFluidOverDays: this.batteryForm.maxFluidOverDays,
            maxChargeCapacity: this.batteryForm.maxChargeCapacity,
            minChargeCapacity: this.batteryForm.minChargeCapacity
          };
          if (this.hasTemp) {
            params.id = this.dataId;
            this.modifyFunction(params);
          } else {
            this.addFunction(params);
          }
        }
      });
    },
    /* 添加 */
    addFunction(data) {
      this.$api.batteryAddPolicy(data).then(res => {
        console.log(res);
        if (res.data && res.data.code === 0) {
          Message({
            message: "添加成功",
            type: "success"
          });
          this.getCampany();
        }
      });
    },
    /* 修改 */
    modifyFunction(data) {
      this.$api.batteryChangePolicy(data).then(res => {
        console.log(res);
        if (res.data && res.data.code === 0) {
          Message({
            message: "修改成功",
            type: "success"
          });
          this.getCampany();
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  padding: 24px;
  background: #ffffff;
  min-width: 835px;
}
.search {
  text-align: center;
  padding-left: 160px;
  margin-bottom: 40px;
}
.warrp {
  width: 630px;
  margin: 0 auto;
  .item {
    color: #484848;
    margin-bottom: 26px;
    p {
      font-size: 14px;
      line-height: 32px;
    }
  }
}
</style>
