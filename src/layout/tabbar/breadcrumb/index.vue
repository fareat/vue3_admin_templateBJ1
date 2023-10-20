<template>
    <el-icon style="margin-right:10px" @click="changeIcon">
        <component :is="LayOutSettingStore.fold?'Fold':'Expand'"></component>
    </el-icon>
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
</template>

<script setup lang="ts">
//引入面包屑分隔图标
import { ArrowRight,Refresh,FullScreen,Setting } from '@element-plus/icons-vue'
//引入仓库的useLayOutSettingStore，仓库为所有对象都能使用的数据存放处
import useLayOutSettingStore from '@/store/modules/setting.ts'

//import { ref } from 'vue'
//用于图标更变与菜单缩放
let LayOutSettingStore=useLayOutSettingStore()
//点击事件事件fold值的变更
const changeIcon=()=>{
    LayOutSettingStore.fold= ! LayOutSettingStore.fold
}


</script>

<script lang="ts">
export default {
    name:"Breadcrumb"
}
</script>

<style scoped>

</style>