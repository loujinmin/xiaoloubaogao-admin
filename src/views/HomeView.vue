<template>
  <div class="common-layout">
    <el-container>
      <el-header height="80px">
        <el-row :gutter="20">
          <el-col :span="4">
            <img src="../assets/logo.png" class="logo" alt="">
          </el-col>
          <el-col :span="16">
            <h2>后台管理系统</h2>
          </el-col>
          <el-col :span="4">
            <el-button class="btn-text" type="text" text>哈哈</el-button>
          </el-col>
        </el-row>
      </el-header>

      <el-container>

        <el-aside width="200px">
          <el-menu router active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="active" text-color="#fff">
            <el-menu-item v-for="i in list" :key="i.path" :index="i.path">
              <el-icon>
                <icon-menu />
              </el-icon>
              <span>{{i.meta.title}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main>
          <router-view></router-view>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {useRouter, useRoute} from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const list = router.getRoutes().filter(item => item.meta.isShow)
    console.log(route.path);
    
    return {
      list,
      active: route.path
    }
  }
})
</script>

<style lang="scss" scoped>
.logo {
  height: 80px;
}
h2 {
  text-align: center;
  color: #fff;
  line-height: 80px;
}
.el-header {
  background-color: #545c64;
}
.btn-text {
  float: right;
  text-align: right;
  width: 100px;
  height: 80px;
  line-height: 80px;
  color: #fff;
}
.el-aside {
  .el-menu {
    height: calc(100vh - 80px);
  }
}

.el-main {
  height: calc(100vh - 80px);
  overflow-y: auto;
}
</style>