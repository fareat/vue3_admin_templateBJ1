<template>
  <div>
    <!--三级分类，放入已经封装好的组件-->
    <Category :scene="scene"></Category>
    <!--下方卡片的数据-->
    <el-card style="margin: 10px 0px">
      <!--场景一********v-if和v-show都可以实现显示和隐藏 -->
      <div v-show="scene == 0">
        <el-button
          @click="addSpu"
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
                title="添加SKU"
                @click="addSku(row)"
              ></el-button>
              <el-button
                @click="updateSpu(row)"
                type="primary"
                size="small"
                icon="Edit"
                title="修改SPU"
              ></el-button>
              <el-button
                @click="findSku(row)"
                type="primary"
                size="small"
                icon="View"
                title="查看SPU"
              ></el-button>
              <el-popconfirm
                :title="`你确定要删除 '${row.spuName}' 吗？`"
                width="200px"
                @confirm="deleteSpu(row)"
              >
                <template #reference>
                  <el-button
                    type="primary"
                    size="small"
                    icon="Delete"
                    title="删除SPU"
                  ></el-button>
                </template>
              </el-popconfirm>
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
      </div>
      <!--场景二 修改|添加spu子组件-->
      <SpuForm
        ref="spu"
        v-show="scene == 1"
        @changeScene="changeScene"
      ></SpuForm>
      <!--场景三 添加sku子组件-->
      <SkuForm
        ref="sku"
        v-show="scene == 2"
        @changeScene="changeScene"
      ></SkuForm>
      <!--dialog对话框框：展示已有的sku数据-->
      <el-dialog v-model="show" title="SKU列表">
        <el-table border :data="skuArr">
          <el-table-column label="SKU名字" prop="skuName"></el-table-column>
          <el-table-column label="SKU价格" prop="price"></el-table-column>
          <el-table-column label="SKU重量" prop="weight"></el-table-column>
          <el-table-column label="SKU图片">
            <template #="{ row, $index }">
              <img
                :src="row.skuDefaultImg"
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
//引入分类的仓库
import useCategoryStore from '@/store/modules/category'
//引入ts类型
import type { SpuData } from '@/api/product/spu/type'
//接口请求引入
import { reqHasSpu, reqSkuList, reqRemoveSpu } from '@/api/product/spu/index'
//引入返回数据的类型
import type {
  HasSpuResponseData,
  Records,
  SkuInfoData,
  SkuData,
} from '@/api/product/spu/type'
//场景
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
import { ref, watch, onBeforeUnmount } from 'vue'
let CategoryStore = useCategoryStore()

//子组件的方法方法实例化
let spu = ref()

let scene = ref<number>(0) //场景切换
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
//存储接口的数据
let records = ref<Records>([])
//存储已有的SPU总数
let total = ref<number>(0)
//存储SKU的数据
let skuArr = ref<SkuData[]>([])
//SKU查看列表的显示与否
let show = ref<boolean>(false)

//获取sku实例
let sku = ref<any>()
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
//添加新的spu按钮的回调
const addSpu = () => {
  scene.value = 1
  //点击添加按钮，调用组件方法初始化
  spu.value.initAddSpu(CategoryStore.c3Id)
}
//子组件SPuform绑定自定义事件：目前是让子组件通知父组件切换场景为0
const changeScene = (obj: any) => {
  /*
  const cancel=()=>{
    $emit('changeScene',0)
  }
  子组件点击这个cancel事件，触发了changeScene，并传回了一个参数0
  下面0赋值为场景切换
  */
  scene.value = obj.flag
  //重新获取SPU的数据
  if (obj.params == 'update') {
    //更新留在当前页
    getHaSpu(pageNo.value)
  } else {
    //添加留在第一页
    getHaSpu()
  }
}
//修改已有的SPU按钮
const updateSpu = (row: SpuData) => {
  scene.value = 1
  //调用子组件的spu方法，来获取完整已有的SPU数据
  spu.value.initHasSpuData(row)
}

//添加SKU按钮的回调
const addSku = (row: SpuData) => {
  //切换场景
  scene.value = 2
  //调用子组件的方法初始化添加SKU的数据
  sku.value.initSkuData(CategoryStore.c1Id, CategoryStore.c2Id, row)
}

//查看SKU列表的按钮回调
const findSku = async (row: SpuData) => {
  let result: SkuInfoData = await reqSkuList(row.id as number)
  if (result.code == 200) {
    skuArr.value = result.data
    //对话框显示显示出来
    show.value = true
  }
}

//删除已有的SPU按钮的回调
const deleteSpu = async (row: any) => {
  let reuslt: any = await reqRemoveSpu(row.id as number)
  if (reuslt.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    //重新获取SPU
    getHaSpu(records.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
//当路由销毁的时候，清空仓库关于分类的数据
//onBeforeUnmount销毁后的生命周期函数
onBeforeUnmount(() => {
  //清空仓库分类
  CategoryStore.$reset()
})
</script>

<style scoped></style>
