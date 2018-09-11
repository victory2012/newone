<template>
  <div class="container">
    <div class="phoneAdd">
      <!-- <div class="item tips">手机号码:</div> -->
      <div class="item tips"></div>
      <div class="item input">
        <!-- <el-input size="small" type="tel" v-model="input" placeholder="请输入手机号"></el-input> -->
        <el-form :model="validateForm" :rules="rules" ref="validateForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="手机号码" prop="input">
            <el-input type="tel" size="small" v-model.number="validateForm.input" auto-complete="off" placeholder="请输入手机号"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="item">
        <el-button @click="addPerson" size="small" type="primary">添加</el-button>
      </div>
    </div>
    <div class="more">已添加的告警接收人（最多3位）</div>
    <div>
      <ul>
        <li class="tabletr" v-for="key in dataArr" :key="key.id">
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="6">
              <div class="grid">{{key.contactWay}}</div>
            </el-col>
            <el-col :span="6">
              <div class="grid">{{key.createTime}}</div>
            </el-col>
            <el-col :span="6">
              <div style="padding-left: 80px;">
                <el-button @click="cancelReceive(key)" size="small" type="primary">取消接收</el-button>
              </div>
            </el-col>
          </el-row>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "",
      dataArr: [],
      validateForm: {},
      rules: {
        input: [
          { required: true, message: "手机号码不能为空", trigger: "change" },
          {
            pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
            message: "手机号格式错误",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    addPerson() {
      if (this.dataArr.length > 2) return;
      this.$refs.validateForm.validate(valid => {
        if (valid) {
          let obj = {
            contactWay: this.validateForm.input,
            type: 0
          };
          this.$axios.post("/company_global_external_notice", obj).then(res => {
            console.log(res);
            if (res.data && res.data.code === 0) {
              this.$message({
                type: "success",
                message: res.data.msg
              });
              this.validateForm.input = "";
              this.getList();
            }
          });
        }
      });
    },
    /* 取消接收 */
    cancelReceive(key) {
      console.log(key);
      this.$axios
        .delete(`/company_global_external_notice/${key.id}`)
        .then(res => {
          console.log(res);
          if (res.data && res.data.code === 0) {
            this.$message({
              type: "success",
              message: res.data.msg
            });
            this.getList();
          }
        });
    },
    getList() {
      let pageObj = {
        pageNum: 1,
        pageSize: 10
      };
      this.$axios.get("/company_global_external_notice", pageObj).then(res => {
        console.log(res);
        if (res.data && res.data.code === 0) {
          let result = res.data.data;
          this.dataArr = result.pageData;
          // result.pageData.forEach(key => {
          //   this.dataArr.push(key);
          // });
        }
      });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>
<style lang="scss" scoped>
.container {
  padding: 24px;
  background: #ffffff;
}
.phoneAdd {
  overflow: hidden;
  width: 60%;
  line-height: 32px;
  margin: 0 auto;
  margin-bottom: 50px;
  .item {
    float: left;
    &.tips {
      width: 28%;
      text-align: right;
      margin-right: 15px;
      font-size: 14px;
      color: #484848;
    }
    &.input {
      width: 42%;
      margin-right: 15px;
    }
  }
}
.more {
  font-size: 14px;
  color: #484848;
  padding-left: 106px;
  line-height: 50px;
}
.tabletr {
  line-height: 50px;
  border-bottom: 1px solid #f0f0f0;
  .grid {
    color: #484848;
  }
}
</style>
