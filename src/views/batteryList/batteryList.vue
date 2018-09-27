<template>
  <div class="batteryList">
    <div class="topTab">
      <div class="icons">
        <div>
          <div class="items" v-if="AdminRoles.AddBatteries">
            <el-dropdown trigger="click" placement="bottom" @command="handleCommand">
              <span>
                <img src="../../../static/img/device_reg.png" alt=""><br/>
                <span class="el-dropdown-link">电池</span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="addBattery" :disabled="false">添加电池</el-dropdown-item>
                <el-dropdown-item command="addModel">添加型号</el-dropdown-item>
                <el-dropdown-item command="addSpfic">添加规格</el-dropdown-item>
                <el-dropdown-item command="addSingel">添加单体规格</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="items" v-if="AdminRoles.AddBatteries" style="position: relative">
            <input class="fileUpload" type="file" @change="fileUpload"  v-loading.fullscreen.lock="fullscreenLoading"/>
            <img id="upers" src="../../../static/img/device_import.png" alt="">
            <p>批量导入</p>
          </div>
          <div class="items" v-if="AdminRoles.recovery" @click="recovery">
            <img id="recover" src="../../../static/img/device_recover.png" alt="">
            <p>恢复拉黑电池</p>
          </div>
        </div>
      </div>
      <div class="select">
        <div class="item">
          <el-input size="small" v-model="batteryId" placeholder="电池/设备编号"></el-input>
        </div>
        <div class="item">
          <el-select size="small" v-model="batteryModel" placeholder="电池型号">
            <el-option v-for="item in Modeloptions" :key="item.id" :label="item.dicKey" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <el-select size="small" v-model="batCustom" placeholder="客户企业名称">
            <el-option v-for="item in batCustomOpts" :key="item.id" :label="item.name" :value="item.name" :disabled="item.disabled">
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <el-select size="small" v-model="bindStatus" placeholder="绑定状态">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <el-button @click="getBatteryList" size="mini" type="primary">查询</el-button>
          <el-button @click="clearOptions" size="small" plain>清空</el-button>
        </div>
      </div>
    </div>
    <div class="tables">
      <el-table v-loading="loading" :data="tableData" style="width: 100%" :highlight-current-row="true">
        <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
        <el-table-column prop="code" align="center" label="电池编号">
        </el-table-column>
        <el-table-column prop="model" align="center" label="电池型号">
        </el-table-column>
        <el-table-column prop="norm" align="center" label="电池组规格">
        </el-table-column>
        <el-table-column prop="companyName" align="center" label="客户企业名称">
        </el-table-column>
        <el-table-column prop="deviceCode" align="center" label="监测设备编号">
        </el-table-column>
        <el-table-column prop="bindingName" align="center" label="绑定状态">
        </el-table-column>
        <!-- <el-table-column prop="online" align="center" label="在线状态">
        </el-table-column> -->
        <el-table-column align="center" label="运行状态">
          <template slot-scope="scope">
            <el-button @click.native.prevent="lookFor(scope.row)" :disabled="scope.row.hasbind" type="text" size="small">
              查看
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" width="200" label="操作">
          <template slot-scope="scope">
            <el-button @click="bindDeviceClick(scope.row)" :disabled="!scope.row.hasbind || scope.row.isPlat" type="text" size="small">绑定</el-button>
            <el-button @click="unbindClick(scope.row)" :disabled="scope.row.hasbind || scope.row.isPlat" type="text" size="small">解绑</el-button>
            <el-button @click="addBlack(scope.row)" :disabled="!AdminRoles.addblack" type="text" size="small">拉黑</el-button>
            <el-button @click="deleteBattery(scope.row)" :disabled="!scope.row.canDelete || scope.row.isPlat" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="sizes, prev, pager, next" :total="total">
      </el-pagination>
    </div>
    <!-- 添加电池组型号、规格、单体规格 -->
    <el-dialog width="600px" :title="titles" :visible.sync="addModel">
      <el-form :model="modelForm" label-position="right" :rules="modelFormRules" ref="modelForm">
        <el-form-item :label="labels" prop="dicValue">
          <el-input size="small" v-model="modelForm.dicValue" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="resetModelAdd">重 置</el-button>
        <el-button size="small" @click="submitModelAdd" type="primary">确 认</el-button>
      </div>
    </el-dialog>
    <!-- 电池绑定 -->
    <el-dialog width="600px" title="电池与检测设备绑定" :visible.sync="bindDevice">
      <el-form :model="deviceModel" label-width="150px" label-position="right" ref="deviceModel" style="margin-top:20px;">
        <el-form-item label="监测设备编号" prop="deviceId" :rules="[{ required: true, message: '请输入内容', trigger: 'change' }]">
          <el-select size="small" style="width:210px" v-model="deviceModel.deviceId" placeholder="设备编号">
            <el-option v-for="item in deviceIdOpts" :key="item.id" :label="item.code" :value="item.id" :disabled="item.disabled">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="resetBind">重 置</el-button>
        <el-button size="small" @click="submitBind" type="primary">确 认</el-button>
      </div>
    </el-dialog>
    <component @hasCreated="reloadBattery" :is="showAdd"></component>
  </div>
