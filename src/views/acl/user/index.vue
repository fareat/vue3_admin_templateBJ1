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
    <el-button type="primary" size="default" @click="addUser">添加用户</el-button>
    <el-button type="primary" size="default">批量删除</el-button>
    <!--table展示用户信息-->
    <el-table style="margin:20px 0px;" border :data="userArr">
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column label="#" align="center" type="index" show-overflow-tooltip></el-table-column>
      <el-table-column label="ID" align="center" prop="id" show-overflow-tooltip></el-table-column>
      <el-table-column label="用户名字" align="center" prop="username" show-overflow-tooltip></el-table-column>
      <el-table-column label="用户名称" align="center" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="用户角色" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
      <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="300px" align="center" >
        <template #="{row,$index}">
          <el-button type="primary" size="small" icon="User">分类角色</el-button>
          <el-button type="primary" size="small" icon="Edit" @click="updateUser(row)">编辑</el-button>
          <el-button type="primary" size="small" icon="Delete">删除</el-button>
        </template>
      </el-table-column>
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
    :total="total"
    @size-change="handle"
    @current-change="getHasUser"
  />
  </el-card>
  <!--抽屉结构：完成添加新的用户账号|更新账号信息-->
<el-drawer v-model="drawer" >
  <!--这是头部的标题，内容应该是可变的-->
  <template #header>
    <h4>添加用户</h4>
  </template>
  <!--这是身体部分-->
  <template #default>
    <el-form label-width="70px">
      <el-form-item label="用户姓名">
        <el-input placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input placeholder="请输入密码"></el-input>
      </el-form-item>
    </el-form>
  </template>
  <template #footer>
    <div style="flex: auto">
      <el-button >取消</el-button>
      <el-button type="primary" @click="confirmClick">确定</el-button>
    </div>
  </template>
</el-drawer>
</template>

<script setup lang="ts">
import {ref,onMounted} from 'vue'
import { reqUserInfo } from '@/api/acl/user/index';
import { UserResponseData,Records, User } from '@/api/acl/user/type';
//默认页码
let pageNO=ref<number>(1)
//一页展示多少条数据
let pageSize=ref<number>(5)
//数据的总数量
let total=ref<number>(0)
//存储全部用户的数组
let userArr=ref<Records>([])
//控制响应式数据，控制抽屉的显示和隐藏
let drawer=ref<boolean>(false)

//获取展示的数据，一般分页器换页的时候下面的写法可以直接调用
const getHasUser=async(pager=1)=>{
  pageNO.value=pager
  let reqult:UserResponseData= await reqUserInfo(pageNO.value,pageSize.value)
  console.log(reqult);
  if (reqult.code==200) {
    total.value=reqult.data.total
    userArr.value=reqult.data.records
    console.log(total.value);
    
  }
  }

//渲染结束时候，获取请求数据
onMounted(()=>{
  getHasUser()
})

//分页器下拉菜单的自定义事件的回调
const handle=()=>{
  getHasUser()
}
//添加用户按钮牛的回调
const addUser=()=>{
  //显示抽屉
  drawer.value=true
}
//修改用户信息的回调
//row，为已有用户的账号信息
const updateUser=(row:User)=>{
  drawer.value=true
}
</script>

<style scoped>
.form{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
