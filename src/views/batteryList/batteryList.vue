<template>
  <div class="batteryList">
    <div class="topTab">
      <div class="icons">
        <!-- <div class="items" @click="triggerAddBattery">
          <img src="../../../static/img/device_reg.png" alt="">
          <p>电池注册</p>
        </div>
        <div class="items">
          <el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-success="flieSuccess" :on-progress="onGoing" :on-error="flieError" :show-file-list="false" :multiple="false" :auto-upload="true">
            <div slot="trigger">
              <img src="../../../static/img/device_import.png" alt="">
              <p>批量导入</p>
            </div>
          </el-upload>
        </div>
        <div class="items">
          <img src="../../../static/img/device_recover.png" alt="">
          <p>恢复拉黑电池</p>
        </div> -->
        <div class="items">
          <el-dropdown trigger="click" placement="bottom-start" @command="handleCommand">
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
        <div class="items">
          <img id="recover" src="../../../static/img/device_recover.png" alt="">
          <p>恢复拉黑电池</p>
        </div>
      </div>
      <div class="select">
        <div class="item">
          <el-input size="small" v-model="batteryId" placeholder="电池/设备编号"></el-input>
        </div>
        <div class="item">
          <el-select size="small" v-model="batteryModel" placeholder="电池型号">
            <el-option v-for="item in Modeloptions" :key="item.id" :label="item.dicValue" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <el-select size="small" v-model="value" placeholder="客户企业名称">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <el-select size="small" v-model="value" placeholder="绑定状态">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <el-button size="mini" type="primary">查询</el-button>
          <el-button size="small" plain>清空</el-button>
        </div>
      </div>
    </div>
    <div class="tables">
      <el-table v-loading="loading" :data="tableData" style="width: 100%" :highlight-current-row="true">
        <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
        <el-table-column prop="batteryId" align="center" label="电池编号">
        </el-table-column>
        <el-table-column prop="model" align="center" label="电池型号">
        </el-table-column>
        <el-table-column prop="specification" align="center" label="电池组规格">
        </el-table-column>
        <el-table-column prop="customerName" align="center" label="客户企业名称">
        </el-table-column>
        <el-table-column prop="deviceId" align="center" label="监测设备编号">
        </el-table-column>
        <el-table-column prop="bindingName" align="center" label="绑定状态">
        </el-table-column>
        <!-- <el-table-column prop="online" align="center" label="在线状态">
        </el-table-column> -->
        <el-table-column align="center" label="运行状态">
          <template slot-scope="scope">
            <el-button @click.native.prevent="handleClick(scope.$index)" type="text" size="small">
              查看
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" width="200" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">绑定</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">解绑</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">拉黑</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="sizes, prev, pager, next" :total="total">
      </el-pagination>
    </div>
    <el-dialog width="600px" :title="titles" :visible.sync="addModel">
      <el-form :model="modelForm" :rules="modelFormRules" ref="modelForm">
        <el-form-item :label="labels" prop="dicValue">
          <el-input size="small" v-model="modelForm.dicValue" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="resetModelAdd">重 置</el-button>
        <el-button size="small" @click="submitModelAdd" type="primary">确 认</el-button>
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
// import { mapActions } from "vuex";

export default {
  components: {
    "add-battery": () => import("@/components/battery/addBattery")
  },
  data() {
    return {
      showAdd: "",
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
        value: [{ required: true, message: "请输入内容", trigger: "change" }]
      },
      batteryForm: {},
      batteryFormRules: {},
      Modeloptions: [],
      batteryModel: "",
      options: [],
      bindOptions: [],
      value: "",
      tableData: [
        {
          batteryId: "20160502",
          model: "电池组型号2",
          specification: "电池组规格2",
          customerName: "测试采购企业",
          deviceId: "1805B598C6E7",
          bindingName: "已绑定",
          online: "在线"
        }
      ]
    };
  },
  methods: {
    // ...mapActions(['getBatteryModel']),
    reloadBattery(data) {
      console.log(data);
    },
    handleSelect() {},
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
    submitModelAdd() {
      console.log(this.batteryForm);
      this.$refs.modelForm.validate(valid => {
        if (valid) {
          let params = {
            dicValue: this.modelForm.dicValue,
            categoryId: 2
          };
          if (this.addType === "addModel") {
            params.dicKey = "model";
          }
          if (this.addType === "addSpfic") {
            params.dicKey = "norm";
          }
          if (this.addType === "addSingel") {
            params.dicKey = "single_model";
          }
          this.$axios.post("/dic/user_dic", params).then(res => {
            console.log(this.addType, res);
            if (res.data && res.data.code === 0) {
              this.$message({
                type: "success",
                message: res.data.msg
              });
              this.addModel = false;
              this.modelForm = {};
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getBatteryList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getBatteryList();
    },
    handleClick(row) {
      console.log(row);
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
    getBatteryList() {
      let options = {
        pageSize: this.pageSize,
        pageNum: this.currentPage
      };
      this.$axios.get("/battery_gps", options).then(res => {
        console.log(res);
      });
    },
    /* 获取电池型号列表 */
    getBatteryModelList() {
      this.$store.dispatch('getBatteryModel');
      // this.$axios.get('/dic/user_dic?dicKey=model&categoryId=2').then(res => {
      //   console.log(res);
      //   if (res.data && res.data.code === 0) {
      //     this.Modeloptions = res.data.data;
      //   }
      // });
    }
  },
  mounted() {
    this.$store.state.addBattery = false;
    this.getBatteryModelList();
  }
};
</script>
