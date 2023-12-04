<template>
  <el-card style="height: 75px">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名:">
        <el-input placeholder="请输入搜索用户名" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="default"
          :disabled="keyword ? false : true"
          @click="search"
        >
          搜索
        </el-button>
        <el-button type="primary" size="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0px">
    <el-button type="primary" size="default" @click="addUser">
      添加用户
    </el-button>
    <el-button
      type="primary"
      size="default"
      :disabled="selectIdArr.length ? false : true"
      @click="deleteSelectUser"
    >
      批量删除
    </el-button>
    <!--table展示用户信息-->
    <el-table
      @selection-change="selectChange"
      style="margin: 20px 0px"
      border
      :data="userArr"
    >
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column
        label="#"
        align="center"
        type="index"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="ID"
        align="center"
        prop="id"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="用户名字"
        align="center"
        prop="username"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="用户名称"
        align="center"
        prop="name"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="用户角色"
        align="center"
        prop="roleName"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            icon="User"
            @click="setRole(row)"
          >
            分配角色
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateUser(row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`确定要删除${row.username}吗？`"
            width="260px"
            @confirm="deleteuser(row.id)"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--分页器-->
    <el-pagination
      v-model:current-page="pageNO"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15, 20]"
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
  <el-drawer v-model="drawer">
    <!--这是头部的标题，内容应该是可变的-->
    <template #header>
      <h4>{{ userParams.id ? '更新用户' : '添加用户' }}</h4>
    </template>
    <!--这是身体部分-->
    <template #default>
      <el-form
        label-width="90px"
        :model="userParams"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="用户姓名" prop="username">
          <el-input
            placeholder="请输入用户名"
            v-model="userParams.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input
            placeholder="请输入昵称"
            v-model="userParams.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!userParams.id">
          <el-input
            placeholder="请输入密码"
            v-model="userParams.password"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </template>
  </el-drawer>
  <!--抽屉结构：用于角色的职位分配-->
  <el-drawer v-model="drawer1">
    <template #header>
      <h4>分配角色</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用户的姓名">
          <el-input v-model="userParams.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="职位列表">
          <!--全选框-->
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >
            全选
          </el-checkbox>
          <!--显示职位的复选框-->
          <el-checkbox-group
            v-model="userRole"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="(role, index) in allRole"
              :key="index"
              :label="role"
            >
              {{ role.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer1 = false">取消</el-button>
        <el-button type="primary" @click="confirmClick">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
//引入仓库用于重置按钮功能的实现---------》等价于刷新
import useLayOutSettingStore from '@/store/modules/setting'
import { ElMessage } from 'element-plus'
import { ref, onMounted, reactive, nextTick } from 'vue'
//接口
import {
  reqSelectUser,
  reqRemoveUser,
  reqUserInfo,
  reqAddOrUpdateUser,
  reqAllRole,
  reqSetUserRole,
} from '@/api/acl/user/index'
import type {
  SetRoleData,
  UserResponseData,
  Records,
  User,
  AllRoleResponseData,
  AllRole,
} from '@/api/acl/user/type'
//默认页码
let pageNO = ref<number>(1)
//一页展示多少条数据
let pageSize = ref<number>(5)
//数据的总数量
let total = ref<number>(0)
//存储全部用户的数组
let userArr = ref<Records>([])
//控制响应式数据，控制抽屉的显示和隐藏
let drawer = ref<boolean>(false)
//手机新增用户的数据
let userParams = reactive<User>({
  username: '',
  name: '',
  password: '',
})
//获取formRef
let formRef = ref<any>()
//角色分配的抽屉显示与否
let drawer1 = ref<boolean>(false)
//准备一个数组来存储批量删除用户的ID
let selectIdArr = ref<User[]>([])
//定义响应式数组
let keyword = ref<string>('')

//全选复选框
const checkAll = ref<boolean>(false)
const isIndeterminate = ref<boolean>(true)
//职位
let allRole = ref<AllRole>([])
//
let userRole = ref<AllRole>([])
//获取仓库对象
let settingStore = useLayOutSettingStore()

//全选框的change事件,点击触发
const handleCheckAllChange = (val: boolean) => {
  userRole.value = val ? allRole.value : []
  isIndeterminate.value = false
}
//底部复选框的change事件,点击触发
const handleCheckedCitiesChange = (value: string[]) => {
  //已经勾选的项目的长度
  const checkedCount = value.length
  //是否勾选样式， 当勾选的长度===全部职位的长度，赋值true，否则false
  checkAll.value = checkedCount === allRole.value.length
  //不确定的样式
  isIndeterminate.value = !(checkedCount === allRole.value.length)
}

//获取展示的数据，一般分页器换页的时候下面的写法可以直接调用
const getHasUser = async (pager = 1) => {
  pageNO.value = pager
  let reqult: UserResponseData = await reqUserInfo(
    pageNO.value,
    pageSize.value,
    keyword.value,
  )
  console.log(reqult)
  if (reqult.code == 200) {
    total.value = reqult.data.total
    userArr.value = reqult.data.records
    console.log(total.value)
  }
}

//渲染结束时候，获取请求数据
onMounted(() => {
  getHasUser()
})

//分页器下拉菜单的自定义事件的回调
const handle = () => {
  getHasUser()
}
//添加用户按钮牛的回调
const addUser = () => {
  //显示抽屉
  drawer.value = true
  //清空数组
  Object.assign(userParams, {
    id: '',
    username: '',
    name: '',
    password: '',
  })
  //清除提示信息
  nextTick(() => {
    formRef.value.clearValidate('password')
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
  })
}
//修改用户信息的回调
//row，为已有用户的账号信息
const updateUser = (row: User) => {
  drawer.value = true
  //存储手机已有的账号信息------>展示出已有的信息
  Object.assign(userParams, row)
  //清除提示信息
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
  })
}

