<template>
  <div>
    <Category></Category>
  </div>
  <el-card style="margin: 10px 0px">
    <el-button
      type="primary"
      size="default"
      icon="Plus"
      :disabled="categoryStore.c3Id ? false : true"
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
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="primary" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
//获取分类的数据
import useCategoryStore from '@/store/modules/category'
//获取组合式api函数watch
import { watch, ref } from 'vue'
//引入获取已有属性与属性值接口
import { reqAttr } from '@/api/product/attr/index'
//返回的数据类型
import type { AttrResponseData, Attr } from '@/api/product/attr/index'
//存储已有的属性与属性值
let attrArr = ref<Attr[]>([])

let categoryStore = useCategoryStore()

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

//封装接口
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
</script>

<style scoped></style>
