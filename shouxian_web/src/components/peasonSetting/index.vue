<template>
  <div id="peasonSetting">
    <el-container>
      <el-aside width="200px">
        <el-tree :data="data" @node-click="handleNodeClick"></el-tree>
        <el-button class="addHeight" type="warning" icon="el-icon-plus" plain>新建高级合伙人</el-button>
      </el-aside>
      <el-container>
        <el-header>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>管理员</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in breakcrumbData" :key="item">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-header>
        <el-main>
          <div class="controlBtn">
            <el-button type="warning" icon="el-icon-plus">新建</el-button>
            <el-button>批量导入</el-button>
            <el-button>删除</el-button>
            <div style="margin-top: 15px;">
              <el-input placeholder="请输入内容" v-model="input2">
                <template slot="append">.com</template>
              </el-input>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        data: [
          {
            label: "一级 1",
            children: [
              {
                label: "二级 1-1",
                children: [
                  {
                    label: "二级 1-2"
                  }
                ]
              }
            ]
          },
          {
            label: "一级 1",
            children: [
              {
                label: "二级 1-1"
              }
            ]
          }
        ],
        breakcrumbData: []
      };
    },
    methods: {
      handleNodeClick(data, node, vueComponent) {
        var treeNode = vueComponent.node;
        this.treeNodeTG(treeNode);
      },
      treeNodeTG(treeNode) {
        if (!treeNode.parent.data instanceof Array && treeNode.parent) {
          this.treeNodeTG(treeNode.parent);
        } else {
          this.breakcrumbData.push(treeNode.data.label);
        }
      }
    }
  };
</script>
<style >
#peasonSetting {
  height: 100%;
}
#peasonSetting .el-aside {
  height: 100%;
  border-right: 1px solid #f6f6f6;
  position: relative;
}
#peasonSetting .addHeight {
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-size: 12px;
}

#peasonSetting .el-header {
  height: 30px !important;
  border-bottom: 1px solid #f6f6f6;
}
#peasonSetting .el-button {
  float: left;
}
</style>