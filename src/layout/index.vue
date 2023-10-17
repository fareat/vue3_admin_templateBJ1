<template>
    <div class="layout_container">
        <!--左侧菜单-->
        <div class="layout_slider">
            <Logo></Logo>
        </div>
        <!--顶部侧菜单-->
        <div class="layout_tabbar">456</div>
        <!--内容展示菜单-->
        <div class="layout_main">
            <h1 style="height: 1000px;">在干嘛</h1>
        </div>
    </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
</script>

<style scoped lang="scss">
.layout_container{
     width:100%;
     height:100Vh; 
     background: red;
     .layout_slider{
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-background;
     }
     .layout_tabbar{
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        background: #4471a2;
        top: 0px;
        left: $base-menu-width;
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
        
     }
}
</style>