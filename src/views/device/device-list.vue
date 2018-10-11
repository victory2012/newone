<template>
  <div class="device">
    <div class="topTab">
      <div class="icons">
        <div v-if="storge.type === 1" class="items" @click="regDialog">
          <img src="../../../static/img/device_reg.png" alt="">
          <p>设备注册</p>
        </div>
        <div v-if="storge.type === 1" class="items" style="position: relative">
          <input class="fileUpload" type="file" @change="fileUpload" v-loading.fullscreen.lock="fullscreenLoading" />
          <img src="../../../static/img/device_import.png" alt="">
          <p>批量导入</p>
        </div>
        <div v-if="storge.type === 1" class="items">
          <router-link to="/device/defriend">
            <img src="../../../static/img/device_recover.png" alt="">
            <p>恢复拉黑设备</p>
          </router-link>
        </div>
      </div>
      <div class="select">
        <div class="item">
          <el-input size="small" style="width:100%" v-model="content" placeholder="设备编号"></el-input>
        </div>
        <div class="item" v-if="manufacturerName">
          <el-select size="small" style="width:100%" v-model="manufactur" placeholder="生产企业">
            <el-option v-for="item in companyArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="item">
          <el-select size="small" style="width:100%" v-model="bindState" placeholder="绑定状态">
            <el-option v-for="item in bindOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <el-button @click="getDeviceList" size="small" type="primary">确定</el-button>
          <el-button @click="clearAll" size="small" plain>清空</el-button>
        </div>
      </div>
    </div>
    <div class="tableContent">
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <!-- <el-table-column type="index" width="50" align="center" label="序号"></el-table-column> -->
        <el-table-column prop="code" align="center" label="设备编号">
        </el-table-column>
        <el-table-column prop="companyName" align="center" label="企业名称">
        </el-table-column>
        <!-- <el-table-column prop="registerCode" align="center" label="设备注册状态">
        </el-table-column> -->
        <el-table-column prop="bindState" align="center" label="电池绑定状态">
        </el-table-column>
        <el-table-column align="center" label="监测设备">
          <template slot-scope="scope">
            <el-button @click.native.prevent="MonitorDevice(scope.row)" type="text" size="small">
              查看
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200px">
          <template slot-scope="scope">
            <el-button @click.native.prevent="addBlack(scope.row)" type="text" :disabled="scope.row.blackStatus" size="small">
              拉黑
            </el-button>
            <el-button @click.native.prevent="deleteRow(scope.row)" :disabled="scope.row.delete" type="text" size="small">
              删除
            </el-button>
            <el-button @click.native.prevent="uplevel(scope.row)" :disabled="scope.row.uplevels" type="text" size="small">
              设备升级
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="['10','20','30','50']" :page-size="pageSize" layout="sizes, prev, pager, next" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="设备注册" width="600px" :visible.sync="regDevice">
      <el-form :model="regform" :rules="regRules" ref="regform">
        <el-form-item prop="name" label="设备编号" :label-width="'150px'">
          <el-input style="width:200px;" size="small" v-model="regform.name" placeholder="设备编号" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="deviceType" label="设备类别" :label-width=" '150px' ">
          <el-select style="width:200px;" size="small" v-model="regform.deviceType " placeholder="请选择设备类别">
            <el-option v-for="item in categoryArr" :key="item.name" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="company" label="相关企业" :label-width=" '150px' ">
          <el-select style="width:200px;" size="small" v-model="regform.company " placeholder="请选择企业">
            <el-option v-for="item in companyArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="resetRegform('regform')">取 消</el-button>
        <el-button :loading="createDevice" size="small" type="primary " @click="submitRegForm('regform')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
/* eslint-disable */
import XLSX from "xlsx";
import utils from "@/utils/utils";

