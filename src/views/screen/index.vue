<template>
  <div class="container">
    <!--数据大屏展示的内容区域-->
    <div class="screen" ref="screen">
      <!--数据大屏的顶部-->
      <div class="top">
        <Top />
      </div>

      <div class="bottom">
        <!--数据大屏的左部-->
        <div class="left">
          <Touris class="touris"></Touris>
          <Sex class="sex"></Sex>
          <Age class="age"></Age>
        </div>
        <!--数据大屏的中部-->
        <div class="center">
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <!--数据大屏的右部-->
        <div class="right">
          <Rank class="rank"></Rank>
          <Year class="year"></Year>
          <Couter class="couter"></Couter>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
//引入顶部子组件
import Top from './components/top/index.vue'
//引入左侧3个子组件
import Touris from './components/tourist/index.vue'
import Sex from './components/sex/index.vue'
import Age from './components/age/index.vue'
//引入中间2个子组件
import Map from './components/map/index.vue'
import Line from './components/line/index.vue'
//引入右侧3个子组件
import Rank from './components/rank/index.vue'
import Year from './components/year/index.vue'
import Couter from './components/couter/index.vue'

//获取数据大屏展示内容盒子的DOM元素
let screen = ref()

onMounted(() => {
  //拉拽主面板
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})
//定义大屏的缩放比例
function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}
//监听视口变化
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}
</script>

<style scoped lang="scss">
.container {
  widows: 100vw;
  height: 100vh;
  background: url(./images/bg.png);
  //背景图的大小
  background-size: cover;
  .screen {
    //缩放固定位
    position: fixed;
    width: 1920px;
    height: 1080px;

    left: 50%;
    top: 50%;
    transform-origin: left top;
    .top {
      width: 100%;
      height: 40px;
    }
    .bottom {
      display: flex;
      .right {
        flex: 1;
        margin: 0px 20px 0px 20px;
        display: flex;
        flex-direction: column;
        .rank {
          flex: 1.5;
        }
        .year {
          flex: 1;
        }
        .couter {
          flex: 1;
        }
      }
      .left {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;
        .touris {
          flex: 1;
        }
        .sex {
          flex: 1;
        }
        .age {
          flex: 1;
        }
      }
      .center {
        flex: 2;
        display: flex;
        flex-direction: column;
        .map {
          flex: 3;
          margin: 40px;
        }
        .line {
          flex: 1;
        }
      }
    }
  }
}
</style>
