<template>
  <div class="home">
    <div class="menu">
      <div class="log">
        <el-dropdown size="small" placement="bottom" class="user-name" @command="handleCommand">
          <span class="el-dropdown-link">
            <span class="avatar">
              <i class="iconfont icon-user"></i>
            </span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="AdminRoles.personalInfo" command="userMsg">
              <i class="iconfont icon-user"></i>{{$t('userInfo.userMsg')}}
            </el-dropdown-item>
            <el-dropdown-item divided command="userPwd">
              <i class="el-icon-setting"></i>{{$t('userInfo.pasword')}}</el-dropdown-item>
            <el-dropdown-item divided command="loginout">
              <i class="iconfont icon-logout"></i>{{$t('userInfo.logOut')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <p>{{getUserLoginData.nickName}}</p>
        <p>{{getUserLoginData.companyName}}</p>
      </div>
      <el-menu class="sidebar-el-menu" :default-active="$route.path" background-color="#404040" text-color="rgba(255, 255, 255, 0.67)" :unique-opened='true' router>
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
import menu from "./menuData";
import permissionFun from "@/utils/valated";

export default {
  data() {
    return {
      AdminRoles: {},
      isCollapse: false,
      menus: "",
      roles: "",
      getUserLoginData: ""
    };
  },
  components: {
    MenuTree: MenuTree
  },
  mounted() {
    let loginData = sessionStorage.getItem("loginData");
    if (loginData) {
      this.AdminRoles = permissionFun();

      let getUserType = JSON.parse(loginData);
      this.getUserLoginData = getUserType;
      this.switchMenu(getUserType);
    } else {
      this.$router.push("/login");
    }
  },
  methods: {
    handleCommand(command) {
      if (command === "loginout") {
        this.$api.logOut().then(res => {
          if (res.data && res.data.code === 0) {
            this.$store.commit("removeStorage");
            this.$store.commit("removeTokenStorage");
            this.$router.push("/login");
            // this.$store.state.loginData = null;
            // this.menus = "";
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
    switchMenu(getUserType) {
      if (
        getUserType.type === 1 ||
        (getUserType.type === 3 && getUserType.layerName === "平台")
      ) {
        this.menus = menu.getPlat();
      } else if (
        getUserType.type === 2 &&
        getUserType.layerName === "生产企业"
      ) {
        this.menus = menu.getManifactor();
      } else if (
        getUserType.type === 2 &&
        getUserType.layerName === "采购企业"
      ) {
        this.menus = menu.purchaseAdmin();
      } else if (
        getUserType.type === 3 &&
        getUserType.layerName === "生产企业"
      ) {
        this.menus = menu.getManifactorCus();
      } else if (
        getUserType.type === 3 &&
        getUserType.layerName === "采购企业"
      ) {
        this.menus = menu.purchaseCus();
      }
      console.log(this.menus);
      utils.setStorage("permissions", JSON.stringify(this.menus.permissions));
    }
  },
  beforeDestroy() {
    this.menus = "";
    this.$store.state.loginData = "";
  }
};
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  height: 100%;
  .menu {
    flex: 0 0 220px;
    overflow: hidden;
    background: #404040;
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
  width: 220px;
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

