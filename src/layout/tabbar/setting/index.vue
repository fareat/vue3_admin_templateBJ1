<template>
  <el-button
    size="small"
    :icon="Refresh"
    circle="true"
    @click="updateRefsh"
  ></el-button>
  <el-button
    size="small"
    :icon="FullScreen"
    circle="true"
    @click="fullScreen"
  ></el-button>

  <el-button
    @click="drawer = true"
    size="small"
    :icon="Setting"
    circle="true"
  ></el-button>

  <el-drawer
    :append-to-body="true"
    v-model="drawer"
    :with-header="false"
    size="300px"
  >
    <template #header>
      <p>主题设置</p>
    </template>
    <template #default>
      <!--表单组件-->
      <el-form>
        <el-form-item label="主题设置"></el-form-item>
        <el-form-item label="主题颜色">
          <el-color-picker
            v-model="color"
            show-alpha
            @change="setColor"
            :predefine="predefineColors"
          />
        </el-form-item>
        <el-form-item label="暗黑模式">
          <el-switch
            v-model="dark"
            class="mt-2"
            style="margin-left: 24px"
            inline-prompt
            active-icon="MoonNight"
            inactive-icon="Sunny"
            @change="changeDark"
          />
        </el-form-item>
      </el-form>
    </template>
  </el-drawer>

  <img
    :src="UserStore.avatar"
    style="width: 24px; height: 24px; margin: 0px 15px; border-radius: 50%"
  />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ UserStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
//引入面包屑分隔图标
import { Refresh, FullScreen, Setting } from '@element-plus/icons-vue'
//获取骨架的小仓库
import useLayOutSettingStore from '@/store/modules/setting'
//获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
//引入路由，实现退出跳转
import { useRouter, useRoute } from 'vue-router'
//获取路由器对象
let $router = useRouter()
//退出时获取路由对象
let $route = useRoute()
let UserStore = useUserStore()
const drawer = ref(false)
let LayOutSettingStore = useLayOutSettingStore()
//收集开关的数据
let dark = ref<boolean>(false)
//刷新按钮点击的回调
const updateRefsh = () => {
  LayOutSettingStore.refsh = !LayOutSettingStore.refsh
}
const fullScreen = () => {
  //全屏按钮的点击回调
  //判断当前是否全屏
  let full = document.fullscreenElement
  //切换全屏模式
  if (!full) {
    //进入全屏
    document.documentElement.requestFullscreen()
  } else {
    //退出全屏
    document.exitFullscreen()
  }
}

//退出登录按钮点击的回调
//第一件事：需要向服务器发送请求（退出登录接口）
//第二件事：仓库中关于用户相关的数据清空（token|username|avatar）
//第三剑士：跳转到登录页面
//async与await是一起用的，他的意思是当await运行完之后才能往下执行
const logout = async () => {
  await UserStore.userLogout()
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
//颜色组件的数据
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
//场景开关--》暗黑模式
const changeDark = () => {
  //获取Html的根节点
  let html = document.documentElement
  //判断Html标签是否有类名dark
  dark.value ? (html.className = 'dark') : (html.className = '')
}
//主题颜色的设置
const setColor = () => {
  //通知JS修改根节点的样式对象的属性与属性值
  const html = document.documentElement
  // 获取 css 变量
  getComputedStyle(html).getPropertyValue(`--el-color-primary`)

  // 设置 css 变量
  html.style.setProperty('--el-color-primary', color.value)
}
</script>

<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style scoped></style>