//保存按钮的回调
const save = async () => {
  //点击保存按钮的时候，务必让全部条件都符合了才能发送请求
  await formRef.value.validate()
  let result: any = await reqAddOrUpdateUser(userParams)
  console.log(result)
  if (result.code == 200) {
    //关闭抽屉
    drawer.value = false
    ElMessage({
      type: 'success',
      message: userParams.id ? '更新成功' : '添加成功',
    })
    //获取用户信息
    getHasUser(userParams.id ? pageNO.value : 1)
    //浏览器自动刷新一次
    window.location.reload()
  } else {
    //关闭抽屉
    drawer.value = false
    ElMessage({
      type: 'error',
      message: userParams.id ? '更新失败' : '添加失败',
    })
  }
}

//取消按钮的回调
const cancel = () => {
  //关闭抽屉
  drawer.value = false
}
//效验用户名字的回调函数
const validatorUsername = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('名字长度至少五位'))
  }
}
//效验昵称的回调函数
const validatorname = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('昵称长度至少五位'))
  }
}
//效验密码的回调函数
const validatorPassword = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 6) {
    callBack()
  } else {
    callBack(new Error('密码长度至少六位'))
  }
}

//表单效验的规则对象
const rules = {
  //用户名字
  username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
  //用户昵称
  name: [{ required: true, trigger: 'blur', validator: validatorname }],
  //用户密码
  password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
}

//分配角色按钮的回调
const setRole = async (row: User) => {
  //存储已有的用户信息
  Object.assign(userParams, row)
  //获取所有职位的数据，和反潜用户已有的职位的数据
  let result: AllRoleResponseData = await reqAllRole(userParams.id as number)
  if (result.code == 200) {
    //存储全部的职位
    allRole.value = result.data.allRolesList
    //存储当前用户已有的职位
    userRole.value = result.data.assignRoles
    //显示抽屉
    drawer1.value = true
  }
}

//确定按钮的回调（分配职务）
const confirmClick = async () => {
  //收集参数
  let data: SetRoleData = {
    userId: userParams.id,
    roleIdList: userRole.value.map((item) => {
      return item.id
    }),
  }
  console.log(data)

  //接口请求
  let result: any = await reqSetUserRole(data)
  console.log(result)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '职位更改成功',
    })
    //关闭抽屉
    drawer1.value = false
    //获取更新完毕用户的信息,更新完毕留在当前页面pageNO.value
    getHasUser(pageNO.value)
  } else {
    ElMessage({
      type: 'error',
      message: '职位更改失败',
    })
  }
}

//删除按钮的回调
const deleteuser = async (userId: number) => {
  let result: any = await reqRemoveUser(userId)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasUser(userArr.value.length > 1 ? pageNO.value : pageNO.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

//复选框勾选的时候会触发的事件,
//会自动注入用户的数据
//专门用来存储数据
const selectChange = (value: any) => {
  selectIdArr.value = value
}

//批量删除按钮的回调
const deleteSelectUser = async () => {
  let idsList: any = (selectIdArr.value = selectIdArr.value.map((item) => {
    return item.id
  }))
  console.log(idsList)
  //批量删除的请求
  let result: any = await reqSelectUser(idsList)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '批量删除成功',
    })
    getHasUser(userArr.value.length > 1 ? pageNO.value : pageNO.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '批量删除失败',
    })
  }
}

//搜索按钮的回调
const search = () => {
  //根据关键字获取数据
  getHasUser()
  //清空搜索数据
  keyword.value = ''
}

//重置按钮的回调
const reset = () => {
  settingStore.refsh = !settingStore.refsh
}
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
