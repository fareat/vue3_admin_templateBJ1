<template>
    <div class="logo" v-if="setting.logoHidden">
        <img :src= "setting.logo"  alt="">
        <h1>{{setting.title}}</h1>
    </div>
</template>

<script setup lang="ts">
//引入标题，和logo
import setting from '@/setting.ts'
</script>

<style scoped lang="scss">
.logo{
    width:100%;
    height:$base-menu-logo-height;
    color:white;
    display:flex;
    align-items:center;
    padding:20px;
    img{
        width:40px;
        height:40px;
        margin-right:20px;
    }
    h1{
        font-size:$base-logo-title-dontSize;       
    }
}

</style>