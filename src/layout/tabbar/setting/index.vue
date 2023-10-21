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
  <el-button size="small" :icon="Setting" circle="true"></el-button>
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
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
//引入面包屑分隔图标
import {
  ArrowRight,
  Refresh,
  FullScreen,
  Setting,
} from '@element-plus/icons-vue'
//获取骨架的小仓库
import useLayOutSettingStore from '@/store/modules/setting'
//获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
let UserStore = useUserStore()

let LayOutSettingStore = useLayOutSettingStore()
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
</script>

<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style scoped></style>
