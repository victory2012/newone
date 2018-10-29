<template>
  <div class="login">
    <div class="img">
      <img src="../assets/img/login-bg.svg" alt="">
    </div>
    <div class="item">
      <div class="form">
        <el-tabs v-model="activeName" :stretch="true">
          <el-tab-pane :label="$t('loginMsg.labelAccPass')" name="accPwd">
            <el-form label-position="top" :rules="LoginRules" ref="LoginForm" label-width="80px" :model="LoginForm">
              <el-form-item :label="$t('loginMsg.accountPlace')" prop="account">
                <el-input v-model="LoginForm.account"></el-input>
              </el-form-item>
              <el-form-item :label="$t('loginMsg.passwordPlace')" prop="password">
                <el-input type="password" v-model="LoginForm.password" @keyup.enter.native="accountLogin('LoginForm')"></el-input>
              </el-form-item>
              <el-form-item>
                <!-- <button @click.stop.prevent="accountLogin('LoginForm')" class="accpwsBtn">登录</button> -->
                <el-button :loading="doLogin" type="primary" class="accpwsBtn" @click="accountLogin('LoginForm')" round>{{$t('loginMsg.loginBtn')}}</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane :label="$t('loginMsg.labelSmsCode')" name="SMScode">
            <el-form label-position="top" :rules="phoneRules" ref="smsPhone" label-width="80px" :model="smsForm">
              <el-form-item :label="$t('loginMsg.phone')" prop="phone">
                <el-input v-model="smsForm.phone"></el-input>
              </el-form-item>
              <el-form-item :label="$t('loginMsg.smsCode')" class="smsCode" prop="smsCode">
                <el-input v-model="smsForm.smsCode" @keyup.enter.native="getSmsCode"></el-input>
                <el-button class="getSms" @click="getSmsCode" :disabled="hasGetSms" type="primary" plain>{{smsMsg}}</el-button>
              </el-form-item>
              <el-form-item>
                <el-button :loading="doLogin" type="primary" class="accpwsBtn" @click="checkSmsCode" round>{{$t('loginMsg.loginBtn')}}</el-button>
                <!-- <button @click.stop.prevent="checkSmsCode" class="accpwsBtn">登录</button> -->
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hasGetSms: false,
      smsMsg: this.$t("loginMsg.getSmsCode"),
      activeName: "accPwd",
      smsForm: {
        phone: "",
        smsCode: ""
      },
      doLogin: false,
      phoneRules: {
        phone: [
          {
            required: true,
            message: this.$t("loginMsg.errorMsg.phoneNub"),
            trigger: "change"
          },
          {
            pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
            message: this.$t("loginMsg.errorMsg.checkPhone"),
            trigger: "change"
          }
        ],
        smsCode: [
          {
            required: true,
            message: this.$t("loginMsg.errorMsg.smsCodeErr"),
            trigger: "blur"
          }
        ]
      },
      LoginForm: {},
      LoginRules: {
        account: [
          {
            required: true,
            message: this.$t("loginMsg.errorMsg.account"),
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: this.$t("loginMsg.errorMsg.password"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    accountLogin(LoginForm) {
      this.$refs[LoginForm].validate(valid => {
        if (valid) {
          this.doLogin = true;
          let person = {
            account: this.LoginForm.account,
            password: this.LoginForm.password
          };
          this.$api.login(person).then(res => {
            console.log(res);
            this.doLogin = false;
            if (res.data && res.data.code === 0) {
              this.$store.commit("setTokenStorage", res.headers.token);
              this.$store.commit("setStorage", JSON.stringify(res.data.data));
              this.$api.permissions(res.data.data.id).then(opts => {
                if (opts.data && opts.data.code === 0) {
                  this.$store.commit(
                    "setUserRole",
                    JSON.stringify(opts.data.data)
                  );
                  this.$router.push("/overview");
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
      this.$refs.smsPhone.validateField("phone", opts => {
        console.log(opts);
        if (opts === "" || opts === undefined || opts === null) {
          let conut = 60;
          this.$api.SMScode({ phone: this.smsForm.phone }).then(res => {
            console.log(res);
            if (res.data && res.data.code === 0) {
              this.hasGetSms = true;
              let Timer = setInterval(() => {
                conut--;
                this.smsMsg = `${conut}s`;
                if (conut < 1) {
                  this.smsMsg = this.$t("loginMsg.getSmsCode");
                  this.hasGetSms = false;
                  clearInterval(Timer);
                }
              }, 1000);
              this.$message({
                type: "success",
                message: this.$t("loginMsg.smsSuccess")
              });
            }
          });
        }
      });
    },
    checkSmsCode() {
      this.$refs.smsPhone.validate(valid => {
        if (valid) {
          this.doLogin = true;
          let phoneObj = {
            phone: this.smsForm.phone,
            code: this.smsForm.smsCode
          };
          this.$api.SMSVertify(phoneObj).then(res => {
            console.log(res);
            this.doLogin = false;
            if (res.data && res.data.code === 0) {
              this.$store.commit("setTokenStorage", res.headers.token);
              this.$store.commit("setStorage", JSON.stringify(res.data.data));
              this.$api.permissions(res.data.data.id).then(opts => {
                if (opts.data && opts.data.code === 0) {
                  this.$store.commit(
                    "setUserRole",
                    JSON.stringify(opts.data.data)
                  );
                  this.$router.push("/overview");
                }
              });
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
    text-align: center;
    touch-action: manipulation;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    background: #71bfdb;
  }
}
</style>
