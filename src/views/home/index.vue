<template>
  <div>
    <h1>一级路由</h1>
  </div>
</template>

<script lang="ts" setup>
//引入组合式api函数之生命函数
import { onMounted } from 'vue'
//获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
let UserStore = useUserStore()

//但首页挂载完毕，发送请求获取用户信息
onMounted(() => {
  UserStore.userInfo()
})
</script>