</template>
<style lang="scss" scoped>
.batteryList {
  background: #ffffff;
  border-radius: 5px;
  padding: 20px;
  min-width: 1180px;
  overflow: auto;
  .topTab {
    display: flex;
    height: 60px;
    margin-bottom: 40px;
    .icons {
      flex: 0 0 35%;
      .items {
        width: 116px;
        float: left;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
        .fileUpload {
          position: absolute;
          top: 0;
          left: 0;
          font-size: 0;
          width: 116px;
          height: 58px;
          opacity: 0;
          cursor: pointer;
        }
        img {
          width: 28px;
          margin-bottom: 8px;
        }
      }
    }
    .select {
      flex: 1;
      display: flex;
      .item {
        flex: 1;
        padding: 10px 5px;
      }
    }
  }
  .page {
    padding-top: 20px;
    text-align: right;
  }
}
#import {
  margin-bottom: 12px;
}
#recover {
  margin-bottom: 14px;
}
#upers {
  margin-bottom: 11px;
}
</style>
<script>
import permissionFun from "@/utils/valated";
/* eslint-disable */
import { mapGetters } from "vuex";
import utils from "@/utils/utils";
import XLSX from "xlsx";
import mqttConfig from "@/api/mqtt.config";
import Paho from "Paho";

let wb; // 读取完成的数据
let rABS = false; // 是否将文件读取为二进制字符串
let mqttClient = {};
export default {
  components: {
    "add-battery": () => import("@/components/battery/addBattery")
  },
  data() {
    return {
      AdminRoles: permissionFun(),
      fullscreenLoading: false,
      showAdd: "",
      deviceModel: {},
      bindDevice: false,
      addType: "",
      labels: "",
      titles: "",
      addModel: false,
      batteryId: "",
      loading: true,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      modelForm: {},
      modelFormRules: {
        dicValue: [{ required: true, message: "请输入内容", trigger: "change" }]
      },
      batteryForm: {},
      batteryFormRules: {},
      Modeloptions: [],
      batteryModel: "",
      batCustom: "",
      bindStatus: "",
      batCustomOpts: [],
      deviceIdOpts: [],
      options: [
        {
          value: 1,
          label: "已绑定"
        },
        {
          value: 0,
          label: "未绑定"
        }
      ],
      bindOptions: [],
      value: "",
      tableData: []
    };
  },
  methods: {
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
        console.log("mqtt-closed:", responseObject);
      };
      mqttClient.onMessageArrived = message => {
        console.log("message", message);
      };
    },
    onConnect() {
      if (
        typeof mqttClient === "object" &&
        typeof mqttClient.subscribe === "function"
      ) {
        console.log("mqtt is connected");
        // mqttClient.subscribe(`dev/${this.infoData.deviceCode}`);
        // let message = new Paho.MQTT.Message(`k:${this.bindRows.code}`);
        // message.destinationName = `cmd/${this.bindRows.code}`;
        // mqttClient.send(message);
      }
    },
    /* 拉黑 */
    addBlack(row) {
      let deviceObj = {
        id: row.deviceId,
        status: -1
      };
      this.$axios.put("device", deviceObj).then(res => {
        console.log(res);
        if (res.data && res.data.code === 0) {
          this.$message({
            type: "success",
            message: res.data.msg
          });
          this.getBatteryList();
        }
      });
    },
    recovery() {
      this.$router.push("/battery/defriend");
    },
    reloadBattery(data) {
      if (data.value) {
        this.getBatteryList();
      }
    },
    handleSelect() {},
    /* 取消电池绑定 */
    resetBind() {
      this.$refs.deviceModel.resetFields();
      this.deviceModel = {};
    },
    /* 电池绑定 */
    submitBind() {
      this.$refs.deviceModel.validate(vlited => {
        if (vlited) {
          this.deviceIdOpts.forEach(key => {
            if (this.deviceModel.deviceId === key.id) {
              this.deviceModel.code = key.code;
            }
          });
          let bindObj = {
            hostId: this.bindRows.hostId,
            deviceId: this.deviceModel.deviceId,
            hostCode: this.bindRows.code,
            deviceCode: this.deviceModel.code
          };
          this.$axios.put("host/bind", bindObj).then(res => {
            if (res.data && res.data.code === 0) {
              this.$message({
                type: "success",
                message: res.data.msg
              });
              this.resetBind();
              this.bindDevice = false;
              this.bindHostId = null;
              let message = new Paho.MQTT.Message(`k:${this.bindRows.code}`);
              message.destinationName = `cmd/${bindObj.deviceCode}`;
              console.log(message);
              mqttClient.send(message);

              this.getBatteryList();
            }
          });
        }
      });
    },
    handleCommand(command) {
      this.addType = command;
      // this.modelForm.value = "";
      if (command === "addBattery") {
        this.$store.commit("triggerAddBattery");
        this.showAdd = "add-battery";
      }
      if (command === "addModel") {
        this.addModel = true;
        this.titles = "添加型号";
        this.labels = "电池组型号";
      }
      if (command === "addSpfic") {
        this.addModel = true;
        this.titles = "添加规格";
        this.labels = "电池组规格";
      }
      if (command === "addSingel") {
        this.addModel = true;
        this.titles = "添加单体规格";
        this.labels = "电池组单体规格";
      }
    },
    resetModelAdd() {
      this.$refs.modelForm.resetFields();
      this.modelForm = {};
    },
    /* 添加电池组型号、规格、单体规格 */
    submitModelAdd() {
      console.log(this.batteryForm);
      this.$refs.modelForm.validate(valid => {
        if (valid) {
          let params = {
            dicKey: this.modelForm.dicValue,
            categoryId: 2
          };
          if (this.addType === "addModel") {
            params.type = "Model"; // 电池组型号
          }
          if (this.addType === "addSpfic") {
            params.type = "Norm"; // 电池组规格
          }
          if (this.addType === "addSingel") {
            params.type = "SingleModel"; // 单体规格
          }
          this.$axios.post("/dic", params).then(res => {
            console.log(this.addType, res);
            if (res.data && res.data.code === 0) {
              this.$message({
                type: "success",
                message: res.data.msg
              });
              this.addModel = false;
              this.modelForm = {};
              this.getBatteryModelList();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /* 每页显示的数量 */
    handleSizeChange(val) {
      this.loading = true;
      this.pageSize = val;
      this.getBatteryList();
    },
    /* 显示第几页 */
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loading = true;
      this.getBatteryList();
    },
    lookFor(row) {
      this.$router.push({
        path: "battery/run",
        query: {
          deviceId: row.deviceId,
          deviceCode: row.deviceCode,
          hostId: row.hostId,
          id: row.id
        }
      });
    },
    deleteBattery(row) {
      if (!row.id) return;
      this.$messageBox.alert("确定删除此电池组吗？", {
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        callback: action => {
          if (action === "confirm") {
            this.$axios.delete(`/host/${row.id}`).then(res => {
              if (res.data && res.data.code === 0) {
                this.$message({
                  type: "success",
                  message: res.data.msg
                });
                this.getBatteryList();
              }
            });
          }
        }
      });
    },
    /* 绑定按钮 */
    bindDeviceClick(row) {
      console.log(row);
      this.getDeviceList();
      this.bindDevice = true;
      this.bindRows = row;
    },
    /* 解绑按钮 */
    unbindClick(row) {
      this.$axios.put(`host/unbind/${row.hostId}`).then(res => {
        if (res.data && res.data.code === 0) {
          // console.log(res);
          this.$message({
            type: "success",
            message: res.data.msg
          });
          this.getBatteryList();
        }
      });
    },
    fileUpload(event) {
      console.log(event);
      this.fullscreenLoading = true;
      this.eventUpload = event.target;
      let obj = event.target;
      if (!obj.files) {
        this.fullscreenLoading = false;
        return;
      }
      const IMPORTFILE_MAXSIZE = 1 * 1024; // 这里可以自定义控制导入文件大小
      let suffix;
      if (obj.files[0].name) {
        suffix = obj.files[0].name.split(".")[1];
      }

      if (suffix !== "xls" && suffix !== "xlsx") {
        this.$message({
          type: "error",
          message: "请导入xls格式或者xlsx格式"
        });
        this.eventUpload.value = "";
        this.fullscreenLoading = false;
        return;
      }
      if (obj.files[0].size / 1024 > IMPORTFILE_MAXSIZE) {
        this.$message({
          type: "error",
          message: "导入的表格文件不能大于1M"
        });
        this.eventUpload.value = "";
        this.fullscreenLoading = false;
        return;
      }
      let f = obj.files[0];
      let reader = new FileReader();
      reader.onload = e => {
        let data = e.target.result;
        if (rABS) {
          wb = XLSX.read(btoa(this.fixdata(data)), {
            // 手动转化
            type: "base64"
          });
        } else {
          wb = XLSX.read(data, {
            type: "binary"
          });
        }
        // wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
        // wb.Sheets[Sheet名]获取第一个Sheet的数据
        // document.getElementById("demo").innerHTML = JSON.stringify(
        //   XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
        // );
        let valuesObj = [];
        let resultObj = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        console.log(resultObj);
        if (resultObj.length < 1) {
          this.$message.error("上传的文件内容为空，请检查文件");
          this.fullscreenLoading = false;
        } else {
          for (let i = 0; i < resultObj.length; i++) {
            let results = resultObj[i];
            if (
              !results["电池组编号"] ||
              !results["电池组型号"] ||
              !results["电池组规格"] ||
              !results["电池组额定电压"] ||
              !results["电池组额定容量"] ||
              !results["电池单体型号"] ||
              !results["采购企业"] ||
              !results["生产日期"] ||
              !results["出产日期"] ||
              !results["质保期"]
            ) {
              this.$message.error("请文件填写完整");
              this.eventUpload.value = "";
              this.fullscreenLoading = false;
              return;
            }
            if (
              resultObj[i + 1] &&
              results["电池组编号"] === resultObj[i + 1]["电池组编号"]
            ) {
              this.$message.error("电池组编号不能重复，请检查文件");
              this.eventUpload.value = "";
              this.fullscreenLoading = false;
              return;
            }
            if (
              !utils.checkDate(results["生产日期"]) ||
              !utils.checkDate(results["出产日期"]) ||
              !utils.checkDate(results["质保期"])
            ) {
              this.$message.warning("时间格式不支持，请选择文本形式");
              this.eventUpload.value = "";
              this.fullscreenLoading = false;
              return;
            }
            let ItemObj = {
              code: results["电池组编号"],
              model: results["电池组型号"],
              norm: results["电池组规格"],
              voltage: results["电池组额定电压"],
              capacity: results["电池组额定容量"],
              singleModel: results["电池单体型号"],
              subCompanyName: results["采购企业"],
              productionDate: utils.yyyymmdd(results["生产日期"]),
              manufacturerDate: utils.yyyymmdd(results["出产日期"]),
              qualityGuaranteeDate: utils.yyyymmdd(results["质保期"]),
              deviceCode: results["监测设备编号"] || ""
            };
            // ItemObj.companyName = results["生产企业"];
            // ItemObj.deviceCodes.push(results["编号"]);
            valuesObj.push(ItemObj);
          }
          console.log(valuesObj);
          this.fileUploadTo(valuesObj);
        }
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    fixdata(data) {
      // 文件流转BinaryString
      let o = "";
      let l = 0;
      let w = 10240;
      for (; l < data.byteLength / w; l++) {
        o += String.fromCharCode.apply(
          null,
          /* eslint-disable */
          new Uint8Array(data.slice(l * w, l * w + w))
        );
      }
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
      return o;
    },
    fileUploadTo(data) {
      this.$axios.post(`/battery_group/batch`, data).then(res => {
        console.log(res);
        this.fullscreenLoading = false;
        if (res.data && res.data.code === 0) {
          this.$message.success("批量添加成功");
          this.eventUpload.value = "";
          this.getBatteryList();
        } else {
          if (this.eventUpload) {
            this.eventUpload.value = "";
          }
        }
      });
    },
    /* 清空 */
    clearOptions() {
      this.batCustom = "";
      this.batteryId = "";
      this.batteryModel = "";
      this.bindStatus = "";
      this.getBatteryList();
    },
    /* 获取电池列表 */
    getBatteryList() {
      let loginData = JSON.parse(utils.getStorage("loginData"));
      let options = {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        companyName: `${this.batCustom}`,
        batteryGroupOrDeviceCode: this.batteryId,
        modelId: this.batteryModel,
        bindingStatus: this.bindStatus,
        status: 0
      };
      this.$axios.get("/battery_group", options).then(res => {
        this.tableData = [];
        this.loading = false;
        if (res.data && res.data.code === 0) {
          let result = res.data.data;
          this.total = result.total;
          // AdminRoles
          result.pageData.forEach(key => {
            key.onLine = key.onlineStatus === 0 || key.onlineStatus === null;
            if (key.deviceId) {
              key.hasbind = false;
              key.deviceCode = key.deviceCode;
              key.bindingName = "已绑定";
            } else {
              key.bindingName = "未绑定";
              key.hasbind = true;
              key.deviceCode = "无";
            }
            if (loginData.type === 1) {
              key.isPlat = true;
            } else {
              key.canDelete = false;
              if (this.AdminRoles.deleteBattery && key.hasbind) {
                key.canDelete = true;
              } else {
                key.canDelete = false;
              }
            }
            this.tableData.push(key);
          });
        }
      });
    },
    /* 获取电池型号列表 */
    getBatteryModelList() {
      this.$axios.get("/dic?type=Model&categoryId=2").then(res => {
        console.log("获取电池型号列表", res);
        if (res.data && res.data.code === 0) {
          this.Modeloptions = res.data.data;
          // console.log(utils);
          utils.setStorage("Modeloptions", JSON.stringify(res.data.data));
        }
      });
    },
    /* 获取电池组客户企业表 */
    getCompanyId() {
      this.$axios.get("/company/purchase_names").then(res => {
        console.log("获取电池组客户企业表", res);
        if (res.data && res.data.code === 0) {
          this.batCustomOpts = res.data.data;
          utils.setStorage("batCustomOpts", JSON.stringify(res.data.data));
        }
      });
    },
    getDeviceList() {
      this.$axios.get("/device/code?status=0&bindingStatus=0").then(res => {
        console.log("设备编号", res);
        if (res.data && res.data.code === 0) {
          this.deviceIdOpts = res.data.data;
          utils.setStorage("deviceIdOpts", JSON.stringify(res.data.data));
        }
      });
    },
    /* 用户权限 */
    userRole() {
      let roles = JSON.parse(utils.getStorage("loginData"));
      console.log(this.AdminRoles);
    }
  },
  mounted() {
    this.$store.state.addBattery = false;
    this.getBatteryModelList();
    this.getCompanyId();
    this.getBatteryList();
    this.getDeviceList();
    this.userRole();
    this.connectMqtt();
  }
};
</script>
