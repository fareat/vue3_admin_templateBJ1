<template>
  <div>
    <!--三级分类，放入已经封装好的组件-->
    <Category :scene="scene"></Category>
    <!--下方卡片的数据-->
    <el-card style="margin: 10px 0px">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="CategoryStore.c3Id ? false : true"
      >
        添加SPU
      </el-button>
      <el-table style="margin: 10px 0px" border :data="records">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column label="SPU名称" prop="spuName"></el-table-column>
        <el-table-column
          label="SPU描述"
          prop="description"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="SPU操作">
          <!--
            row:被接口赋值的records数组的数据
          -->
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="Plus"
              title="添加SPU"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              title="修改SPU"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              icon="View"
              title="查看SPU"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              icon="Delete"
              title="删除SPU"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页器-->
      <!--v-model:current-page:分页器的起始页-->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout=" prev, pager, next, jumper ,->,sizes,total"
        :total="total"
        @current-change="getHaSpu"
        @size-change="changeSize"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
//引入分类的仓库
import useCategoryStore from '@/store/modules/category'
//接口请求引入
import { reqHasSpu } from '@/api/product/spu/index'
//引入返回数据的类型
import type { HasSpuResponseData, Records } from '@/api/product/spu/type'

let CategoryStore = useCategoryStore()

import { ref, watch } from 'vue'
let scene = ref<number>(0)
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
//存储接口的数据
let records = ref<Records>([])
//存储已有的SPU总数
let total = ref<number>(0)
watch(
  () => CategoryStore.c3Id,
  () => {
    if (!CategoryStore.c3Id) {
      return
    }
    getHaSpu()
  },
)

const getHaSpu = async (pager = 1) => {
  pageNo.value = pager
  let result: HasSpuResponseData = await reqHasSpu(
    pageNo.value,
    pageSize.value,
    CategoryStore.c3Id,
  )

  if ((result.code = 200)) {
    records.value = result.data.records
    total.value = result.data.total
  }
}
//当分页器的下拉菜单发生变化的时候触发
const changeSize = () => {
  getHaSpu()
}
</script>

<style scoped></style>
