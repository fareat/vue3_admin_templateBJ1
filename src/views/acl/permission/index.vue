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
    <el-table-column label="操作" sortable>
      <!--
      row:为一条数据的全部内容
    -->
      <template #="{ row, $index }">
        <el-button
          @click="addPermisstion(row)"
          type="primary"
          size="small"
          :disabled="row.level == 4 ? true : false"
        >
          {{ row.level == 3 ? '添加功能' : '添加菜单' }}
        </el-button>
        <el-button
          @click="updatePermisstion(row)"
          type="primary"
          size="small"
          :disabled="row.level == 1 ? true : false"
        >
          编辑
        </el-button>
        <el-popconfirm
          :title="`确定要删除${row.name}吗？`"
          @confirm="confirm(row)"
          width="260px"
        >
          <template #reference>
            <el-button
              type="primary"
              size="small"
              :disabled="row.level == 1 ? true : false"
            >
              删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <!--对话框组件：添加或者是更新已有的菜单数据-->
  <el-dialog
    v-model="dialogVisible"
    :title="menuData.id ? '更新菜单' : '添加菜单'"
    width="30%"
    :before-close="handleClose"
  >
    <!--表单组件：收集新增与已有的菜单的数据-->
    <el-form>
      <el-form-item label="名称">
        <el-input
          placeholder="请输入菜单的名称"
          v-model="menuData.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-input
          placeholder="请输入权限的数据"
          v-model="menuData.code"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref, onMounted, reactive } from 'vue'
//引入获取菜单请求API
import {
  reqAllPermisstion,
  reqAddOrUpadteMenu,
  reqRemoveMenu,
} from '@/api/acl/menu/index'
//引入TS类型
import type {
  MenuParams,
  PermisstionResponseData,
  PermisstionList,
  Permisstion,
} from '@/api/acl/menu/type'
//存储菜单数据
let PermisstionArr = ref<PermisstionList>([])
//控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)
//更新或者添加需要携带的数据
let menuData = reactive<MenuParams>({
  code: '', //权限的数值
  level: 0, //几级菜单
  name: '', //菜单的名字
  pid: 0, //菜单的ID
})

//组件挂载完毕
onMounted(() => {
  getHasPermisstion()
})
//获取菜单数据的方法
const getHasPermisstion = async () => {
  let result: PermisstionResponseData = await reqAllPermisstion()
  if (result.code == 200) {
    PermisstionArr.value = result.data
  }
}
//添加菜单的按钮回调
const addPermisstion = (row: Permisstion) => {
  //清空数组
  Object.assign(menuData, {
    id: 0,
    code: '', //权限的数值
    level: 0, //几级菜单
    name: '', //菜单的名字
    pid: 0, //菜单的ID
  })
  //对话框显示出来
  dialogVisible.value = true
  console.log(row)
  //收集按钮对应行的数据
  menuData.level = row.level + 1
  menuData.pid = row.id
}
//编辑按钮的回调
const updatePermisstion = (row: Permisstion) => {
  //对话框显示出来
  dialogVisible.value = true
  console.log(row)
  //收集按钮对应行的数据,与当前的数据合并
  Object.assign(menuData, row)
}
//确定按钮的回调
const save = async () => {
  let result: any = await reqAddOrUpadteMenu(menuData)
  console.log(result)

  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: menuData.id ? '更新成功' : '添加成功',
    })
  } else {
    ElMessage({
      type: 'error',
      message: menuData.id ? '更新失败' : '添加失败',
    })
  }
  //隐藏对话框
  dialogVisible.value = false
  //重新获取
  getHasPermisstion()
}
//气泡的确认按钮的回调
const confirm = async (row: any) => {
  let result: any = await reqRemoveMenu(row.id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
  }
  getHasPermisstion()
}
</script>

<style scoped></style>
