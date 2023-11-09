<template>
    <el-form label-width="100px">
        <el-form-item label="SKU名称">
            <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
        </el-form-item>
        <el-form-item label="价格（元）">
            <el-input placeholder="价格（元）" type="number" v-model="skuParams.price"></el-input>
        </el-form-item>
        <el-form-item label="重量(G)">
            <el-input placeholder="重量(G)" v-model="skuParams.weight"></el-input>
        </el-form-item>
        <el-form-item label="SKU描述">
            <el-input placeholder="SKU描述" type="textarea" v-model="skuParams.skuDesc"></el-input>
        </el-form-item>
        <el-form-item label="平台属性">
            <el-form :inline="true">
                <el-form-item v-for="(item,index) in attrArr" :key="item.id" :label="item.attrName">
                    <el-select>
                        <el-option v-for="(attrValue,index) in item.attrValueList" :key="attrValue.id" :label="attrValue.valueName"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-form :inline="true">
                <el-form-item v-for="(item,index) in saleArr" :key="item.id" :label="item.saleAttrName">
                    <el-select>
                        <el-option v-for="(SaleAttrValueList,index) in item.spuSaleAttrValueList" :key="SaleAttrValueList.id" :label="SaleAttrValueList.saleAttrValueName"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="图片名称">
            <el-table border :data="imgArr">
                <el-table-column type="selection" width="80px" align="center"></el-table-column>
                <el-table-column label="图片">
                    <template #="{row,$index}">
                        <img :src="row.imgUrl" style="width:100px;height:100px;">
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <template #="{row,$index}">
                        <el-button type="primary" size="small">设置默认</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default" >保存</el-button>
            <el-button type="primary" size="default" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
//引入API接口
import { reqAttr } from '@/api/product/attr';
import { reqSpuImagelist,reqSpuHasSaleAttr } from '@/api/product/spu';
import {ref,reactive} from 'vue'
import type {SkuData} from '@/api/product/spu/type'

//平台属性
let attrArr=ref<any>([])
//销售属性
let saleArr=ref<any>([])
//照片墙的数据源
let  imgArr=ref<any>([])

//手机SKU的参数
let skuParams= reactive<SkuData>({
  //父组件传过来的数据  
  category3Id:'',
  spuId:'',
  tmId:'',
  //v-model来收集
  skuName:'',
  price:'',
  weight:'',
  skuDesc:'',

  skuAttrValueList:[  ],
  skuSaleAttrValueLiat:[  ],
  skuDefaultImg:''

})

let $emit=defineEmits(['changeScene'])
//取消按钮的回调
const cancel=()=>{
    $emit('changeScene',{flag:0,params:''})
}

//当前子组件的方法对外暴露
const initSkuData=async (c1Id:number|string,c2Id:number|string,spu:any)=>{
   //收集数据
   skuParams.category3Id=spu.category3Id
   skuParams.spuId=spu.id
   skuParams.tmId=spu.tmId
   
    //获取平台属性
    let result:any= await reqAttr(c1Id,c2Id,spu.category3Id)
    //获取对应的销售属性
    let result1:any=await reqSpuHasSaleAttr(spu.id)
//获取照片墙的数据
    let result2:any=await reqSpuImagelist(spu.id)
    //数据存储
    attrArr.value=result.data
    saleArr.value=result1.data
    imgArr.value=result2.data
    console.log(imgArr);
    
}
//对外暴露
defineExpose({
    initSkuData
})

</script>

<style scoped>

</style>