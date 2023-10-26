<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <!--登录的表单-->
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1 class="hd1">hello</h1>
          <h2 class="hd2">欢迎来到甘显焕的平台</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
              placeholder="账号"
              clearable
            />
          </el-form-item>
          <el-form-item prop="password">
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
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
//引入当前获取时间的函数
import { getTime } from '@/utils/time'
//引入用户信息小仓库
import useUserStore from '@/store/modules/user'
//获取el-form组件
//获取退出时的页面路由
let $route = useRoute()
let loginForms = ref()
let useStore = useUserStore()
//定义变量，控制按钮加载效果
let loading = ref(false)
//获取路由
let $router = useRouter()
let loginForm = reactive({ username: 'admin', password: 'atguigu123' })

const login = async () => {
  await loginForms.value.validate()
  loading.value = true
  //console.log(123);
  //通知仓库发送登录请求
  //请求成功-》首页展示
  //请求失败-》弹出登录失败信息
  try {
    //可以书写.then语法
    //保证登录成功
    await useStore.userLogin(loginForm)
    //判断登录时是否带有query参数，如有，则往query的路径转，没有就跳首页
    let redirect: any = $route.query.redirect
    $router.push({ path: redirect || '/' })
    //加载效果
    loading.value = true

    //成功提示信息
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `Hi,${getTime()}好`,
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
//自定义效验规则--账号
const validatorUserName = (rule: any, value: any, callback: any) => {
  //rule:即为效验规则对象
  //value:即为表单元素文本内容
  //函数：如果符合条件callBack放行通过
  //如果不通符合条件，则注入错误的提示信息
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少五位'))
  }
}
//自定义效验规则--密码
const validatorPassword = (rule: any, value: any, callback: any) => {
  //rule:即为效验规则对象
  //value:即为表单元素文本内容
  //函数：如果符合条件callBack放行通过
  //如果不通符合条件，则注入错误的提示信息
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少六位'))
  }
}
//定义表单效验需要配置的对象
const rules = {
  //required必填
  //message错误信息
  username: [
    //{required:true,message:'用户名不能为空',tirgger:'change'},
    //{min:3,max:10,message:'长度为3~10个',trigger:'change'}
    { trigger: 'change', validator: validatorUserName },
  ],
  password: [
    //{required:true,message:'用户名不能为空',tirgger:'blur'},
    //{min:3,max:10,message:'长度为3~10个',trigger:'blur'}
    { trigger: 'change', validator: validatorPassword },
  ],
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
