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
            <el-dropdown>
              <el-button type="primary">
                选项
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="iFn">首页</el-dropdown-item>
                  <el-dropdown-item @click="cFn">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>

      <el-container>

        <el-aside width="200px">
          <el-menu router active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="active" text-color="#fff">
            <el-menu-item v-for="i in list" :key="i.path" :index="i.path">
              <span class="title">{{i.meta.title}}</span>
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
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const list = router.getRoutes().filter(item => item.meta.isShow)
    // console.log(route.path)

    function cFn(){
      localStorage.removeItem('token')
      router.push('/login')
    }

    const iFn = () => {
      router.push('/')
    }

    return {
      list,
      active: route.path,
      cFn,
      iFn
    }
  }
})
</script>

<style lang="scss" scoped>
.logo {
  height: 80px;
  margin-left: 14px;
}
.title{
  width: 200px;
  margin-left: 30px;
}
h2 {
  text-align: center;
  color: #fff;
  line-height: 80px;
}
.el-header {
  background-color: #545c64;
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

.el-button--primary {
  margin: 22px 0;
}
</style>