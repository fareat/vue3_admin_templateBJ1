<template>
    <el-menu>
        <h1>{{menuList}}</h1>
        <template v-for="(item,index) in menuList" :key="item.path">
            <!--:index="item.path"-->
             <!--没有子路由-->
             <template v-if="!item.children">
                <el-menu-item  :index="item.path" v-if="!item.meta.hidden">
                    <template #title>
    
                        <span>{{item.meta.title}}</span>
                    </template>
                </el-menu-item>
             </template>

            <!--:index="item.children[0].path"-->
            <!--有子路由，但是只有一个-->
             <template v-if="item.children&&item.children.length==1">
                <el-menu-item  :index="item.children[0].path" v-if="!item.meta.hidden">
                    <template #title>
                        <span>{{item.children[0].meta.title }}</span>
                    </template>
                </el-menu-item>
             </template>
            <!--有子路由，数量并且大于一-->
             <template v-if="item.children&&item.children.length>1">
                <el-sub-menu :index="item.path" v-if="!item.meta.hidden">
                    <template #title>
                        <span>
                            {{ item.meta.title }}
                        </span>
                    </template>
                    <Menu :menuList="item.children"></Menu>
                </el-sub-menu>
             </template>
        </template>
    </el-menu>
</template>

<script setup lang="ts">
//获取父组件传递过来的数据
defineProps(['menuList'])
</script>

<script lang="ts">
export default {
    name:'Menu'
}
</script>

<style scoped>

</style>