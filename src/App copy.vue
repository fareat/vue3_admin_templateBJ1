<template>
  <!--以下是演示案例-->
  <div class="box">123456</div>
  <el-button type="primary">主要按钮</el-button>
  <el-button type="danger" :icon="Delete" circle />
  <div class="demo-pagination-block">
    <div class="demonstration">All combined</div>
    <el-pagination
      :page-sizes="[100, 200, 300, 400]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    />
  </div>
  <div>
    <p>图标测试</p>
    <SvgIcon name="phone"></SvgIcon>
    <Pagination></Pagination>
  </div>
  <div class="test">
    <p>测试sass</p>
    <h1>123456123456789123132132123123</h1>
  </div>
  <div>
    <h1>测试axios二次封装</h1>
  </div>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue'
import request from '@/utils/request.ts'
import { onMounted } from 'vue'
import { reqLogin } from './api/user'

onMounted(() => {
  reqLogin({ username: 'admin', password: '111111' })
})

//当组件挂载完毕测试发一个请求
onMounted(() => {
  request({
    url: '/user/login',
    method: 'post',
    data: {
      username: 'admin',
      password: '1111111',
    },
  }).then((res) => {
    console.log('-------------')
    console.log(res)
    console.log('-------------')
  })
})
</script>

<style scoped lang="scss">
.box {
  width: 600px;
  height: 100px;
  background: rgb(213, 75, 75);
  h1 {
    color: white;
  }
}
.test {
  h1 {
    color: $color;
  }
}
</style>
