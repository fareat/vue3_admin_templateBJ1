<template>
  <div class="box">
    <img src="./img/1500x800-404EInstellungen-1.png" />
    <el-buttom @click="goHome" style="margin-top: 30px">首页</el-buttom>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
let $router = useRouter()
const goHome = () => {
  $router.push('/home')
}
</script>

<style scoped lang="scss">
.box {
  widows: 100vw;
  height: 100vh;
  background: #615785;
  display: flex;
  justify-content: center;
  img {
    widows: 600px;
    height: 600px;
  }
}
</style>
