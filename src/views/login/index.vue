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
          <el-button
            :loading="loading"
            class="login_btn"
            @click="login"
            type="primary"
            size="default"
          >
            登录
          </el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { Lock, User } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
//引入用户信息小仓库
import useUserStore from '@/store/modules/user'

let useStore = useUserStore()
//定义变量，控制按钮加载效果
let loading = ref(false)
//获取路由
let $router = useRouter()
let loginForm = reactive({ username: 'admin', password: '111111' })

const login = async () => {
  //console.log(123);
  //通知仓库发送登录请求
  //请求成功-》首页展示
  //请求失败-》弹出登录失败信息
  try {
    //加载效果
    loading.value = true
    //可以书写.then语法
    //保证登录成功
    await useStore.userLogin(loginForm)
    $router.push('/')
    //成功提示信息
    ElNotification({
      type: 'success',
      message: '登录成功',
    })
    loading.value = false
  } catch (error) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
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
