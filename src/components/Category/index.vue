<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <!--调用仓库，比较好管理数据的传输-->
        <el-select v-model="categoryStore.c1Id">
          <el-option
            v-for="(c1, index) in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select>
          <el-option label="北京"></el-option>
          <el-option label="北京1"></el-option>
          <el-option label="北京2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select>
          <el-option label="北京"></el-option>
          <el-option label="北京1"></el-option>
          <el-option label="北京2"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
//引入组件挂载完毕的生命周期钩子
import { onMounted } from 'vue'
//引入分类相关的仓库
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()
//当组件挂载完毕的时候，通知仓库发送请求获取一级分类的数据
onMounted(() => {
  getC1()
})
//通知仓库获取一级分类的方法
const getC1 = () => {
  categoryStore.getC1()
}
</script>

<style scoped></style>
