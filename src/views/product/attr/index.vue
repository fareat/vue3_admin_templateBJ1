<template>
  <div>
    <Category :scene="scene"></Category>
  </div>
  <el-card style="margin: 10px 0px">
    <!--展示的具体内容-->
    <div v-show="scene == 0">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="categoryStore.c3Id ? false : true"
        @click="addAttr"
      >
        添加属性
      </el-button>
      <el-table border style="margin: 10px 0px" :data="attrArr">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="属性名称"
          width="120px"
          prop="attrName"
        ></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{ row, $index }">
            <el-tag
              style="margin: 5px"
              v-for="(item, index) in row.attrValueList"
              :key="item.id"
            >
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <!--已有的属性对象-->
          <template #="{ row, $index }">
            <!--修改已有属性的按钮-->
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateAttr(row)"
            ></el-button>

            <el-popconfirm
              witdh="200px"
              :title="`确定要删除${row.attrName}吗?`"
              @confirm="deleteAttr(row.id)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  size="small"
                  icon="Delete"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--添加与修改的页面-->
    <div v-show="scene == 1">
      <el-form :inline="true">
        <el-form-item label="属性名称">
          <el-input
            type=""
            placeholder="请你输入属性的名称"
            v-model="attrParams.attrName"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        @click="addAttrValue"
        :disabled="attrParams.attrName ? false : true"
        type="primary"
        size="default"
        icon="Plus"
      >
        添加属性值
      </el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
      <el-table
        border
        style="margin: 10px 0px"
        :data="attrParams.attrValueList"
      >
        <el-table-column
          label="序号"
          width="80px"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column label="属性值的名称">
          <!--row:为当前的属性值对象-->
          <template #="{ row, $index }">
            <el-input
              v-if="row.flag"
              @blur="toLook(row, $index)"
              size="small"
              placeholder="请输入属性值名称"
              v-model="row.valueName"
              :ref="(vc: any) => (inputArr[$index] = vc)"
            ></el-input>
            <div v-else @click="Edit(row, $index)">{{ row.valueName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="属性值操作">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="Delete"
              @click="attrParams.attrValueList.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        size="default"
        @click="sava"
        :disabled="attrParams.attrValueList.length > 0 ? false : true"
      >
        保存
      </el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
//获取分类的数据
import useCategoryStore from '@/store/modules/category'
//获取组合式api函数watch
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
//引入获取已有属性与属性值接口
import {
  reqAttr,
  reqAddOrUpadteAttr,
  reqRemoveAttr,
} from '@/api/product/attr/index'
//返回的数据类型
import type {
  AttrResponseData,
  Attr,
  AttrValue,
} from '@/api/product/attr/index'
//存储已有的属性与属性值
let attrArr = ref<Attr[]>([])
//收集新增的属性数据
let attrParams = reactive({
  attrName: '', //新增的属性值名字
  attrValueList: [], //新增的属性值数组
  categoryId: '', //三级分类的ID
  categoryLevel: 3, //代表三级分类
})
//接口实例化
let categoryStore = useCategoryStore()
//准备一个数组，用来存储自动对焦的数据
let inputArr = ref<any>([])
//定义card组件内容切换变量
//如果scene=0，显示table，如果等于1，则展示展示添加与修改属性结构
let scene = ref<number>(0)
//监听仓库三级分类ID变化
watch(
  () => categoryStore.c3Id,
  () => {
    //当三级id变化时候，清空显示
    attrArr.value = []
    //当有了第三级的id之后才请求
    if (!categoryStore.c3Id) return
    getAttr()
  },
)

//封装接口-----》查看
const getAttr = async () => {
  //解构
  const { c1Id, c2Id, c3Id } = categoryStore
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  console.log(c1Id, c2Id, c3Id)
  console.log(result)
  if (result.code == 200) {
    attrArr.value = result.data
  }
  console.log(attrArr.value)
}
//添加属性按钮回调
const addAttr = () => {
  scene.value = 1
  Object.assign(attrParams, {
    attrName: '', //新增的属性值名字
    attrValueList: [], //新增的属性值数组
    categoryId: categoryStore.c3Id, //三级分类的ID,手机三级属性的id,解构出来的id，赋值
    categoryLevel: 3, //代表三级分类
  })
}
//修改按钮回调
const updateAttr = (row: Attr) => {
  scene.value = 1
  //将已有的属性对象赋值给attrParams对象即为
  //可以用ES6->Object.assign进行对象的合并
  //作用为第二个值得对象，赋值给第一个-------->一下为浅拷贝，当被赋予值的，数值改变，赋值的也会改变
  //Object.assign(attrParams,row)
  //深拷贝----------->两个互不影响
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}
//取消按钮回调
const cancel = () => {
  scene.value = 0
}
//添加属性值按钮回调
const addAttrValue = () => {
  //点击按钮的时候想数组添加一个数值对象
  attrParams.attrValueList.push({
    valueName: '',
    flag: true, //控制每一个属性值的编辑模式和查看模式的切换
  })
  //添加后自动获取焦点
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}
//保存按钮回调
const sava = async () => {
  //手机参数
  //发送请求
  let result: any = await reqAddOrUpadteAttr(attrParams)
  console.log(result)
  if (result.code == 200) {
    scene.value = 0
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}

const toLook = (row: AttrValue, $index: number) => {
  // 属性值非空判断
  if (row.valueName.trim() == '') {
    // 值为空的话, 删除对应属性值的元素
    attrParams.attrValueList.splice($index, 1)
    // 错误信息提示框
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }
  // 非法情况2(失去焦点前判断是否有重复属性值), 把当前属性值对象从数组中取出来进行判断
  const repeat = attrParams.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  // 若有重复的属性值就直接return出去, 并移除重复属性值/弹出错误提示框
  if (repeat) {
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }

  row.flag = false
}
const Edit = (row: AttrValue, $index: number) => {
  row.flag = true
  //响应式数据发生变化，获取更新后的DOM（组件实例）
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}

//删除某一属性方法的回调
const deleteAttr = async (arrtId: number) => {
  let rouste = await reqRemoveAttr(arrtId)
  if (rouste.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    //重新获取一下查看接口
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
//组件销毁的时候清掉仓库数据
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<style scoped></style>
