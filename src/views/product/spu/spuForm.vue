<template>
  <el-form label-width="120px">
    <el-form-item label="SPU名称">
      <el-input
        placeholder="请输入你的SPU名称"
        v-model="SpuParams.spuName"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="SpuParams.tmId">
        <el-option
          :label="item.tmName"
          v-for="(item, index) in AllTradeMark"
          :key="item.id"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="请输入你的SPU描述"
        v-model="SpuParams.description"
      ></el-input>
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
        <img
          w-full
          :src="dialogImageUrl"
          alt="Preview Image"
          style="width: 100%; height: 100%"
        />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU的销售属性">
      <!--销售属性下拉框-->
      <el-select
        v-model="saleAttrIdAndValueName"
        :placeholder="
          unSelectSaleAttr.length
            ? `还未选择${unSelectSaleAttr.length}个`
            : '无'
        "
      >
        <el-option
          :value="`${item.id}:${item.name}`"
          v-for="(item, index) in unSelectSaleAttr"
          :key="item.id"
          :label="item.name"
        ></el-option>
      </el-select>
      <!--添加属性按钮-->
      <el-button
        @click="addSaleAttr"
        :disabled="saleAttrIdAndValueName ? false : true"
        style="margin-left: 10px"
        type="primary"
        size="default"
        icon="Plus"
      >
        添加属性
      </el-button>
      <!--内容展示-->
      <el-table border style="margin: 10px 0px" :data="saleAttr">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="销售属性名字"
          width="120px"
          prop="saleAttrName"
        ></el-table-column>
        <el-table-column label="销售属性值">
          <template #="{ row, $index }">
            <!--
                            row.spuSaleAttrValueList.splice(index,1)
                            这个删除的
                            $index和index得到的效果是不一样的，
                        -->
            <el-tag
              @close="row.spuSaleAttrValueList.splice(index, 1)"
              v-for="(item, index) in row.spuSaleAttrValueList"
              :key="row.id"
              class="mx-2"
              closable
              style="margin-left: 5px"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input
              @blur="toLook(row)"
              v-model="row.saleAttrValue"
              v-if="row.flag == true"
              placeholder="请输入属性值"
              size="small"
              style="width: 100px; margin-left: 5px"
            ></el-input>
            <el-button
              @click="toEdit(row)"
              v-else
              type="primary"
              size="small"
              icon="Plus"
              style="margin-left: 5px"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #="{ row, $index }">
            <!--
                            saleAttr.splice($index,1)点击触发直接删除
                            saleAttr为<el-table border style="margin: 10px 0px;" :data="saleAttr">里面的：data
                            删除掉点击的id
                        -->
            <el-button
              type="primary"
              size="small"
              icon="Delete"
              @click="saleAttr.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button
        :disabled="saleAttr.length > 0 ? false : true"
        type="primary"
        size="default"
        @click="save"
      >
        保存
      </el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref, computed } from 'vue'
//引入ts类型
import type {
  HasSaleAttr,
  SaleAttr,
  SaleAttrValue,
  SpuData,
} from '@/api/product/spu/type'
//接口引入
import {
  reqAllTradeMark,
  reqSpuImagelist,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
  reqAddOrUpdateSpu,
} from '@/api/product/spu'
//引入TS类型
import type {
  SpuImg,
  Trademark,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
} from '@/api/product/spu/type'
let $emit = defineEmits(['changeScene'])
//点击取消按钮：通知父组件切换场景1，为0
const cancel = () => {
  $emit('changeScene', { flag: 0, params: 'update' })
}

//存储已有的SPU这些数据
let AllTradeMark = ref<Trademark[]>([])
//商品图片
let imgList = ref<SpuImg[]>([])
//已有的SPU销售属性
let saleAttr = ref<SaleAttr[]>([])
//全部的销售属性
let allSaleAttr = ref<HasSaleAttr[]>([])
//存储已有的SPU对象
let SpuParams = ref<SpuData>({
  category3Id: '', //三级分类id
  spuName: '', //spu的名字
  description: '', //spu的描述
  tmId: '', //spu的品牌id
  spuImageList: [],
  spuSaleAttrList: [],
})
//将来手机还未选择的销售属性的ID与属性值的名字
let saleAttrIdAndValueName = ref<string>('')
//控制预览框的显示和隐藏
let dialogVisible = ref<boolean>(false)
//预览框的图片地址
let dialogImageUrl = ref<string>('')

