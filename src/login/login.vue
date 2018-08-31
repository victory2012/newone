<template>
  <div class="login">
    <div class="img">
      <img src="../assets/img/login-bg.svg" alt="">
    </div>
    <div class="item">
      <div class="form">
        <el-tabs v-model="activeName" :stretch="true">
          <el-tab-pane label="账户密码登录" name="accPwd">
            <el-form label-position="top" :rules="LoginRules" ref="LoginForm" label-width="80px" :model="LoginForm">
              <el-form-item label="账号" prop="account">
                <el-input v-model="LoginForm.account"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="LoginForm.password"></el-input>
              </el-form-item>
              <el-form-item>
                <button @click.stop.prevent="accountLogin('LoginForm')" class="accpwsBtn">登录</button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="验证码登录" name="SMScode">
            <el-form label-position="top" :rules="phoneRules" ref="smsPhone" label-width="80px" :model="smsForm">
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="smsForm.phone"></el-input>
              </el-form-item>
              <el-form-item label="短信验证码" class="smsCode" prop="smsCode">
                <el-input v-model="smsForm.smsCode"></el-input>
                <el-button class="getSms" @click="getSmsCode" :disabled="hasGetSms" type="primary" plain>{{smsMsg}}</el-button>
              </el-form-item>
              <el-form-item>
                <button @click.stop.prevent="checkSmsCode" class="accpwsBtn">登录</button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
// import utils from "@/utils/utils";
export default {
  data() {
    return {
      hasGetSms: false,
      smsMsg: "获取验证码",
      activeName: "accPwd",
      smsForm: {
        phone: "",
        smsCode: ""
      },
      phoneRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          { pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: "手机号格式错误" }
        ],
        smsCode: [
          { required: true, message: "请输入短信验证码", trigger: "blur" }
        ]
      },
      LoginForm: {},
      LoginRules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    accountLogin(LoginForm) {
      this.$refs[LoginForm].validate(valid => {
        if (valid) {
          let person = {
            account: this.LoginForm.account,
            password: this.LoginForm.password
          };
          this.$axios.post(`/login`, person).then(res => {
            console.log(res);
            if (res.data && res.data.code === 0) {
              this.$store.commit("setTokenStorage", res.headers.token);
              this.$store.commit("setStorage", JSON.stringify(res.data.data));
              this.$axios
                .get(`/user/permissions/${res.data.data.id}`)
                .then(opts => {
                  if (opts.data && opts.data.code === 0) {
                    this.$store.commit(
                      "setUserRole",
                      JSON.stringify(opts.data.data)
                    );
                    // utils.setStorage("userRoles", JSON.stringify(opts.data.data));
                    this.$router.push("/battery");
                  }
                });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getSmsCode() {
      // this.$refs.smsPhone.validateField("phone");
      this.$refs.smsPhone.validateField("phone", opts => {
        console.log(opts);
        if (opts === "" || opts === undefined || opts === null) {
          let conut = 60;
          this.$axios
            .post("/login/sms/send", { phone: this.smsForm.phone })
            .then(res => {
              console.log(res);
              if (res.data && res.data.code === 0) {
                this.hasGetSms = true;
                let Timer = setInterval(() => {
                  conut--;
                  this.smsMsg = `重新获取${conut}s`;
                  if (conut < 1) {
                    this.smsMsg = "获取验证码";
                    this.hasGetSms = false;
                    clearInterval(Timer);
                  }
                }, 1000);
                this.$message({
                  type: "success",
                  message: "发送成功"
                });
              }
            });
        }
      });
    },
    checkSmsCode() {
      this.$refs.smsPhone.validate(valid => {
        if (valid) {
          let phoneObj = {
            phone: this.smsForm.phone,
            code: this.smsForm.smsCode
          };
          this.$axios.post("/login/sms/verify", phoneObj).then(res => {
            console.log(res);
            if (res.data && res.data.code === 0) {
              this.$store.commit("setStorage", JSON.stringify(res.data));
              this.$store.commit("setTokenStorage", res.headers.token);
              this.$router.push("/battery");
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  height: 100%;
  padding: 120px;
  min-width: 1314px;
  min-height: 586px;
  overflow: hidden;
  overflow-x: auto;
  box-sizing: border-box;
  .img {
    float: left;
    // flex: 1;
    width: 65%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 70%;
      min-width: 600px;
    }
  }
  .item {
    float: left;
    // flex: 0 0 400px;
    width: 35%;
    min-width: 375px;
    height: 100%;
    min-height: 586px;
    background: rgba(113, 191, 219, 0.2);
    border-radius: 10px;
    .form {
      font-size: 14px;
      min-width: 310px;
      max-width: 390px;
      width: 80%;
      margin: 120px auto;
      .smsCode {
        .el-input {
          width: 62%;
        }
        .getSms {
          float: right;
        }
      }
    }
  }
  .el-tab-pane {
    padding-top: 60px;
  }
  .accpwsBtn {
    margin-top: 20px;
    font-size: 14px;
    width: 156px;
    height: 45px;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    touch-action: manipulation;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    line-height: 1.15;
    padding: 0 15px;
    color: #ffffff;
    background: #71bfdb;
  }
}
</style>
