<template>
  <el-card>
    <el-table border style="margin:10px 0px" :data="skuArr">
      <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
      <el-table-column label="名称" show-overflow-tooltip  width="150px" prop="skuName"></el-table-column>
      <el-table-column label="描述" show-overflow-tooltip  width="150px" prop="skuDesc"></el-table-column>
      <el-table-column label="图片"   width="150px">
        <template #="{row,$index}">
          <img :src="row.skuDefaultImg" style="height: 100px; width:100px;" >
        </template>
      </el-table-column>
      <el-table-column label="重量"   width="150px" prop="weight"></el-table-column>
      <el-table-column label="价格"   width="150px" prop="price"></el-table-column>
      <el-table-column label="操作"   width="250px" fixed="right">
        <template #="{row,$index}">
          <el-button type="primary" size="small" icon="Top"></el-button>
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="primary" size="small" icon="infoFilled"></el-button>
          <el-button type="primary" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      background="true"
      :page-sizes="[10, 20, 30, 40]"
      layout=" prev, pager, next, jumper ,->, sizes,total"
      :total="total"
      @size-change="handler"
      @current-change="getHasSku"
    />

  </el-card>
</template>

<script setup lang="ts">
import {ref,onMounted} from 'vue'
import type {SkuResponseData ,SkuData} from '@/api/product/sku/type'
//引入请求接口
import { reqSKuList } from '@/api/product/sku/index';
//分页器当前页码
let pageNo=ref<number>(1)
//每页展示几条数据
let pageSize=ref<number>(10)
let total=ref<number>(0)
let skuArr=ref<SkuData[]>([])

onMounted(()=>{
  getHasSku();
})

//当分页器调用这个回调的时候，页码发生变化,可以注入当前的页码
const getHasSku=async(pager=1)=>{
  //当前分页器的页码
  pageNo.value=pager
  let result:SkuResponseData= await reqSKuList(pageNo.value,pageSize.value)
  if (result.code==200) {
    total.value=result.data.total
    skuArr.value=result.data.records
  }
}
//分页器一页显示多少个时触发,自动注入当前的显示页数
const handler=(pageSize:number)=>{
  getHasSku();
  
}

</script>

<style scoped></style>