//子组件写一个方法
const initHasSpuData = async (spu: SpuData) => {
  //存储已有的SPU对象，将来在模板中展示
  SpuParams.value = spu
  //spu为父组件传来的已有的SPU对象，【只是其中一条】
  console.log(spu)
  //获取所有的品牌的数据
  let result: AllTradeMark = await reqAllTradeMark()
  //获取某一个品牌旗下的全部售卖商品图片
  let result1: SpuHasImg = await reqSpuImagelist(spu.id)
  //获取已有的SPU销售属性的数据
  let result2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id)
  //获取整个项目全部的SPu的销售属性
  let result3: HasSaleAttrResponseData = await reqAllSaleAttr()

  //存储全部品牌的数据
  AllTradeMark.value = result.data
  //存储图片
  imgList.value = result1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
  //存储已有的SPU销售属性
  saleAttr.value = result2.data
  //全部的销售属性
  allSaleAttr.value = result3.data
}
//照片墙点击预览的时候触发的钩子
const handlePictureCardPreview = (file: any) => {
  console.log(file)
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}
//上传之前的钩子
const handlerUplaod = (all: any) => {
  if (
    all.type == 'image/png' ||
    all.type == 'image/jpeg' ||
    all.type == 'image/jpg' ||
    all.type == 'image/gif'
  ) {
    if (all.size / 1024 / 1024 < 3) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传的文件务必小于3M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传的文件务必是PNG|JPG|GIF',
    })
    return false
  }
}
//计算出当前SPU还未拥有的销售属性
const unSelectSaleAttr = computed(() => {
  //全部的销售属性：颜色，版本，尺码
  //已有的销售属性：颜色，版本
  //要过滤掉没有属性的销售名字，-----------》尺码
  let unSelectArr = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((item1) => {
      return item.name != item1.saleAttrName
    })
  })
  return unSelectArr
})
//点击添加按钮，让销售属性添加一行，无描述的行
const addSaleAttr = () => {
  /*
        baseSaleAttrId:number,
        saleAttrName:string,
        spuSaleAttrValueList:spuSaleAttrValueList
        在销售属性中以上这三个字段是必备的
    */
  //用分号【：】进行分隔，得到【3：版本】
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  //追加到数组中
  saleAttr.value.push(newSaleAttr)
  //清空收集到的数据
  saleAttrIdAndValueName.value = ''
}
//属性值点击按钮的回调
const toEdit = (row: SaleAttr) => {
  row.flag = true
}
//输入框失去焦点执行的回调
const toLook = (row: SaleAttr) => {
  //销售属性的id,属性值的名字
  const { baseSaleAttrId, saleAttrValue } = row
  //整理成接口需要的形式
  let newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue,
  }
  //非法情况判断
  if ((saleAttrValue as string).trim() == '') {
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
  }
  //检验属性已存在
  let repeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName == saleAttrValue
  })
  //判断属性已存在
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值已存在',
    })

    return
  }

  //追加新的属性值对象,往接口的数据增加一个属性值对象
  row.spuSaleAttrValueList.push(newSaleAttrValue)
  //返回按钮界面
  row.flag = false
  //清空输入输入框数据
  row.saleAttrValue = ''
}
//保存按钮的回调
const save = async () => {
  //整理数据
  //1.照片墙的数据
  //把字段名称更换为接口需要的名称
  SpuParams.value.spuImageList = imgList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    }
  })
  //2.整理销售属性的数据
  SpuParams.value.spuSaleAttrList = saleAttr.value
  //发送请求：添加SPU|更新SPU
  let result = await reqAddOrUpdateSpu(SpuParams.value)

  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: SpuParams.value.id ? '更新成功' : '添加成功',
    })
    //通知父组件切换场景
    $emit('changeScene', {
      flag: 0,
      params: SpuParams.value.id ? 'update' : 'add',
    })
  } else {
    ElMessage({
      type: 'error',
      message: SpuParams.value.id ? '更新失败' : '添加失败',
    })
  }
}

//添加一个新的spu初始化请求方法
const initAddSpu = async (c3Id: number | string) => {
  //每次清空数组
  Object.assign(SpuParams.value, {
    category3Id: '', //三级分类id
    spuName: '', //spu的名字
    description: '', //spu的描述
    tmId: '', //spu的品牌id
    spuImageList: [],
    spuSaleAttrList: [],
  })
  //清空照片墙
  imgList.value = []
  //清空标签
  saleAttr.value = []
  //清空曾经收集的数据
  saleAttrIdAndValueName.value = ''
  //存储三级分类ID
  SpuParams.value.category3Id = c3Id
  //获取所有的品牌的数据
  let result: AllTradeMark = await reqAllTradeMark()
  //获取整个项目全部的SPu的销售属性
  let result1: HasSaleAttrResponseData = await reqAllSaleAttr()
  //存储数据
  AllTradeMark.value = result.data
  allSaleAttr.value = result1.data
  console.log(123)
}

//对外暴露initHasSpuData方法，让父组件可以接收到数据
defineExpose({ initHasSpuData, initAddSpu })
</script>

<style scoped></style>
