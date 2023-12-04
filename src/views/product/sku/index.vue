<template>
  <el-card>
    <el-table border style="margin: 10px 0px" :data="skuArr">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80px"
      ></el-table-column>
      <el-table-column
        label="名称"
        show-overflow-tooltip
        width="150px"
        prop="skuName"
      ></el-table-column>
      <el-table-column
        label="描述"
        show-overflow-tooltip
        width="150px"
        prop="skuDesc"
      ></el-table-column>
      <el-table-column label="图片" width="150px">
        <template #="{ row, $index }">
          <img :src="row.skuDefaultImg" style="height: 100px; width: 100px" />
        </template>
      </el-table-column>
      <el-table-column
        label="重量"
        width="150px"
        prop="weight"
      ></el-table-column>
      <el-table-column
        label="价格"
        width="150px"
        prop="price"
      ></el-table-column>
      <el-table-column label="操作" width="250px" fixed="right">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            :icon="row.isSale == 1 ? 'Bottom' : 'Top'"
            @click="updateSale(row)"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateSku"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            icon="infoFilled"
            @click="findSku(row)"
          ></el-button>
          <el-popconfirm
            :title="`你确定要删除${row.skuName}吗？`"
            @confirm="removeSku(row)"
            width="200px"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--分页器组件-->
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
    <!--抽屉组件-->
    <el-drawer v-model="drawer" :direction="direction">
      <!--标题部分-->
      <template #header>
        <h4>查看商品详情</h4>
      </template>
      <template #default>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="item in skuInfo.skuAttrValueList"
              :key="item.id"
              style="margin: 5px"
            >
              {{ item.valueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="item in skuInfo.skuSaleAttrValueList"
              :key="item.id"
              style="margin: 5px"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item
                v-for="(item, index) in skuInfo.skuImageList"
                :key="item.id"
              >
                <img :src="item.imgUrl" style="width: 100%; height: 100%" />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref, onMounted } from 'vue'
import type { SkuResponseData, SkuData } from '@/api/product/sku/type'
//引入请求接口
import {
  reqSKuList,
  reqCancelSale,
  reqSaleSku,
  reqSkuInfo,
  reqRemoveSku,
} from '@/api/product/sku/index'
import { SkuInfoData } from '@/api/product/spu/type'
//分页器当前页码
let pageNo = ref<number>(1)
//每页展示几条数据
let pageSize = ref<number>(10)
let total = ref<number>(0)
let skuArr = ref<SkuData[]>([])
//控制抽屉显示与隐藏的字段
let drawer = ref<boolean>(false)
//传出抽屉展示框数据
let skuInfo = ref<any>({})

onMounted(() => {
  getHasSku()
})

//当分页器调用这个回调的时候，页码发生变化,可以注入当前的页码
//获取当前的信息
const getHasSku = async (pager = 1) => {
  //当前分页器的页码
  pageNo.value = pager
  let result: SkuResponseData = await reqSKuList(pageNo.value, pageSize.value)
  if (result.code == 200) {
    total.value = result.data.total
    skuArr.value = result.data.records
  }
}
//分页器一页显示多少个时触发,自动注入当前的显示页数
const handler = (pageSize: number) => {
  getHasSku()
}

//商品的上架与下架的操作
const updateSale = async (row: SkuData) => {
  //如果当前商品的isSale==1，说明当前商品是上架的状态-》更新为下架
  //否则更改为上架
  if (row.isSale == 1) {
    let reque = await reqCancelSale(row.id as number)
    if (reque.code == 200) {
      ElMessage({
        type: 'success',
        message: '商品下架成功',
      })
      //再次发送请求刷新页面
      getHasSku(pageNo.value)

      console.log(reque)
    } else {
      ElMessage({
        type: 'error',
        message: '商品下架失败',
      })
    }
  } else {
    let reques = await reqSaleSku(row.id as number)
    if (reques.code == 200) {
      ElMessage({
        type: 'success',
        message: '商品上架成功',
      })
      //再次发送请求刷新页面
      getHasSku(pageNo.value)
    } else {
      ElMessage({
        type: 'error',
        message: '商品上架失败',
      })
    }
  }
}

//更新已有的SKU
const updateSku = () => {
  ElMessage({
    type: 'success',
    message: '正在研发中………',
  })
}

//抽屉的回调
const findSku = async (row: SkuData) => {
  //抽屉的显示
  drawer.value = true
  //获取已有的商品详情数据
  let result: SkuInfoData = await reqSkuInfo(row.id as number)
  console.log(result)

  //存储sku数据
  skuInfo.value = result.data
  //console.log(skuInfo.value.skuImageList[0].imgUrl);
}

//删除按钮的回调
const removeSku = async (row) => {
  let reuslt = await reqRemoveSku(row.id)
  if (reuslt.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasSku(skuArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
