<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <!--面包屑展示匹配路由的标题-->
      <el-icon style="display: inline-flex">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
//获取路由对象
import { useRoute } from 'vue-router'
//引入面包屑分隔图标
import {
  ArrowRight,
  Refresh,
  FullScreen,
  Setting,
} from '@element-plus/icons-vue'
//引入仓库的useLayOutSettingStore，仓库为所有对象都能使用的数据存放处
import useLayOutSettingStore from '@/store/modules/setting.ts'

//import { ref } from 'vue'
//用于图标更变与菜单缩放
let LayOutSettingStore = useLayOutSettingStore()
//获取路由对象
let $route = useRoute()
//点击事件事件fold值的变更
const changeIcon = () => {
  LayOutSettingStore.fold = !LayOutSettingStore.fold
}
</script>

<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>

<style scoped></style>
