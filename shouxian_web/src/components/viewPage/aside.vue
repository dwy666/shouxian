<template>
  <el-row class="tac">
    <el-col>
      <img src="" alt="">
      <el-menu class="el-menu-vertical-demo" :unique-opened="true" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-submenu v-for="item in meunList" :key="item.index" :index="item.index">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item-group v-if="item.children">
            <el-menu-item v-for="itm in item.children" :key="itm.index" :index="itm.index">{{itm.name}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "HelloWorld",
    data() {
      return {
        meunList: [
          {
            index: "1",
            icon: "el-icon-location",
            name: "人员管理",
            children: [
              {
                index: "1-1",
                name: "人员账号"
              }
            ]
          },
          {
            index: "2",
            icon: "el-icon-menu",
            name: "设置",
            children: [
              {
                index: "2-1",
                name: "安全管理"
              }
            ]
          }
        ]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.tac {
  height: 100%;
  background-color: rgb(84, 92, 100);
}
.tac .el-submenu__title {
  text-align: left;
}
.tac .el-submenu .el-menu-item {
  text-align: left;
  padding-left: 50px !important;
}
</style>
