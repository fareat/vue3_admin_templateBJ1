<template>
  <div class="box">
    <div class="title">
      <p>热门景区</p>
      <img src="../../images/dataScreen-title.png" />
    </div>
    <!--图形图表的容器-->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

let charts = ref()
onMounted(() => {
  let mycharts = echarts.init(charts.value)
  //设置配置项
  mycharts.setOption({
    title: {
      //主标题
      text: '景区排行',
      link: 'http://www.baidu.com',
      //标题位置
      left: '50%',
      //主标题的样式
      textStyle: {
        color: 'yellowgreen',
        fontSize: 20,
      },
      //子标题
      subtext: '各大景区的排行',
      //子标题样式
      subtextStyle: {
        color: 'yellowgreen',
        fontSize: 15,
      },
    },
    //x轴
    xAxis: {
      type: 'category',
    },
    //y轴
    yAxis: {},
    //布局组件
    grid: {
      left: 20,
      bottom: 20,
      top: 20,
      right: 20,
    },
    //系列
    series: [
      {
        type: 'bar',
        data: [10, 20, 30, 40, 50, 60, 70],
        //图形上的文本标签
        label: {
          show: true,
          //文字位置放在顶部
          position: 'top',
          color: 'red',
        },
        //是否显示背景颜色
        showBackground: true,
        backgroundStyle: {
          color: 'red',
        },
        //柱子的样式
        itemStyle: {
          borderRadius: 20,
          //颜色
          color: 'cyan',
        },
      },
      {
        type: 'line',
        data: [10, 20, 30, 40, 50, 60, 90],
        smooth: true,
      },
    ],
    tooltip: {
      backgroundColor: 'rgba(50,50,50,0.7)',
    },
  })
})
</script>

<style scoped lang="scss">
.box {
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;
  margin-left: 20px;
  .title {
    margin-left: 20px;
    margin-top: 30px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    height: 300px;
    background: rgb(75, 77, 156);
    margin: 30px 10px 0px 10px;
  }
}
</style>
