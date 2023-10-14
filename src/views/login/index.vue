<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1 class="hd1">hello</h1>
          <h2 class="hd2">欢迎来到甘显焕的平台</h2>
          <el-form-item>
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
              placeholder="账号"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-input
              :prefix-icon="Lock"
              v-model="loginForm.password"
              type="password"
              placeholder="密码"
              show-password
            />
          </el-form-item>
          <el-button class="login_btn" type="primary" size="default">
            登录
          </el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { Lock, User } from '@element-plus/icons-vue'
import { reactive } from 'vue'
let loginForm = reactive({ username: 'admin', password: '111111' })
</script>

<style scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
    .hd1 {
      color: white;
      font-size: 40px;
    }
    .hd2 {
      color: white;
      font-size: 20px;
      margin: 20px 0px;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
