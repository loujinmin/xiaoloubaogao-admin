<template>
  <div class="login-box">
    <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="rules" label-width="70px" class="loginForm">
      <h1>后台管理系统</h1>
      <el-form-item label="账号" prop="username">
        <el-input v-model="loginForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submintForm" class="sub-btn">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import {InitData} from '@/types/login'
import {login} from '@/http/api';

import {useRouter} from 'vue-router';

export default defineComponent({
  setup() {
    const data = reactive(new InitData)
    const router = useRouter()
    const rules = {
      username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 6, max: 24, message: '账号长度在6-24之间', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 24, message: '密码长度在6-24之间', trigger: 'blur' }
      ]
    }

    const submintForm = () => {
      data.loginFormRef?.validate(async (valid) => {
        if(valid) {
          // alert('验证通过，发送请求')
          const {data: res} = await login(data.loginForm)
          localStorage.setItem('token', res.token)
          router.push('/')
        }
      })
    }

    return {
      ...toRefs(data),
      rules,
      submintForm
    }
  }
})
</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 200px;
  background-image: linear-gradient(cyan, blue);

  .loginForm {
    width: 400px;
    padding: 20px;
    background-color: #fff;
    border-radius: 20px;
    margin: 0 auto;

    .sub-btn {
      width: 100%;
    }

    h1 {
      text-align: center;
      margin: 20px 0;
    }
  }
}
</style>