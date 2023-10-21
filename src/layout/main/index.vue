<template>
  <div>
    <!--路由组件出口位置-->
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <!--渲染一级路由-->
        <component :is="Component" v-if="flag"></component>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue'
import useLayOutSettingStore from '@/store/modules/setting'
let LayOutSettingStore = useLayOutSettingStore()

//控制当前组件是否销毁重建
let flag = ref(true)

watch(
  () => LayOutSettingStore.refsh,
  () => {
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<script lang="ts">
export default {
  name: 'Main',
}
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
