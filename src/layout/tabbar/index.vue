<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <Breadcrumb></Breadcrumb>
        </div>
        <div class="tabbar_right">
            <Stting></Stting>
        </div>
    </div>
</template>

<script setup lang="ts">
//引入面包屑分隔图标
import { ArrowRight,Refresh,FullScreen,Setting } from '@element-plus/icons-vue'
import Breadcrumb from './breadcrumb/index.vue'
import Stting from './setting/index.vue'
</script>

<script lang="ts">
export default {
    name:"Tabbar"
}
</script>

<style scoped lang="scss">
.tabbar{
    width:100%;
    height:100%;
    display:flex;
    justify-content:space-between;
    background-image:linear-gradient(to right,rgb(240, 234, 234),rgb(239, 226, 226),rgb(221, 212, 212));
    .tabbar_left{
        display:flex;
        align-items: center;
        margin-left: 20px;
    }
    .tabbar_right{
        display:flex;
        align-items: center;
        
    }
}
</style>