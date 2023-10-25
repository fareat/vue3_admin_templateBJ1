<template>

    <el-card class="box-card">
      <!--卡片顶部的添加按钮-->
      <el-button type="primary" size="default" icon="Plus" @click="">添加品牌</el-button>
      <!--表格组件，用于展示已经有的数据-->
      <!--
        table
          --border:可以设置表格纵向是否有边缘
        table-column
          --lable：某一列
          --width：设置这一列的宽度
          --align：设置这一列对其方式
      -->
      <el-table style="margin:10px 0px" border :data="trademarkArr">
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <!--table-column:默认展示数据用div-->
        <el-table-column label="品牌名称" >
          <!--插槽方法来,row为接口返回中data的全部数据-->
          <template #="{row,$index}">
            <pre style="color: rgb(58, 197, 114);">{{row.tmName}}</pre>
          </template>
        </el-table-column>
        <el-table-column label="品牌logo">
          <template #="{row,$index}">
            <img :src="row.logoUrl" alt="" style="width: 100px;heigh:100px;">
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #="{row,$index}">
            <el-button type="primary" size="small" icon="Edit"></el-button>
            <el-button type="primary" size="small" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页器组件
        v-model:current-page：设置分页器当前的密页码
        v-model:page-size：设置每页展示的条数
        :page-sizes：设置展示数量
        :background：设置分页器按钮的背景颜色
        layout：可以设置分页器六个子组件的，页面布局
      -->

        
        <el-pagination
          @size-change="sizeChange"
          @current-change="getHasTrademark"
          pager-count="5"
          v-model:current-page="pageNo"
          v-model:page-size="limit"
          :page-sizes="[3, 6, 9, 12]"
          :background="true"
          layout=" prev, pager, next, jumper,->,total, sizes"
          :total="total"
        />


    </el-card>

</template>

<script setup lang="ts">
import {ref,onMounted} from 'vue'
import {reqHasTrademark} from '@/api/product/trademark/index'
import type {Records,TradeMarkResponseData} from '@/api/product/trademark/type'
//当前页码
let pageNo=ref<number>(1)
//每页展示多少条数据
let limit=ref<number>(3)
//存储品牌数据总数
let total=ref<number>(0)
//存储已有品牌的数据
let trademarkArr=ref<Records>([])

//获取已有品牌的接口封装为一个函数，在任何情况下获取数据调用函数即可
const getHasTrademark=async (pager=1)=>{
  //为改变下拉菜单数据，重新赋值
  pageNo.value=pager
  let result:TradeMarkResponseData= await reqHasTrademark(pageNo.value,limit.value)
  //当生命周期钩子函数触发请求的时候，进行以下判断
  if(result.code==200){
    //存储已有品牌的总个数
    total.value=result.data.total
    trademarkArr.value=result.data.records
  } 
}
//组件挂载完成钩子---发送一次请求，获取第一页，三个品牌数据
onMounted(() => {
  getHasTrademark()
})
//分页器当前页码发生变化的时候会触发
//对于当前页码发生变化的自定义事件，组件pagination给父组件回传了当前页码
/* const changePageNo=()=>{
  //当页码发生变化的时候再次发请求获取对应已有的品牌数据
  getHasTrademark()
   
} */

//当下拉菜单变化会触发这个方法
//这个自定义事件，分页器组件会将下拉菜单选中的数据返回
const sizeChange=(pagesize)=>{
  //console.log(pagesize);
  //下拉菜单，改变页面展示数据时
  pageNo.value=1
  getHasTrademark()
  
}

</script>

<style scoped></style>
