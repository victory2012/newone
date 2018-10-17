<template>
  <el-dialog width="600px" title="电池登记" @close="closeTt" :visible.sync="addBattery">
    <el-form :model="batteryForm" :rules="batteryFormRules" ref="batteryForm">
      <el-row :gutter="60">
        <el-col :span="12">
          <el-form-item label="电池组生产企业" prop="account">
            <el-input size="small" disabled v-model="account" auto-complete="off" style="width:210px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电池组客户企业" prop="batCustom">
            <el-select size="small" style="width:210px" v-model="batteryForm.batCustom" placeholder="电池组客户企业">
              <el-option v-for="item in getCustomOpts" :key="item.id" :label="item.name" :value="item.id" :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="60">
        <el-col :span="12">
          <el-form-item label="电池组编号" prop="groupNum">
            <el-input size="small" v-model="batteryForm.groupNum" style="width:210px;" placeholder="电池组编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电池组型号" prop="batGroupModel">
            <el-select size="small" style="width:210px" v-model="batteryForm.batGroupModel" placeholder="电池组型号">
              <el-option v-for="item in getGroupModelOpts" :key="item.id" :label="item.dicKey" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="60">
        <el-col :span="12">
          <el-form-item label="电池组规格" prop="batGroupSpecif">
            <el-select size="small" style="width:210px" v-model="batteryForm.batGroupSpecif" placeholder="电池组规格">
              <el-option v-for="item in getBatGroupSpecifOpts" :key="item.id" :label="item.dicKey" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电池组额定电压" prop="batteryVoltage">
            <el-input size="small" v-model.number="batteryForm.batteryVoltage" style="width:210px;" placeholder="电池组额定电压"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="60">
        <el-col :span="12">
          <el-form-item label="电池组额定容量" prop="batteryCapacity">
            <el-input size="small" v-model.number="batteryForm.batteryCapacity" style="width:210px;" placeholder="电池组额定容量"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电池单体型号" prop="singleBattery">
            <el-select size="small" style="width:210px" v-model="batteryForm.singleBattery" placeholder="电池单体型号">
              <el-option v-for="item in getSingleBatteryOpts" :key="item.id" :label="item.dicKey" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="60">
        <el-col :span="12">
          <el-form-item label="电池组生产日期" prop="productDate">
            <el-date-picker size="small" style="width: 210px" value-format="yyyy-MM-dd" v-model="batteryForm.productDate" type="date" placeholder="生产日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电池组出厂日期" prop="factoryDate">
            <el-date-picker size="small" style="width: 210px" value-format="yyyy-MM-dd" v-model="batteryForm.factoryDate" type="date" placeholder="出厂日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="60">
        <el-col :span="12">
          <el-form-item label="电池组质保期" prop="qualityDate">
            <el-date-picker size="small" style="width: 210px" value-format="yyyy-MM-dd" v-model="batteryForm.qualityDate" type="date" placeholder="质保期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="监测设备编号（选填）" prop="deviceId">
            <el-select size="small" style="width:210px" v-model="batteryForm.deviceId" placeholder="设备编号">
              <el-option v-for="item in getDeviceIdOpts" :key="item.code" :label="item.code" :value="item.id" :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="resetBatteryAdd">重 置</el-button>
      <el-button size="small" @click="submitBatteryAdd" type="primary">确 认</el-button>
    </div>
  </el-dialog>
</template>
<script>
/* eslint-disable */

import { mapGetters } from "vuex";
import utils from "@/utils/utils";

