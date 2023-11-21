<template>
  <el-card>
    <el-form :inline="true" class="form">
      <el-form-item label='职位搜索'>
        <el-input placeholder="请输入搜索的关键字" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <!--:disabled:为是否禁用-->
        <el-button type="primary" size="default" :disabled="keyword?false:true" @click="searc">搜索</el-button>
        <el-button type="primary" size="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0px;">
    <el-button type="primary" size="default" icon="Plus" @click="addRole">添加职位</el-button>
    <el-table border style="margin: 10px 0px;" :data="allRole">
      <el-table-column type="index" align="center" label="#"></el-table-column>
      <el-table-column  align="center" label="id" prop="id"></el-table-column>
      <el-table-column  align="center" label="职位名称" prop="roleName" show-overflow-tooltip></el-table-column>
      <el-table-column  align="center" label="创建时间" prop="createTime" show-overflow-tooltip></el-table-column>
      <el-table-column  align="center" label="更新时间" prop="updateTime" show-overflow-tooltip></el-table-column>
      <el-table-column  label="操作" width="280px" >
        <!--
          row:代表的是一个已有的对象
        -->
        <template #="{row,$index}">
          <el-button type="primary" size="small" icon="User" @click="setPermisstiom(row)">分配权限</el-button>
          <el-button type="primary" size="small" icon="Edit" @click="updateRole(row)">编辑</el-button>
          <el-button type="primary" size="small" icon="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
    v-model:current-page="pageNo"
    v-model:page-size="pageSize"
    :page-sizes="[ 10, 20, 30,40]"
    :small="small"
    :disabled="disabled"
    :background="true"
    layout=" prev, pager, next, jumper,->, sizes,total"
    :total="total"
    @size-change="sizeChange"
    @current-change="getHasRole"
  />
  </el-card>
  <!--添加职位|更新职位的对话框-->
  <el-dialog v-model="dialogVisite" :title="RoleParams.id?'更新职位':'添加职位'" >
    <el-form :model="RoleParams" :rules="rules" ref="form">
      <el-form-item label="职位名称" prop="roleName">
        <el-input placeholder="请输入职位名称" v-model="RoleParams.roleName"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" size="default" @click="dialogVisite=false">取消</el-button>
      <el-button type="primary" size="default" @click="save">确定</el-button>
    </template>
  </el-dialog>
  <!--分配去权限，分配用户的菜单权限与按钮的权限-->
  <el-drawer v-model="drawer" >
    <template #header>
      <h4>分配按钮与菜单的权限</h4>
    </template>
    <template #default>
      <!--树形控件-->
      <!--
      :data="data"    展示的数据
      show-checkbox   是否有复选框
      node-key="id"   每个树节点用来作为唯一标识的属性
      :default-expanded-keys="[2, 3]"   默认展开的ID
      default-expand-all    默认全部展开
      :default-checked-keys="[5]"   默认勾选的节点
      :props="defaultProps"   展示的字段
      -->
      <el-tree
      :data="menuArr"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="[5]"
      :props="defaultProps"
    />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button  @click="drawer=false">取消</el-button>
        <el-button type="primary" >保存</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import {ref,onMounted,reactive,nextTick} from 'vue'
//接口
import {reqAllRoleList,reqAddOrUpdateRole,reqAllMenuList} from '@/api/acl/role/index'
//接口返回类型
import type {RoleResponseData,Records,MenuResponseData,MenuList} from '@/api/acl/role/type'
//引入骨架仓库
import useLayOutSettingStore from '@/store/modules/setting';
import { RoleData } from '@/api/acl/user/type';
//收集新增岗位的数组
let RoleParams=reactive<RoleData>({
  roleName:''
})
//仓库实例化
let settingStore=useLayOutSettingStore()
//当前页码
let pageNo=ref<number>(1)
//一页展示几条数据
let pageSize=ref<number>(10)
//搜索职位的关键字
let keyword=ref<string>('')
//存储职位数据
let allRole=ref<Records>([])
//职位的总数
let total=ref<number>(0)
//控制对话框的显示与隐藏
let dialogVisite=ref<boolean>(false)
//获取主键form组件的实例
let form=ref<any>()
//控制权限分配抽屉的显示与隐藏
let drawer=ref<boolean>(false)
//定义一个数组存储用户权限的数据
let menuArr=ref<MenuList>([])

//组建挂载完毕后加载数据
onMounted(() => {
  getHasRole()
})
//获取数据的方法|当前分页器页码更替的方法（会自动注入页码）
const getHasRole=async(pager=1)=>{
  //修改当前页码
  pageNo.value=pager
  let result:RoleResponseData= await reqAllRoleList(pageNo.value,pageSize.value,keyword.value)
  console.log(result);
  if (result.code==200) {
    total.value=result.data.total
    allRole.value=result.data.records
    console.log(allRole.value);
    
  }
}
//分页器下拉菜单的回调,一页展示的数量（会自动注入一页展示的数量）
const sizeChange=()=>{
  getHasRole()
}
//搜索功能
const searc=()=>{
  //再次发送请求
  getHasRole()
  keyword.value=''
}
//重置按钮回调
const reset=()=>{
  settingStore.refsh=!settingStore.refsh
}
//添加职位按钮的回调
const addRole=()=>{
   //对话框展示
   dialogVisite.value=true
   //清空输入框的数组
   Object.assign(RoleParams,{
    roleName:'',
    id:0
   })
   //清空上一次的表单效验结果
   nextTick(()=>{
    form.value.clearValidate('roleName')
   })
}
//更改职位的回调
const updateRole=(row:RoleData)=>{
     //对话框展示
     dialogVisite.value=true
     //存储已有的职位-------带有ID的
     //RoleParams与row合并
     Object.assign(RoleParams,row)
        //清空上一次的表单效验结果
   nextTick(()=>{
    form.value.clearValidate('roleName')
   })
}
//自定义效验规则的回调，要放在定义的上面---》上面
const validatorRoleName=(rule:any,value:any,callBack:any)=>{
  if(value.trim().length>=2){
    //效验通过
    callBack()
  }else{
    callBack(new Error('职位名称至少两位'))
  }
}
//效验规则
const rules={
  roleName:[
    {required:true , trigger:'blur',validator:validatorRoleName}
  ]
}
//确定按钮的回调
const save=async()=>{
  //判断表单效验是否通过,不通过不往下执行
  await form.value.validate()
  //请求接口,添加职位|更新职位
  let result:any= await reqAddOrUpdateRole(RoleParams)
  if (result.code==200) {
    ElMessage({
      type:'success',
      message:RoleParams.id?'更新成功':'添加成功'
    })
    //对话框关闭
    dialogVisite.value=false
    //获取全部的数据
    getHasRole(RoleParams.id?pageNo.value:1)
  }
}
//分配权限按钮的回调,
//row：已有的职位数据
const setPermisstiom=async(row:RoleData)=>{
  drawer.value=true
  //收集当前要分类权限的职位的数据
  Object.assign(RoleParams,row)
  let result:MenuResponseData= await reqAllMenuList(RoleParams.id)
  if (result.code==200) {
    menuArr.value=result.data
  }
  
}

const defaultProps = {
  children: 'children',
  label: 'name',
}

</script>

<style scoped>
.form{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}
</style>