let wb; // 读取完成的数据
let rABS = false; // 是否将文件读取为二进制字符串
export default {
  data() {
    return {
      manufacturerName: false,
      createDevice: false,
      storge: "",
      categoryArr: [],
      manufactur: "", // 生产企业名称
      regDevice: false,
      total: 0, // 总数量
      currentPage: 1, // 当前页
      pageSize: 10,
      content: "",
      regform: {},
      loading: true,
      fullscreenLoading: false,
      regState: "",
      bindState: "",
      regRules: {
        name: [
          { required: true, message: "请输入设备编号", trigger: "change" }
        ],
        deviceType: [
          { required: true, message: "请选择设备类别", trigger: "change" }
        ],
        company: [{ required: true, message: "请选择企业", trigger: "change" }]
      },
      companyArr: [],
      tableData: [],
      manufacturOptions: [],
      stateOptions: [
        {
          value: "1",
          label: "已注册"
        },
        {
          value: "0",
          label: "未注册"
        }
      ],
      bindOptions: [
        {
          value: "1",
          label: "已绑定"
        },
        {
          value: "0",
          label: "未绑定"
        }
      ]
    };
  },
  methods: {
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
        this.fullscreenLoading = false;
        this.eventUpload.value = "";
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
            console.log(results);
            if (!results["生产企业"] || !results["编号"]) {
              this.$message.error("生产企业或设备编号不能为空，请检查文件");
              this.fullscreenLoading = false;
              return;
            }
            if (!results["编号"]) {
              this.$message.error("生产企业或设备编号不能为空，请检查文件");
              this.fullscreenLoading = false;
              return;
            }
            if (
              resultObj[i + 1] &&
              results["编号"] === resultObj[i + 1]["编号"]
            ) {
              this.$message.error("设备编号不能重复，请检查文件");
              this.fullscreenLoading = false;
              return;
            }
            let ItemObj = {
              companyName: "",
              deviceCodes: []
            };
            ItemObj.companyName = results["生产企业"];
            ItemObj.deviceCodes.push(results["编号"]);
            valuesObj.push(ItemObj);
          }
          // console.log(valuesObj);
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
      this.$axios.post(`/device/2/batch`, data).then(res => {
        console.log(res);
        this.fullscreenLoading = false;
        if (res.data && res.data.code === 0) {
          this.$message.success("批量添加成功");
          this.getDeviceList();
        } else {
          if (this.eventUpload) {
            this.eventUpload.value = "";
          }
        }
      });
    },
    resetRegform(form) {
      this.regDevice = false;
      this.$refs[form].resetFields();
    },
    submitRegForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.createDevice = true;
          let category;
          let companyName;
          this.categoryArr.forEach(key => {
            if (key.id === this.regform.deviceType) {
              category = key.name;
            }
          });
          this.companyArr.forEach(key => {
            if (key.id === this.regform.company) {
              companyName = key.name;
            }
          });
          let deviceObj = {
            code: this.regform.name, // 设备编号
            companyId: this.regform.company, // 公司id
            categoryId: this.regform.deviceType,
            companyName: companyName,
            category: category
          };
          this.$axios.post("/device", deviceObj).then(res => {
            console.log(res);
            this.createDevice = false;
            if (res.data && res.data.code === 0) {
              this.$message({
                type: "success",
                message: "设备注册成功"
              });
              this.getDeviceList();
              this.regDevice = false;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /* 改变每页显示的数量 */
    handleSizeChange(val) {
      this.pageSize = val;
      this.getDeviceList();
    },
    /* 改变当前页 */
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getDeviceList();
    },
    /* 查看 */
    MonitorDevice(data) {
      this.$router.push({
        path: "/device-real",
        query: {
          deviceCode: data.code,
          hostId: data.hostId,
          id: data.id
        }
      });
    },
    /* 添加黑名单 */
    addBlack(data) {
      console.log(data);
      // if (data.)
      let deviceObj = {
        id: data.id,
        status: -1
      };
      this.$axios.put("device", deviceObj).then(res => {
        console.log(res);
        if (res.data && res.data.code === 0) {
          this.$message({
            type: "success",
            message: res.data.msg
          });
          this.getDeviceList();
        }
      });
    },
    /* 删除设备 */
    deleteRow(data) {
      this.$messageBox.alert("确定删除此设备吗？", {
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        callback: action => {
          if (action === "confirm") {
            this.$axios.delete(`/device/${data.id}`).then(res => {
              console.log(res);
              if (res.data && res.data.code === 0) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.getDeviceList();
              }
            });
          }
        }
      });
    },
    /* 设备升级 */
    uplevel() {},
    /* 设备注册 -- 按钮 */
    regDialog() {
      this.regDevice = true;
    },
    /* 获取公司列表 */
    getCompany() {
      this.categoryArr = [];
      this.companyArr = [];
      this.$axios.get(`company/manufacturer_names`).then(res => {
        console.log(res);
        if (res.data && res.data.code === 0) {
          this.companyArr = res.data.data;
        }
      });
      this.$axios.get("/category").then(res => {
        console.log(res);
        if (res.data && res.data.code === 0) {
          let result = res.data.data;
          result.forEach(key => {
            if (key.id === 1) {
              key.label = "电池追踪";
            }
            if (key.id === 2) {
              key.label = "电池监测";
            }
            this.categoryArr.push(key);
          });
        }
      });
    },
    /* 清空 */
    clearAll() {
      this.regState = "";
      this.bindState = "";
      this.content = "";
      this.manufactur = "";
      this.getDeviceList();
    },
    searchDevice() {
      this.getDeviceList();
    },
    /* 获取设备列表 */
    getDeviceList() {
      this.loading = true;
      let pageObj = {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        // registerStatus: this.regState,
        status: 0,
        topLayerCompanyId: this.manufactur,
        bindingStatus: this.bindState
      };
      if (this.content || this.content === 0) {
        pageObj.code = this.content;
      }
      this.$axios.get("/device", pageObj).then(res => {
        console.log(res);
        this.loading = false;
        if (res.data && res.data.code === 0) {
          let result = res.data.data;
          this.total = result.total;
          this.tableData = [];

          if (result.pageData.length > 0) {
            result.pageData.forEach(key => {
              key.online = key.onlineStatus === 0;
              key.blackStatus = key.status === -1;
              key.registerCode =
                key.registerCode === null ? "未注册" : "已注册";
              key.bindStatus = key.hostId === null;
              key.canlook = key.hostId === null;
              key.delete = !key.bindStatus;
              key.bindState = key.hostId === null ? "未绑定" : "已绑定";
              if (this.storge.type !== 1 && this.storge.layerName !== "平台") {
                key.blackStatus = true;
                key.delete = true;
                key.uplevels = true;
              }
              this.tableData.push(key);
            });
          }
        }
      });
    }
  },
  mounted() {
    this.storge = JSON.parse(utils.getStorage("loginData"));
    this.getDeviceList();
    if (this.storge.type === 1) {
      this.manufacturerName = true;
      this.getCompany();
    }
  }
};
</script>
<style lang="scss" scoped>
.device {
  background: #ffffff;
  padding: 24px;
  .topTab {
    min-width: 1014px;
    display: flex;
    height: 60px;
    .icons {
      flex: 0 0 42%;
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
        a {
          color: #484848;
        }
        img {
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
  .tableContent {
    padding-top: 50px;
  }
}
.page {
  padding-top: 20px;
  text-align: right;
}
</style>
