<template>
  <!--树形数据与懒加载-->
  <el-table
  style="width: 100%; margin-bottom: 20px"
  row-key="id"
  border
  :data="PermisstionArr"
>
  <el-table-column prop="name" label="名称" sortable />
  <el-table-column prop="code" label="权限值" sortable />
  <el-table-column prop="updateTime" label="修改时间" sortable />
  <el-table-column  label="操作" sortable >
    <!--
      row:为一条数据的全部内容
    -->
    <template #="{row,$index}">
      <el-button type="primary" size="small" :disabled="row.level==4?true:false">{{row.level==3?'添加功能':'添加菜单'}}</el-button>
      <el-button type="primary" size="small" :disabled="row.level==1?true:false">编辑</el-button>
      <el-button type="primary" size="small" :disabled="row.level==1?true:false">删除</el-button>
    </template>
  </el-table-column>
</el-table>
</template>

<script setup lang="ts">
import {ref,onMounted} from 'vue'
//引入获取菜单请求API
import { reqAllPermisstion } from '@/api/acl/menu/index';
//引入TS类型
import type {PermisstionResponseData,PermisstionList} from '@/api/acl/menu/type'
//存储菜单数据
let PermisstionArr=ref<PermisstionList>([])


//组件挂载完毕
onMounted(()=>{
  getHasPermisstion()
})
//获取菜单数据的方法
const getHasPermisstion=async()=>{
  let result:PermisstionResponseData= await reqAllPermisstion()
  if (result.code==200) {
    PermisstionArr.value=result.data
  }
  
}
</script>

<style scoped></style>
