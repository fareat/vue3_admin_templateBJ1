<template>
  <div>
    <el-card class="box-card">
      <!--卡片顶部的添加按钮-->
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        @click="addTrademark"
      >
        添加品牌
      </el-button>
      <!--表格组件，用于展示已经有的数据-->
      <!--
        table
          --border:可以设置表格纵向是否有边缘
        table-column
          --lable：某一列
          --width：设置这一列的宽度
          --align：设置这一列对其方式
      -->
      <el-table style="margin: 10px 0px" border :data="trademarkArr">
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        ></el-table-column>
        <!--table-column:默认展示数据用div-->
        <el-table-column label="品牌名称">
          <!--插槽方法来,row为接口返回中data的全部数据-->
          <template #="{ row, $index }">
            <pre style="color: rgb(58, 197, 114)">{{ row.tmName }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="品牌logo">
          <template #="{ row, $index }">
            <img :src="row.logoUrl" alt="" style="width: 100px; heigh: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTrademar(row)"
            ></el-button>
            <el-popconfirm
              :title="`您确定要删除${row.tmName}`"
              width="250px"
              icon="Delete"
              @confirm="removeTradeMark(row.id)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  size="small"
                  icon="Delete"
                ></el-button>
              </template>
            </el-popconfirm>
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

    <!--对话框，在添加或者修改已有品牌业务的时候使用-->
    <!--
      v-model:是控制对话框是否隐藏或者显示的
      title：是对话框标题
    -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkParams.id ? '编辑品牌' : '添加品牌'"
    >
      <!--:model--接收表单数据-->
      <el-form
        style="width: 80%"
        :model="trademarkParams"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input
            placeholder="请输入品牌名称"
            v-model="trademarkParams.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!--
            action：要连接的url
            show-file-listL:是否显示上传的文件
            before-upload：约束文件类型
          -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!--具名插槽 #footer-->
      <template #footer>
        <el-button type="primary" size="default" @click="canael">
          取消
        </el-button>
        <el-button type="primary" size="default" @click="confirm">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark/index'
import type {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from '@/api/product/trademark/type'
import type { UploadProps } from 'element-plus'
//当前页码
let pageNo = ref<number>(1)
//每页展示多少条数据
let limit = ref<number>(3)
//存储品牌数据总数
let total = ref<number>(0)
//存储已有品牌的数据
let trademarkArr = ref<Records>([])
//控制对话框显示或者隐藏
let dialogFormVisible = ref<boolean>(false)
//获取el-form组件实例
let formRef = ref()
//弹窗标题
let biaoti = ref<string>('')
//-----------------------------------定义收集新增品牌数据
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})

//获取已有品牌的接口封装为一个函数，在任何情况下获取数据调用函数即可
const getHasTrademark = async (pager = 1) => {
  //为改变下拉菜单数据，重新赋值
  pageNo.value = pager
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  //当生命周期钩子函数触发请求的时候，进行以下判断
  if (result.code == 200) {
    //存储已有品牌的总个数
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}
//组件挂载完成钩子---发送一次请求，获取第一页，三个品牌数据
onMounted(() => {
  getHasTrademark()
})
//添加图片
const addTrademark = () => {
  dialogFormVisible.value = true
  trademarkParams.id = 0
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  //ts的？号写法
  /*   formRef.value?.clearValidate('logoUrl')
  formRef.value?.clearValidate('tmName') */
  nextTick(() => {
    formRef.value.clearValidate('logoUrl')
    formRef.value.clearValidate('tmName')
  })
}
//修改图片
//row为当前已有的品牌
const updateTrademar = (row: TradeMark) => {
  dialogFormVisible.value = true
  //原始写法
  /*   trademarkParams.id=row.id
  trademarkParams.tmName=row.tmName
  trademarkParams.logoUrl=row.logoUrl */
  //ES6写法
  Object.assign(trademarkParams, row)
  //清空校验规则的提示信息
  nextTick(() => {
    formRef.value.clearValidate('logoUrl')
    formRef.value.clearValidate('tmName')
  })
}
//对话框底部取消按钮
const canael = () => {
  dialogFormVisible.value = false
}
//对话框底部确定按钮
const confirm = async () => {
  //在你发请求之前要对整个表单进行效验
  await formRef.value.validate()
  let result: any = await reqAddOrUpdateTrademark(trademarkParams)
  //添加品牌、成功||修改品牌数据
  if (result.code == 200) {
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改成功' : '添加成功',
    })
    //再次获取已有的全部数据||修改时停留本页
    getHasTrademark(trademarkParams.id ? pageNo.value : 1)
  } else {
    //添加品牌、失败
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改失败' : '添加失败',
    })
    dialogFormVisible.value = false
  }
}

//分页器当前页码发生变化的时候会触发
//对于当前页码发生变化的自定义事件，组件pagination给父组件回传了当前页码
/* const changePageNo=()=>{
  //当页码发生变化的时候再次发请求获取对应已有的品牌数据
  getHasTrademark()
   
} */

//当下拉菜单变化会触发这个方法
//这个自定义事件，分页器组件会将下拉菜单选中的数据返回
/* const sizeChange=(pagesize)=>{
  //console.log(pagesize);
  //下拉菜单，改变页面展示数据时
  pageNo.value=1
  getHasTrademark()
  
} */

//上传文件的限制条件
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  //上传文件的约束条件png|jpg|gif  4M
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件格式应小于4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式应为PNG|JPG|GIF',
    })
    return false
  }
}
//图片上传成功的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  //response；为上传到服务器，服务器返回的数据
  //手机上传图片的地址，添加一个新的品牌的时候非服务器
  trademarkParams.logoUrl = response.data
  //清理表单验证信息
  formRef.value.clearValidate('logoUrl')
}

//表单效验规则自定义方法
const validatorTmName = (rule: any, value: any, callBack: any) => {
  //rule，是返回的规则对象const rules
  //value，表单的文本内容
  //callBack，放行函数
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('品牌名称位数大于等于两位'))
  }
}

const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  if (value) {
    callBack()
  } else {
    callBack(new Error('LOGO图片必须上传'))
  }
}

//表单效验规则对象
const rules = {
  tmName: [
    //required:这个字段为必填项
    //trigger：【blur，change】--【失去焦点，文本发生变化】
    { required: true, trigger: 'blur', validator: validatorTmName },
  ],
  logoUrl: [
    //在图片上，用trigger方法是没有意义的
    { required: true, validator: validatorLogoUrl },
  ],
}

//删除功能的气泡的确定按钮的回调
const removeTradeMark = async (id: number) => {
  let result = await reqDeleteTrademark(id)
  if ((result.code = 200)) {
    //删除成功的提示信息
    ElMessage({
      type: 'success',
      message: '删除品牌成功',
    })
    getHasTrademark(
      trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1,
    )
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败',
    })
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
