<template>
  <el-dialog width="600px"
    :title="userText"
    @close="closedIt"
    :visible.sync="manfictor">
    <el-form :model="adminForm"
      :rules="customerRules"
      ref="adminForm">
      <el-row :gutter="40">
        <el-col :span="12">
          <el-form-item :label="$t('useMsg.name')"
            prop="account">
            <el-input size="small"
              v-model="adminForm.account"
              auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('useMsg.loginPwd')"
            prop="password">
            <el-input size="small"
              v-model="adminForm.password"
              type="password"
              auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="12">
          <el-form-item :label="$t('useMsg.phone')"
            prop="phone">
            <el-input size="small"
              v-model="adminForm.phone"
              auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('useMsg.email')"
            prop="email">
            <el-input size="small"
              v-model="adminForm.email"
              auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="12">
          <el-form-item :label="$t('useMsg.enterpriseName')"
            prop="companyName">
            <el-input size="small"
              v-model="adminForm.companyName"
              auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div>
    </div>
    <div slot="footer"
      class="dialog-footer">
      <el-button @click="resetAdmin('adminForm')">{{$t('timeBtn.reset')}}</el-button>
      <el-button :loading="addadmin"
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
      addadmin: false,
      creatAdmin: true,
      adminForm: {},
      // manfictor: true,
      natureOptions: [
        {
          label: t('useMsg.add.china'),
          value: "0"
        },
        {
          label: t('useMsg.add.international'),
          value: "1"
        }
      ],
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
        ],
        companyName: [
          { required: true, message: t('useMsg.warn.enterprise'), trigger: "change" }
        ],
        nature: [
          { required: true, message: t('useMsg.warn.nature'), trigger: "change" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["userText"]),
    manfictor: {
      get: function () {
        return this.$store.state.manfictor;
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
  mounted () {
    // this.userText = sessionStorage.getItem("useItem");
  },
  methods: {
    resetAdmin (formName) {
      this.$refs[formName].resetFields();
      this.adminForm = {};
    },
    submitAdmin (formName) {
      console.log(this.typeId);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addadmin = true;
          if (this.typeId === "1") {
            let params = {
              account: this.adminForm.account,
              password: this.adminForm.password,
              phone: this.adminForm.phone,
              email: this.adminForm.email,
              companyName: this.adminForm.companyName,
              isCreator: 1
            };
            this.$api.createCompany(params).then(res => {
              console.log(res);
              this.addadmin = false;
              if (res.data && res.data.code === 0) {
                this.$message({
                  type: "success",
                  message: t('successTips.addSuccess') //"创建成功"
                });
                this.$emit("hasCreated", { value: true });
                this.$store.state.manfictor = false;
                // this.resetAdmin('adminForm');
              }
            });
          }
          if (this.typeId === "2") {
            let options = {
              account: this.adminForm.account,
              password: this.adminForm.password,
              phone: this.adminForm.phone,
              email: this.adminForm.email,
              companyName: this.adminForm.companyName,
              isCreator: 0
            };
            this.$api.createPurchaser(options).then(res => {
              console.log(res);
              this.addadmin = false;
              if (res.data && res.data.code === 0) {
                this.$message({
                  type: "success",
                  message: t('successTips.addSuccess') //"创建成功"
                });
                this.$emit("hasCreated", { value: true });
                this.$store.state.manfictor = false;
                // this.resetAdmin('adminForm');
              }
            });
          }
        } else {
          console.log("no");
          return false;
        }
      });
    },
    closedIt () {
      console.log("it closed");
      this.$store.state.manfictor = false;
      this.addadmin = false;
      this.resetAdmin("adminForm");
    }
  }
};
</script>
