<template>
  <div class="home">
    <div class="menu">
      <!-- <div class="changeLangue">
        <el-dropdown trigger="click"
          placement="bottom-end"
          @command="langugeHandleChange">
          <span class="el-dropdown-link cursor">
            {{localLanguge}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :disabled="$i18n.locale === 'zh'"
              command="zh">中文</el-dropdown-item>
            <el-dropdown-item divided
              command="en"
              :disabled="$i18n.locale === 'en'">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div> -->
      <div class="log">
        <el-dropdown size="small"
          placement="bottom"
          class="user-name"
          @command="handleCommand">
          <span class="el-dropdown-link">
            <span class="avatar">
              <i class="iconfont icon-user"></i>
            </span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="AdminRoles.personalInfo"
              command="userMsg">
              <i class="iconfont icon-user"></i>{{$t('userInfo.userMsg')}}
            </el-dropdown-item>
            <el-dropdown-item divided
              command="userPwd">
              <i class="el-icon-setting"></i>{{$t('userInfo.pasword')}}</el-dropdown-item>
            <el-dropdown-item divided
              command="loginout">
              <i class="iconfont icon-logout"></i>{{$t('userInfo.logOut')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <p>{{loginData.nickName}}</p>
        <p>{{loginData.companyName}}</p>
      </div>
      <el-menu class="sidebar-el-menu"
        :default-active="$route.path"
        background-color="#404040"
        text-color="rgba(255, 255, 255, 0.67)"
        :unique-opened='true'
        router>
        <MenuTree :menuData="this.menus.data"></MenuTree>
      </el-menu>
    </div>
    <div class="content">
      <el-scrollbar style="height:100%;overflow-x: hidden;">
        <div class="scrollwarrp">
          <router-view></router-view>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import utils from "@/utils/utils";
import MenuTree from "./sidebar";
import t from '@/utils/translate';
import { getManifactor, getManifactorCus, getPlat, purchaseAdmin, purchaseCus } from "./menuData";
import permissionFun from "@/utils/valated";

export default {
  data () {
    return {
      // loginData: '',
      menuData: '',
      AdminRoles: {},
      isCollapse: false,
      menus: {},
      roles: "",
      localLanguge: localStorage.getItem('locale') === 'zh' ? '中文' : 'English'
    };
  },
  components: {
    MenuTree: MenuTree
  },
  computed: {
    ...mapGetters({
      loginData: 'getUserData'
    })
  },
  mounted () {
    // let loginData = sessionStorage.getItem("loginData");
    // this.loginData = loginData ? JSON.parse(loginData) : {}
    this.AdminRoles = permissionFun();
    this.switchMenu(this.loginData);
  },
  methods: {
    handleCommand (command) {
      if (command === "loginout") {
        this.$api.logOut().then(res => {
          if (res.data && res.data.code === 0) {
            this.$store.commit("removeStorage");
            this.$store.commit("removeTokenStorage");
            this.$router.push("/login");
            utils.removeStorageAll();
          }
        });
      }
      if (command === "userMsg") {
        this.$router.push("/user-info");
      }
      if (command === "userPwd") {
        this.$router.push("/user-pwd");
      }
    },
    switchMenu (getUserType) {
      // let menuData;
      if (
        getUserType.type === 1 ||
        (getUserType.type === 3 && getUserType.layerName === "平台")
      ) {
        this.menuData = getPlat();
      } else if (
        getUserType.type === 2 &&
        getUserType.layerName === "生产企业"
      ) {
        this.menuData = getManifactor();
      } else if (
        getUserType.type === 2 &&
        getUserType.layerName === "采购企业"
      ) {
        this.menuData = purchaseAdmin();
      } else if (
        getUserType.type === 3 &&
        getUserType.layerName === "生产企业"
      ) {
        this.menuData = getManifactorCus();
      } else if (
        getUserType.type === 3 &&
        getUserType.layerName === "采购企业"
      ) {
        this.menuData = purchaseCus();
      }
      const copyData = JSON.parse(JSON.stringify(this.menuData))
      this.menus.data = this.eachMenus(copyData.data);
      this.menus.permissions = copyData.permissions;
      utils.setStorage("permissions", JSON.stringify(this.menus.permissions));
    },
    eachMenus (data) {
      data.forEach(key => {
        if (typeof key === "object") {
          key.text = t(key.text);
          if (key.children && key.children.length > 0) {
            this.eachMenus(key.children);
          }
        }
      });
      return data
    },
    langugeHandleChange (cammand) {
      if (cammand === "zh") {
        this.localLanguge = "中文";
        this.$i18n.locale = "zh";
        localStorage.setItem("locale", "zh");
      }
      if (cammand === "en") {
        this.localLanguge = "English";
        this.$i18n.locale = "en";
        localStorage.setItem("locale", "en");
      }
      const copyData2 = JSON.parse(JSON.stringify(this.menuData))
      this.menus.data = this.eachMenus(copyData2.data);
    }
  },
  beforeDestroy () {
    this.menus = {};
    this.$store.state.loginData = "";
  }
};
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  height: 100%;
  .menu {
    flex: 0 0 245px;
    overflow: hidden;
    background: #404040;
    .changeLangue {
      text-align: right;
      margin: 20px auto 30px;
      .el-dropdown {
        color: #ffffff;
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
  .content {
    box-sizing: border-box;
    flex: 1;
    background: #f0f2f5;
    overflow: auto;
    .scrollwarrp {
      padding: 20px;
    }
  }
}
.el-menu {
  width: 245px;
}
// .el-scrollbar {
//   .el-scrollbar__wrap {
//     overflow-x: hidden !important;
//   }
// }
.log {
  padding-top: 24px;
  margin: 0 auto;
  display: block;
  width: 152px;
  cursor: pointer;
  margin-bottom: 24px;
  .user-name {
    width: 40px;
    height: 40px;
    margin: 0 auto;
    margin-left: 54px;
  }
  .avatar {
    display: inline-block;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #484848;
    background: #ffffff;
    border-radius: 50%;
    i {
      font-size: 22px;
    }
  }
  p {
    color: #ffffff;
    text-align: center;
    margin: 8px 0;
    font-size: 14px;
  }
}
</style>

