<template>
  <el-dialog title="详细信息" @close="closeDetails" :visible="getBatteryDetailShow" width="770px">
    <div class="detailCenter">
      <div class="edit" v-if="AdminRoles.AddBatteries">
        <el-button size="mini" type="primary" @click="editDetails">编 辑</el-button>
      </div>
      <table>
        <tr>
          <td class="titles">电池组客户企业</td>
          <td>
            <p>{{BATTERYDETAILDATA.companyName}}</p>
          </td>
          <td class="titles">电池组编号</td>
          <td>
            <p>{{BATTERYDETAILDATA.code}}</p>
          </td>
        </tr>
        <tr>
          <td class="titles">电池组型号</td>
          <td>
            <!-- <el-input size="mini" v-show="Edit" v-model="editObj.model"></el-input> -->
            <el-select v-show="Edit" size="mini" style="width: 195px" v-model="editObj.modelId" placeholder="电池组型号">
              <el-option v-for="item in getGroupModelOpts" :key="item.id" :label="item.dicKey" :value="item.id">
              </el-option>
            </el-select>
            <p v-show="!Edit">{{BATTERYDETAILDATA.model}}</p>
          </td>
          <td class="titles">电池组规格</td>
          <td>
            <el-select v-show="Edit" size="mini" style="width: 195px" v-model="editObj.normId" placeholder="电池组规格">
              <el-option v-for="item in getBatGroupSpecifOpts" :key="item.id" :label="item.dicKey" :value="item.id">
              </el-option>
            </el-select>
            <!-- <el-input size="mini" v-show="Edit" v-model="editObj.norm"></el-input> -->
            <p v-show="!Edit">{{BATTERYDETAILDATA.norm}}</p>
          </td>
        </tr>
        <tr>
          <td class="titles">电池组额定电压</td>
          <td>
            <el-input size="mini" v-show="Edit" style="width: 195px" value="number" v-model="editObj.voltage"></el-input>
            <p v-show="!Edit">{{BATTERYDETAILDATA.voltage}}</p>
          </td>
          <td class="titles">电池组额定容量</td>
          <td>
            <el-input size="mini" v-show="Edit" style="width: 195px" value="number" v-model="editObj.capacity"></el-input>
            <p v-show="!Edit">{{BATTERYDETAILDATA.capacity}}</p>
          </td>
        </tr>
        <tr>
          <td class="titles">电池单体型号</td>
          <!-- colspan="3" -->
          <td>
            <el-select v-show="Edit" size="mini" style="width: 195px" v-model="editObj.singleModelId" placeholder="电池单体型号">
              <el-option v-for="item in getSingleBatteryOpts" :key="item.id" :label="item.dicKey" :value="item.id">
              </el-option>
            </el-select>
            <!-- <el-input size="mini" v-show="Edit" v-model="editObj.singleModel"></el-input> -->
            <p v-show="!Edit">{{BATTERYDETAILDATA.singleModel}}</p>
          </td>
        </tr>
        <tr>
          <td class="titles">电池组生产日期</td>
          <td>
            <el-date-picker v-show="Edit" size="small" value-format="yyyy-MM-dd" style="width: 195px" :default-value="editObj.manufacturerDate" v-model="editObj.manufacturerDate" type="date" placeholder="生产日期">
            </el-date-picker>
            <p v-show="!Edit">{{BATTERYDETAILDATA.manufacturerDate}}</p>
          </td>
          <td class="titles">电池组出厂日期</td>
          <td>
            <el-date-picker v-show="Edit" size="small" value-format="yyyy-MM-dd" style="width: 195px" :default-value="editObj.productionDate" v-model="editObj.productionDate" type="date" placeholder="生产日期">
            </el-date-picker>
            <p v-show="!Edit">{{BATTERYDETAILDATA.productionDate}}</p>
          </td>
        </tr>
        <tr>
          <td class="titles">电池组质保期</td>
          <td>
            <el-date-picker v-show="Edit" size="small" value-format="yyyy-MM-dd" style="width: 195px" :default-value="editObj.qualityGuaranteeDate" v-model="editObj.qualityGuaranteeDate" type="date" placeholder="生产日期">
            </el-date-picker>
            <p v-show="!Edit">{{BATTERYDETAILDATA.qualityGuaranteeDate}}</p>
          </td>
          <td class="titles">设备编号</td>
          <td>
            <p>{{BATTERYDETAILDATA.deviceCode || '无'}}</p>
          </td>
        </tr>
      </table>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button v-show="Edit" type="danger" size="small" @click="saveDetails">保 存</el-button>
      <el-button v-show="Edit" size="small" @click="cancelSaveDetails">取 消</el-button>
      <el-button v-show="!Edit" size="small" @click="closeDetails">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import { deepClone } from "@/utils/functions";
