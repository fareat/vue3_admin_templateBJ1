<template>
    <el-form label-width="120px">
        <el-form-item label="SPU名称">
            <el-input placeholder="请输入你的SPU名称"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select>
                <el-option label="华为"></el-option>
                <el-option label="华为"></el-option>
                <el-option label="华为"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input type="textarea" placeholder="请输入你的SPU描述"></el-input>
        </el-form-item>
        <el-form-item label="SPU图标">
            <el-upload
            v-model:file-list="fileList"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        
          <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="SPU的销售属性">
            <!--销售属性下拉框-->
            <el-select>
                <el-option label="华为"></el-option>
                <el-option label="华为"></el-option>
                <el-option label="华为"></el-option>
            </el-select>
            <!--添加属性按钮-->
            <el-button style="margin-left: 10px;" type="primary" size="default" icon="Plus">添加属性</el-button>
            <!--内容展示-->
            <el-table border style="margin: 10px 0px;">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="销售属性名字"  width="120px"></el-table-column>
                <el-table-column label="销售属性值"  ></el-table-column>
                <el-table-column label="操作"  width="120px"></el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default" >保存</el-button>
            <el-button type="primary" size="default" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import {ref} from 'vue'
//引入ts类型
import type { HasSaleAttr, SaleAttr, SpuData } from '@/api/product/spu/type'
//接口引入
import { reqAllTradeMark,reqSpuImagelist,reqSpuHasSaleAttr,reqAllSaleAttr } from '@/api/product/spu';
//引入TS类型
import type { SpuImg,Trademark, AllTradeMark,SpuHasImg,SaleAttrResponseData,HasSaleAttrResponseData } from '@/api/product/spu/type';
let $emit=defineEmits(['changeScene'])
//点击取消按钮：通知父组件切换场景1，为0
const cancel=()=>{
    $emit('changeScene',0)
}

//存储已有的SPU这些数据
let AllTradeMark =ref<Trademark[]>([])
//商品图片
let imgList=ref<SpuImg[]>([])
//已有的SPU销售属性
let saleAttr=ref<SaleAttr[]>([])
//全部的销售属性
let allSaleAttr=ref<HasSaleAttr[]>([])


//子组件写一个方法
const initHasSpuData=async(spu:SpuData)=>{
    //spu为父组件传来的已有的SPU对象，【只是其中一条】
    console.log(spu);
    //获取所有的品牌的数据
    let result:AllTradeMark= await reqAllTradeMark()
    //获取某一个品牌旗下的全部售卖商品图片
    let result1:SpuHasImg=await reqSpuImagelist(spu.id)
    //获取已有的SPU销售属性的数据
    let result2:SaleAttrResponseData=await reqSpuHasSaleAttr(spu.id)
    //获取整个项目全部的SPu的销售属性
    let result3:HasSaleAttrResponseData=await reqAllSaleAttr()

    //存储全部品牌的数据
    AllTradeMark.value=result.data
    //存储图片
    imgList.value=result1.data
    //存储已有的SPU销售属性
    saleAttr.value=result2.data
    //全部的销售属性
    allSaleAttr.value=result3.data

    console.log(AllTradeMark.value);
    console.log(imgList.value);
    console.log(saleAttr.value);
    console.log(allSaleAttr.value);
}
//对外暴露initHasSpuData方法，让父组件可以接收到数据
defineExpose({initHasSpuData})
</script>

<style scoped>

</style>