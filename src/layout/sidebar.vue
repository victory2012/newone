<template>
  <div>
    <template v-for="value in menuData">
      <el-submenu v-if="value !=='' && value.children && value.children !== ''" :index="value.link" :key="value.id">
        <template slot="title">
          <i :class="value.icon"></i>
          <span slot="title">{{value.text}}</span>
        </template>
        <MenuTree :menuData="value.children"></MenuTree>
      </el-submenu>
      <el-menu-item v-else-if="value !==''" :index="value.link" :key="value.id">
        <i :class="value.icon"></i>
        <span slot="title">{{value.text}}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
// import { Submenu, MenuItem } from "element-ui";
export default {
  // components: {
  //   "el-submenu": Submenu,
  //   "el-menu-item": MenuItem
  // },
  props: ["menuData"],
  name: "MenuTree"
};
</script>