import permissionFun from "@/utils/valated";

export default {
  props: {
    rowData: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters([
      "getBatteryDetailShow",
      "BATTERYDETAILDATA",
      "getGroupModelOpts",
      "getBatGroupSpecifOpts",
      "getSingleBatteryOpts"
    ])
  },
  data() {
    return {
      editObj: {},
      Edit: false,
      AdminRoles: permissionFun()
    };
  },
  methods: {
    closeDetails() {
      this.Edit = false;
      this.$store.commit("SETBATTERYDETAIL", false);
    },
    /* 编辑 */
    editDetails() {
      this.Edit = true;
      this.editObj = deepClone(this.BATTERYDETAILDATA);
    },
    /* 保存 */
    saveDetails() {
      console.log("电池组型号", this.editObj);
      console.log("电池组型号", this.getGroupModelOpts);
      console.log("电池规格", this.getBatGroupSpecifOpts);
      console.log("单体电压", this.getSingleBatteryOpts);
      if (!this.AdminRoles.AddBatteries) {
        return;
      }
      if (!this.editObj.voltage) {
        return;
      }
      if (!this.editObj.capacity) {
        return;
      }
      this.getSingleBatteryOpts.forEach(key => {
        if (key.id === this.editObj.singleModelId) {
          this.editObj.singleMode = key.dicKey;
        }
      });
      this.getGroupModelOpts.forEach(key => {
        if (key.id === this.editObj.modelId) {
          this.editObj.model = key.dicKey;
        }
      });
      this.getBatGroupSpecifOpts.forEach(key => {
        if (key.id === this.editObj.normId) {
          this.editObj.norm = key.dicKey;
        }
      });
      let options = {
        normId: this.editObj.normId,
        norm: this.editObj.norm,
        modelId: this.editObj.modelId,
        model: this.editObj.model,
        singleModelId: this.editObj.singleModelId,
        singleModel: this.editObj.singleMode,
        voltage: this.editObj.voltage,
        capacity: this.editObj.capacity,
        productionDate: this.editObj.productionDate,
        manufacturerDate: this.editObj.manufacturerDate,
        qualityGuaranteeDate: this.editObj.qualityGuaranteeDate
      };
      console.log(options);
      this.$api.changeBatteryDetail(this.editObj.id, options).then(res => {
        console.log(res);
        if (res.data && res.data.code === 0) {
          this.$message({
            type: "success",
            message: res.data.msg
          });
          this.$emit("hasCreated", { value: true });
          this.closeDetails();
        }
      });
    },
    /* 取消保存 */
    cancelSaveDetails() {
      // this.editObj = deepClone(this.BATTERYDETAILDATA);
      this.Edit = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.edit {
  text-align: right;
}
.detailCenter {
  width: 100%;
  .temp {
    text-align: right;
    margin-bottom: 10px;
  }
  table {
    width: 100%;
    tr {
      height: 56px;
    }
    td {
      p {
        background: #f2f2f2;
        height: 28px;
        line-height: 28px;
        border-radius: 3px;
        padding: 0 10px;
      }
      &.titles {
        padding-right: 15px;
        width: 110px;
        background: #ffffff;
        text-align: right;
      }
    }
  }
}
</style>