export default {
  data() {
    return {
      account:
        JSON.parse(sessionStorage.getItem("loginData")).companyName || "",
      batteryForm: {},
      batteryFormRules: {
        batCustom: [
          { required: true, message: "请选择电池组客户企业", trigger: "change" }
        ],
        groupNum: [
          { required: true, message: "请选择电池组编号", trigger: "change" }
        ],
        batGroupModel: [
          { required: true, message: "请选择电池组型号", trigger: "change" }
        ],
        batGroupSpecif: [
          { required: true, message: "请选择电池组规格", trigger: "change" }
        ],
        batteryVoltage: [{ required: true, message: "请输入电池组额定电压" }],
        batteryCapacity: [{ required: true, message: "请输入电池组额定容量" }],
        singleBattery: [
          { required: true, message: "请选择电池单体型号", trigger: "change" }
        ],
        productDate: [
          { required: true, message: "请选择电池组生产日期", trigger: "blur" }
        ],
        factoryDate: [
          { required: true, message: "请选择电池组出厂日期", trigger: "blur" }
        ],
        qualityDate: [
          { required: true, message: "请选择电池组质保期", trigger: "blur" }
        ]
      },
      GroupModelOpts: [],
      batGroupModel: "",
      batCustomOpts: [], // 电池组客户企业列表
      batCustom: "", // 电池组客户企业
      batGroupSpecif: "",
      batGroupSpecifOpts: [],
      singleBattery: "",
      singleBatteryOpts: [],
      deviceId: "",
      deviceIdOpts: [],
      productDate: "",
      factoryDate: "",
      qualityDate: ""
    };
  },
  computed: {
    ...mapGetters([
      "getCustomOpts",
      "getGroupModelOpts",
      "getDeviceIdOpts",
      "getSingleBatteryOpts",
      "getBatGroupSpecifOpts"
    ]),
    addBattery: {
      get: function() {
        return this.$store.state.addBattery;
      },
      set: function() {}
    }
  },
  methods: {
    resetBatteryAdd() {
      this.$refs.batteryForm.resetFields();
      this.batteryForm = {};
    },
    submitBatteryAdd() {
      this.$refs.batteryForm.validate(valid => {
        if (valid) {
          console.log("submit!", this.batteryForm);
          this.getGroupModelOpts.forEach(key => {
            if (key.id === this.batteryForm.batGroupModel) {
              this.batteryForm.model = key.dicKey;
            }
          });
          this.getBatGroupSpecifOpts.forEach(key => {
            if (key.id === this.batteryForm.batGroupSpecif) {
              this.batteryForm.norm = key.dicKey;
            }
          });
          this.getCustomOpts.forEach(key => {
            if (key.id === this.batteryForm.batCustom) {
              this.batteryForm.company = key.name;
            }
          });
          this.getSingleBatteryOpts.forEach(key => {
            if (key.id === this.batteryForm.singleBattery) {
              this.batteryForm.singleMode = key.dicKey;
            }
          });
          let params = {
            code: this.batteryForm.groupNum,
            modelId: this.batteryForm.batGroupModel,
            model: this.batteryForm.model,
            normId: this.batteryForm.batGroupSpecif,
            norm: this.batteryForm.norm,
            companyId: this.batteryForm.batCustom,
            companyName: this.batteryForm.company,
            voltage: this.batteryForm.batteryVoltage,
            capacity: this.batteryForm.batteryCapacity,
            singleModelId: this.batteryForm.singleBattery,
            singleModel: this.batteryForm.singleMode,
            productionDate: this.batteryForm.productDate,
            manufacturerDate: this.batteryForm.factoryDate,
            qualityGuaranteeDate: this.batteryForm.qualityDate
          };

          this.getDeviceIdOpts &&
            this.getDeviceIdOpts.forEach(key => {
              if (key.id === this.batteryForm.deviceId) {
                params.deviceId = this.batteryForm.deviceId;
                params.deviceCode = key.code;
              }
            });
          console.log(params);
          this.$api.batteryAddGroup(params).then(res => {
            console.log("添加电池组", res);
            if (res.data && res.data.code === 0) {
              this.$message({
                type: "success",
                message: res.data.msg
              });
              this.$emit("hasCreated", { value: true });
              this.batteryForm = {};
              this.$store.state.addBattery = false;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /* 关闭窗口回调方法 */
    closeTt() {
      this.$refs.batteryForm.resetFields();
      this.batteryForm = {};
      this.$store.state.addBattery = false;
    },

    init() {
      // this.batCustomOpts = JSON.parse(utils.getStorage("batCustomOpts"));
      // this.GroupModelOpts = JSON.parse(utils.getStorage("Modeloptions"));
      // this.deviceIdOpts = JSON.parse(utils.getStorage("deviceIdOpts"));
      // this.singleBatteryOpts = JSON.parse(
      //   utils.getStorage("singleBatteryOpts")
      // );
      // this.batGroupSpecifOpts = JSON.parse(
      //   utils.getStorage("batGroupSpecifOpts")
      // );
    }
  }
  // created() {
  //   this.init();
  // }
};
</script>

