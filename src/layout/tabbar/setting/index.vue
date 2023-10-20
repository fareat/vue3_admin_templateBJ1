<template>
    <el-button  size="small" :icon="Refresh" circle="true"></el-button>
    <el-button  size="small" :icon="FullScreen" circle="true"></el-button>
    <el-button  size="small" :icon="Setting" circle="true"></el-button>
    <img src="/logo1.png" style="width:24px; height:24px; margin:0px 15px">
    <el-dropdown>
        <span class="el-dropdown-link">
          admin
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
import { ArrowRight,Refresh,FullScreen,Setting } from '@element-plus/icons-vue'
</script>

<script lang="ts">
export default {
    name:"Setting"
}
</script>

<style scoped>

</style>