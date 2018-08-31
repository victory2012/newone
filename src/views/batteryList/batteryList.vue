<template>
  <div class="batteryList">
    <div class="topTab">
      <div class="icons">
        <div v-if="getUserType !== 1">
          <div class="items">
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
          <div class="items">
            <el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-success="flieSuccess" :on-progress="onGoing" :on-error="flieError" :show-file-list="false" :multiple="false" :auto-upload="true">
              <div slot="trigger">
                <img id="import" :src="'../../../static/img/device_import.png'" alt="">
                <p>批量导入</p>
              </div>
            </el-upload>
          </div>
          <div class="items" @click="recovery">
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
            <el-button @click="bindDeviceClick(scope.row)" :disabled="!scope.row.hasbind || getUserType === 1" type="text" size="small">绑定</el-button>
            <el-button @click="unbindClick(scope.row)" :disabled="scope.row.hasbind || getUserType === 1" type="text" size="small">解绑</el-button>
            <!-- <el-button @click="bindDeviceClick(scope.row)" type="text" size="small">拉黑</el-button> -->
            <el-button @click="deleteBattery(scope.row)" :disabled="!scope.row.hasbind || getUserType === 1" type="text" size="small">删除</el-button>
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
      <el-form :model="deviceModel" label-width="150px" label-position="right" ref="deviceModel">
        <el-form-item label="监测设备编号" prop="deviceId" :rules="[{ required: true, message: '请输入内容', trigger: 'change' }]">
          <el-select size="small" style="width:210px" v-model="deviceModel.deviceId" placeholder="设备编号">
            <el-option v-for="item in deviceIdOpts" :key="item.code" :label="item.code" :value="item.id" :disabled="item.disabled">
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
</style>
<script>
import { mapGetters } from "vuex";
import utils from "@/utils/utils";

export default {
  components: {
    "add-battery": () => import("@/components/battery/addBattery")
  },
  data() {
    return {
      showAdd: "",
      deviceModel: {},
      bindDevice: false,
      addType: "",
      labels: "",
      titles: "",
      addModel: false,
      batteryId: "",
      loading: false,
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
  computed: {
    ...mapGetters(["getUserType"])
  },
  methods: {
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
          let bindObj = {
            hostId: this.bindHostId,
            deviceId: this.deviceModel.deviceId
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
      this.pageSize = val;
      this.getBatteryList();
    },
    /* 显示第几页 */
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getBatteryList();
    },
    lookFor(row) {
      console.log(row);
      this.$router.push({
        path: "battery/run",
        query: {
          deviceId: row.deviceId
        }
      });
    },
    deleteBattery(row) {
      if (!row.id) return;
      this.$axios.delete(`/host/${row.id}`).then(res => {
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
    /* 绑定按钮 */
    bindDeviceClick(row) {
      console.log(row);
      this.getDeviceList();
      this.bindDevice = true;
      this.bindHostId = row.hostId;
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
    flieError() {
      console.log("上传失败");
    },
    onGoing() {
      console.log("上传中");
    },
    flieSuccess() {
      console.log("成功");
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
      let options = {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        companyName: `${this.batCustom}`,
        batteryGroupOrDeviceCode: this.batteryId,
        modelId: this.batteryModel,
        bindingStatus: this.bindStatus
      };
      this.$axios.get("/battery_group", options).then(res => {
        console.log(res);
        this.tableData = [];
        if (res.data && res.data.code === 0) {
          let result = res.data.data;
          this.total = result.total;
          result.pageData.forEach(key => {
            key.onLine = key.onlineStatus === 0 || key.onlineStatus === null;
            key.hasbind = key.deviceId === null;
            key.bindingName = key.deviceId === null ? "未绑定" : "已绑定";
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
      this.$axios.get("/company/names?layer=2").then(res => {
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
      console.log("roles", roles.type);
    }
  },
  mounted() {
    this.$store.state.addBattery = false;
    this.getBatteryModelList();
    this.getCompanyId();
    this.getBatteryList();
    this.userRole();
  }
};
</script>
