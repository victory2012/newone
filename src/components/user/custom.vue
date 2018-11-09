<template>
  <el-dialog width="600px"
    :title="userText"
    @close="closedIt"
    :visible.sync="custom">
    <el-form :model="adminForm"
      :rules="customerRules"
      ref="adminForm">
      <el-row :gutter="40">
        <el-col :span="12">
          <!-- 用户名 -->
          <el-form-item :label="$t('useMsg.name')"
            prop="account">
            <el-input v-model="adminForm.account"
              auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- 登陆密码 -->
          <el-form-item :label="$t('useMsg.loginPwd')"
            prop="password">
            <el-input v-model="adminForm.password"
              type="password"
              auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="12">
          <el-form-item :label="$t('useMsg.phone')"
            prop="phone">
            <el-input v-model="adminForm.phone"
              auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('useMsg.email')"
            prop="email">
            <el-input v-model="adminForm.email"
              auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div>
    </div>
    <div slot="footer"
      class="dialog-footer">
      <!-- 重置 -->
      <el-button @click="resetAdmin('adminForm')">{{$t('timeBtn.reset')}}</el-button>
      <!-- 确 认 -->
      <el-button :loading="addcustorm"
        @click="submitAdmin('adminForm')"
        type="primary">{{$t('timeBtn.sure')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import t from "@/utils/translate";

export default {
  props: {
    type: {
      required: true
    }
  },
  data () {
    return {
      creatAdmin: true,
      addcustorm: false,
      adminForm: {},
      customerRules: {
        account: [
          { required: true, message: t('useMsg.warn.userName'), trigger: "change" },
          { min: 4, message: t('useMsg.warn.nameLimit'), trigger: "change" }
        ],
        password: [
          { required: true, message: t('useMsg.warn.password'), trigger: "change" },
          { min: 3, max: 10, message: t('password.passwordLimit'), trigger: "change" }
        ],
        phone: [
          { required: true, message: t('useMsg.warn.phone'), trigger: "change" },
          {
            pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
            message: t('useMsg.warn.phoneCheck'),
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["userText"]),
    custom: {
      get: function () {
        return this.$store.state.custom;
      },
      set: function () { }
    },
    typeId: {
      get: function () {
        return this.type;
      },
      set: function () { }
    }
  },
  methods: {
    resetAdmin (formName) {
      this.$refs[formName].resetFields();
      this.adminForm = {};
    },
    submitAdmin (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("yes");
          this.addcustorm = true;
          if (this.typeId === "3") {
            let params = {
              account: this.adminForm.account,
              password: this.adminForm.password,
              phone: this.adminForm.phone,
              email: this.adminForm.email,
              isCreator: 0
            };
            this.$api.createUser(params).then(res => {
              console.log(res);
              this.addcustorm = false;
              if (res.data && res.data.code === 0) {
                this.$message({
                  type: "success",
                  message: t('successTips.addSuccess') //"创建成功"
                });
                this.$emit("hasCreatedCustorm", { value: true });
                this.$store.state.custom = false;
              }
            });
          }
          if (this.typeId === "4") {
            let params = {
              account: this.adminForm.account,
              password: this.adminForm.password,
              phone: this.adminForm.phone,
              email: this.adminForm.email,
              isCreator: 0
            };
            this.$api.createUser(params).then(res => {
              console.log(res);
              this.addcustorm = false;
              if (res.data && res.data.code === 0) {
                this.$message({
                  type: "success",
                  message: t('successTips.addSuccess') //"创建成功"
                });
                this.$emit("hasCreated", { value: true });
                this.$store.state.custom = false;
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    closedIt () {
      this.resetAdmin("adminForm");
      this.$store.state.custom = false;
    }
  }
};
</script>
