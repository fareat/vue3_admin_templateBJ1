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
let $emit=defineEmits(['changeScene'])
//点击取消按钮：通知父组件切换场景1，为0
const cancel=()=>{
    $emit('changeScene',0)
}
</script>

<style scoped>

</style>