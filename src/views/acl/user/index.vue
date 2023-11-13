<template>
  <el-card style="height:75px;">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名:"> 
        <el-input placeholder="请输入搜索用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default">搜索</el-button>
        <el-button type="primary" size="default">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0px;" >
    <el-button type="primary" size="default">添加用户</el-button>
    <el-button type="primary" size="default">批量删除</el-button>
    <!--table展示用户信息-->
    <el-table style="margin:20px 0px;" border>
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column label="#" align="center"></el-table-column>
      <el-table-column label="ID" align="center"></el-table-column>
      <el-table-column label="用户名字" align="center"></el-table-column>
      <el-table-column label="用户名称" align="center"></el-table-column>
      <el-table-column label="用户角色" align="center"></el-table-column>
      <el-table-column label="创建时间" align="center"></el-table-column>
      <el-table-column label="更新时间" align="center"></el-table-column>
      <el-table-column label="操作" width="260px" align="center"></el-table-column>
    </el-table>
    <!--分页器-->
    <el-pagination
    v-model:current-page="pageNO"
    v-model:page-size="pageSize"
    :page-sizes="[5, 10, 15, 20 ]"
    :small="small"
    :disabled="disabled"
    :background="true"
    layout=" prev, pager, next, jumper,->, sizes,total"
    :total="400"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
  </el-card>
</template>

<script setup lang="ts">
import {ref} from 'vue'
//默认页码
let pageNO=ref<number>(1)
//一页展示多少条数据
let pageSize=ref<number>(5)
</script>

<style scoped>
.form{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
