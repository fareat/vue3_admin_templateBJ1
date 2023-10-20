<template>
    <div class="layout_container">
        <!--左侧菜单-->
        <div class="layout_slider" >
            <Logo></Logo>
            <!--展示菜单-->
            <!--滚动组件-->
            <el-scrollbar class="scrollbar">
                <!--菜单组件-->
                <el-menu :collapse="LayOutSettingStore.fold?true:false" :default-active="$route.path" background-color="#001529" text-color="#959ea6" >
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!--顶部侧菜单-->
        <div class="layout_tabbar" :class="{fold:LayOutSettingStore.fold?true:false}">
            <Tabbar></Tabbar>
        </div>
        <!--内容展示菜单-->
        <div class="layout_main" :class="{fold:LayOutSettingStore.fold?true:false}">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
//引入logo子组件
import Logo from './logo/index.vue'
//右侧内容的展示区
import Main from './main/index.vue'
//引入菜单组件
import Menu from './menu/index.vue'
//获取路由对象
import {useRoute} from 'vue-router'
//顶部导航
import Tabbar from './tabbar/index.vue'
//获取用户相关的小仓库
import useUserStore from '@/store/modules/user';
//引入控制菜单缩放的小仓库
import useLayOutSettingStore from '@/store/modules/setting.ts'
let userStore=useUserStore()
let $route=useRoute()

//获取菜单缩放的小仓库
let LayOutSettingStore=useLayOutSettingStore()



</script>

<script lang="ts">
export default {
    name:"Layout"
}
</script>

<style scoped lang="scss">
.layout_container{
     width:100%;
     height:100Vh; 
     .layout_slider{
        width: $base-menu-width;
        height: 100vh;
        color:white;
        background-color: $base-menu-background;
        transition: all 0.3s;
        .scrollbar{
            height: calc(100vh - $base-menu-logo-height);
            width: 100%;
            .el-menu{
                border-right: none;
            }
        }
        &.fold{
            width: $base-menu-min-width;
            
        }
     }
     .layout_tabbar{
        position: fixed;
        top: 0;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        transition: all 0.3s;
        &.fold{
            width: calc(100vw - $base-menu-min-width);
            left:$base-menu-min-width
        }
     }
     .layout_main{
        position: relative;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        background: #4caa70;
        left: $base-menu-width;
        top: calc(-100vh + $base-tabbar-height);
        padding: 20px;
        overflow: auto;
        transition: all 0.3s;
        &.fold{
            width: calc(100vw - $base-menu-min-width);
            left:$base-menu-min-width
        }
     }
}
</style>