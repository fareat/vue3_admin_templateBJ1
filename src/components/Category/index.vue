<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <!--调用仓库，比较好管理数据的传输-->
        <el-select
          :disabled="scene == 0 ? false : true"
          v-model="categoryStore.c1Id"
          @change="handler"
        >
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          :disabled="scene == 0 ? false : true"
          v-model="categoryStore.c2Id"
          @change="handler1"
        >
          <el-option
            v-for="c2 in categoryStore.c2Arr"
            :key="c2.id "
            :label="c2.name"
            :value="c2.id "
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          :disabled="scene == 0 ? false : true"
          v-model="categoryStore.c3Id"
        >
          <el-option
            v-for="(c3) in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
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
//当一级菜单选中值的时候触发
const handler = () => {
  categoryStore.getC2()
  categoryStore.c2Id = ''
  categoryStore.c3Id = ''
  categoryStore.c3Arr = []
}
const handler1 = () => {
  categoryStore.getC3()
  categoryStore.c3Id = ""
}
//接收父级传输过来的scene
defineProps(['scene'])
</script>

<style scoped></style>
