<template>
    <el-form label-width="120px">
        <el-form-item label="SPU名称">
            <el-input placeholder="请输入你的SPU名称"  v-model="SpuParams.spuName"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌" >
            <el-select v-model="SpuParams.tmId">
                <el-option :label="item.tmName" v-for="(item,index) in AllTradeMark" :key="item.id" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input type="textarea" placeholder="请输入你的SPU描述" v-model="SpuParams.description"></el-input>
        </el-form-item>
        <el-form-item label="SPU图标">
            <!--
                v-model:fileList--展示默认图片
                action---上传图片的接口地址
                list-type-----文件列表类型
                on-preview----点击放大镜图标时触发
                on-remove---点击删除图标时触发
                before-upload---上传之前的钩子
            -->
            <el-upload
            v-model:file-list="imgList"
            action="/api/admin/product/fileUpload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :before-upload="handlerUplaod"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        
          <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image"  style="width:100%; height:100%; "/>
          </el-dialog>
        </el-form-item>
        <el-form-item label="SPU的销售属性">
            <!--销售属性下拉框-->
            <el-select v-model="saleAttrIdAndValueName" :placeholder="unSelectSaleAttr.length?`还未选择${unSelectSaleAttr.length}个`:'无'">
                <el-option :value="`${item.id}:${item.name}`"  v-for="(item,index) in unSelectSaleAttr" :key="item.id" :label="item.name"></el-option>
            </el-select>
            <!--添加属性按钮-->
            <el-button @click="addSaleAttr" :disabled="saleAttrIdAndValueName?false:true" style="margin-left: 10px;" type="primary" size="default" icon="Plus">添加属性</el-button>
            <!--内容展示-->
            <el-table border style="margin: 10px 0px;" :data="saleAttr">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="销售属性名字"  width="120px" prop="saleAttrName"></el-table-column>
                <el-table-column label="销售属性值"  >
                    <template #="{row,$index}">
                        <el-tag v-for="(item,index) in row.spuSaleAttrValueList" :key="row.id" class="ml-2" style="margin-left: 15px;">
                            {{item.saleAttrValueName}}
                        </el-tag>
                        <el-button type="primary" size="small" icon="Plus" style="margin-left: 15px;"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作"  width="120px">
                    <template #="{row,$index}">
                        <!--
                            saleAttr.splice($index,1)点击触发直接删除
                            saleAttr为<el-table border style="margin: 10px 0px;" :data="saleAttr">里面的：data
                            删除掉点击的id
                        -->
                        <el-button type="primary" size="small" icon="Delete" @click="saleAttr.splice($index,1)"></el-button>
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
import { ElMessage } from 'element-plus'
import {ref,computed} from 'vue'
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
//存储已有的SPU对象
let SpuParams=ref<SpuData>({
  category3Id: '',//三级分类id
   spuName: "",//spu的名字
  description: "",//spu的描述
  tmId: 0,//spu的品牌id
  spuImageList: [  ],
  spuSaleAttrList: [  ]

})
//将来手机还未选择的销售属性的ID与属性值的名字
let saleAttrIdAndValueName=ref<string>('')
//控制预览框的显示和隐藏
let dialogVisible=ref<boolean>(false)
//预览框的图片地址
let dialogImageUrl=ref<string>('')

//子组件写一个方法
const initHasSpuData=async(spu:SpuData)=>{
    //存储已有的SPU对象，将来在模板中展示
    SpuParams.value=spu
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
    imgList.value=result1.data.map(item=>{
        return{
            name:item.imgName,
            url:item.imgUrl
        }
    })
    //存储已有的SPU销售属性
    saleAttr.value=result2.data
    //全部的销售属性
    allSaleAttr.value=result3.data

    console.log(AllTradeMark.value);
    console.log(imgList.value);
    console.log(123);
    console.log(saleAttr.value);
    console.log(saleAttr.value[0].spuSaleAttrValueList[0].saleAttrValueName);
    console.log(123);
    console.log(allSaleAttr.value);
}
//照片墙点击预览的时候触发的钩子
const handlePictureCardPreview=(file:any)=>{
    console.log(file);
    dialogImageUrl.value=file.url
    dialogVisible.value=true
}
//上传之前的钩子
const handlerUplaod=(all:any)=>{
    if(all.type=='image/png'||all.type=='image/jpeg'||all.type=='image/jpg'||all.type=='image/gif'){
        if (all.size/1024/1024<3) {
            return true
        }else{
            ElMessage({
            type:'error',
            message:'上传的文件务必小于3M'
        })
            return false
        }
    }else{
        ElMessage({
            type:'error',
            message:'上传的文件务必是PNG|JPG|GIF'
        })
        return false
    }
}
//计算出当前SPU还未拥有的销售属性
const unSelectSaleAttr=computed(()=>{
    //全部的销售属性：颜色，版本，尺码
    //已有的销售属性：颜色，版本
    //要过滤掉没有属性的销售名字，-----------》尺码
    let unSelectArr=allSaleAttr.value.filter(item=>{
        return saleAttr.value.every(item1=>{
            return item.name!=item1.saleAttrName
        })
    })
    return unSelectArr
})
//点击添加按钮，让销售属性添加一行，无描述的行
const addSaleAttr=()=>{
    /*
        baseSaleAttrId:number,
        saleAttrName:string,
        spuSaleAttrValueList:spuSaleAttrValueList
        在销售属性中以上这三个字段是必备的
    */
   //用分号【：】进行分隔，得到【3：版本】
   const [baseSaleAttrId,saleAttrName]=saleAttrIdAndValueName.value.split(":")
   let newSaleAttr:SaleAttr={
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList:[]
   } 
   //追加到数组中
   saleAttr.value.push(newSaleAttr)
   //清空收集到的数据
   saleAttrIdAndValueName.value=''
}
//对外暴露initHasSpuData方法，让父组件可以接收到数据
defineExpose({initHasSpuData})
</script>

<style scoped>

</style>